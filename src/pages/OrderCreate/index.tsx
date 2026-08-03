import { Box, CircularProgress, Alert } from '@mui/material';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams as useUrlSearchParams, useLocation } from 'react-router-dom';
import { OrderStep1 } from './section/OrderStep1';
import { OrderStep2 } from './section/OrderStep2';
import { ProductDetail } from './detail/index';
import { SavedFilteredHeader } from '../Saved/section/SavedFilteredHeader';
import SavedInstagramEmbed from '../../components/SavedInstagramEmbed';
import { NoSearchResult } from './section/NoSearchResult';
import { colors } from '../../theme/colors';
import { BOTTOM_TAB_HEIGHT } from '../../components/BottomTabNavigation';
import { useSearchDesserts } from '../../hooks';
import type { SearchRequest } from '../../types/api';

type OrderView = 'steps' | 'detail' | 'saved';

interface OrderCreateProps {
  onDetailViewChange?: (isDetail: boolean) => void;
}

interface SearchParams extends SearchRequest {
  recipient?: string;
}

const EMPTY_SEARCH_PARAMS: SearchParams = {
  place: '',
  target: '',
  shape: '',
  color: '',
  mood: '',
  detailTags: [],
  recipient: '',
};

// 검색 필터/결과/상세 진입 상태를 URL 쿼리에 반영해둔다 - 하트 클릭 후 로그인하느라
// 페이지가 완전히 새로고침됐다가 돌아와도(OrderCreate가 처음부터 다시 마운트되어도)
// 검색 조건과 보고 있던 케이크를 잃지 않고 복원하기 위함
function searchParamsToQuery(params: SearchParams): Record<string, string> {
  const query: Record<string, string> = {};
  if (params.place) query.place = params.place;
  if (params.recipient) query.recipient = params.recipient;
  if (params.shape) query.shape = params.shape;
  if (params.color) query.color = params.color;
  if (params.mood) query.mood = params.mood;
  if (params.detailTags && params.detailTags.length > 0) query.tags = params.detailTags.join(',');
  return query;
}

function queryToSearchParams(query: URLSearchParams): SearchParams {
  const tags = query.get('tags');
  return {
    place: query.get('place') || '',
    target: '',
    shape: query.get('shape') || '',
    color: query.get('color') || '',
    mood: query.get('mood') || '',
    detailTags: tags ? tags.split(',').filter(Boolean) : [],
    recipient: query.get('recipient') || '',
  };
}

function toApiParams(params: SearchParams): SearchRequest {
  const { recipient, ...rest } = params;
  return { ...rest, target: recipient };
}

export function OrderCreate({ onDetailViewChange }: OrderCreateProps) {
  const location = useLocation();
  const [urlQuery, setUrlQuery] = useUrlSearchParams();
  const initialView = urlQuery.get('view');
  const initialCakeId = urlQuery.get('cakeId');
  const initialStep = urlQuery.get('step');
  const isInitiallyRestoring = initialView === 'saved' || initialView === 'detail';
  // steps 단계에서 이동했다가 돌아온 경우 - view는 없지만 step/검색조건이 URL에 남아있음
  const isRestoringSteps = !isInitiallyRestoring && urlQuery.toString().length > 0;
  const shouldRestoreFromQuery = isInitiallyRestoring || isRestoringSteps;

  const [view, setView] = useState<OrderView>(isInitiallyRestoring ? (initialView as OrderView) : 'steps');
  const [currentStep, setCurrentStep] = useState(
    isRestoringSteps && initialStep ? Number(initialStep) : 1
  );
  const [selectedCakeId, setSelectedCakeId] = useState<number | undefined>(
    initialCakeId ? Number(initialCakeId) : undefined
  );
  const [detailStack, setDetailStack] = useState<number[]>([]);
  const scrollBeforeDetailRef = useRef(0);

  const [searchParams, setSearchParams] = useState<SearchParams>(() =>
    shouldRestoreFromQuery ? queryToSearchParams(urlQuery) : { ...EMPTY_SEARCH_PARAMS }
  );

  // 실행된 검색의 파라미터 - useQuery를 쓰므로 마운트 시(로그인 리다이렉트 등으로
  // 컴포넌트가 새로 생겨도) 이 값만 있으면 자동으로 검색을 다시 실행해 결과를 복원한다.
  // (이전엔 useMutation().mutate()를 mount effect에서 직접 호출했는데, React 18
  // StrictMode에서 mutate가 만든 요청의 결과가 화면에 반영되지 않고 로딩이 멈추지
  // 않는 문제가 있어 자동 실행에 적합한 useQuery 방식으로 변경함)
  const [activeSearchParams, setActiveSearchParams] = useState<SearchRequest | null>(() =>
    isInitiallyRestoring ? toApiParams(queryToSearchParams(urlQuery)) : null
  );

  const searchQuery = useSearchDesserts(activeSearchParams ?? undefined);

  const sortedCakes = useMemo(() => {
    if (!searchQuery.data?.data.cakes) return [];
    return [...searchQuery.data.data.cakes].sort(
      (a, b) => (b.cakeDetailCount || 0) - (a.cakeDetailCount || 0)
    );
  }, [searchQuery.data]);

  // steps 단계 진행 상태를 URL에 반영 - 다른 탭으로 이동했다가 돌아와도
  // 작성 중이던 스텝/입력값을 잃지 않도록 하기 위함
  useEffect(() => {
    if (view === 'steps') {
      setUrlQuery(
        { step: String(currentStep), ...searchParamsToQuery(searchParams) },
        { replace: true }
      );
    }
  }, [view, currentStep, searchParams]);

  // view가 바뀔 때마다(로그인 리다이렉트로 URL에서 곧바로 'detail'로 복원되는 경우 포함)
  // 상위(MainPage)의 하단탭 표시 여부를 항상 동기화한다. 각 핸들러에서 개별적으로
  // onDetailViewChange를 호출하면 이렇게 상태로 직접 복원되는 경로를 놓치기 쉽다.
  useEffect(() => {
    onDetailViewChange?.(view === 'detail');
  }, [view]);

  // 지금 보고 있는 화면이 steps든 saved든 detail이든 상관없이, 현재 URL을 그대로
  // 기억해둔다 - 하단탭 "검색"을 다시 눌렀을 때 이 경로로 되돌아오기 위함
  // (BottomTabNavigation은 항상 '/order'로만 navigate하므로 쿼리를 스스로 기억 못 함)
  useEffect(() => {
    sessionStorage.setItem('orderLastPath', location.pathname + location.search);
  }, [location.pathname, location.search]);

  const handleSearchParamChange = (key: keyof SearchParams, value: any) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    setActiveSearchParams(toApiParams(searchParams));
    setView('saved');
    onDetailViewChange?.(false);
    setUrlQuery({ view: 'saved', ...searchParamsToQuery(searchParams) }, { replace: true });
  };

  const handleDetailView = () => {
    setView('saved');
    onDetailViewChange?.(false);
    setUrlQuery({ view: 'saved', ...searchParamsToQuery(searchParams) }, { replace: true });
  };

  const handleBackFromDetail = () => {
    if (detailStack.length > 0) {
      // 스택에 이전 케이크가 있으면 복원
      const newStack = [...detailStack];
      const previousCakeId = newStack.pop();
      setDetailStack(newStack);
      setSelectedCakeId(previousCakeId);
      setUrlQuery(
        { view: 'detail', cakeId: String(previousCakeId), ...searchParamsToQuery(searchParams) },
        { replace: true }
      );
    } else {
      // 스택이 비어있으면 검색 결과로 돌아가기
      setView('saved');
      onDetailViewChange?.(false);
      setUrlQuery({ view: 'saved', ...searchParamsToQuery(searchParams) }, { replace: true });
    }
  };

  const handleBackFromSaved = () => {
    setView('steps');
    setCurrentStep(4);
    onDetailViewChange?.(false);
    setUrlQuery({}, { replace: true });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleSearchParamChange(
      'detailTags',
      searchParams.detailTags.filter(tag => tag !== tagToRemove)
    );
  };

  const handleEditTags = () => {
    setView('steps');
    setCurrentStep(1);
    setUrlQuery({}, { replace: true });
  };

  const handleDetailFromSaved = (cakeId?: number) => {
    scrollBeforeDetailRef.current = window.scrollY;
    setSelectedCakeId(cakeId);
    setDetailStack([]); // 검색 결과에서 시작하므로 스택 초기화
    setView('detail');
    onDetailViewChange?.(true);
    window.scrollTo(0, 0);
    if (cakeId) {
      setUrlQuery({ view: 'detail', cakeId: String(cakeId), ...searchParamsToQuery(searchParams) }, { replace: true });
    }
  };

  // 상세페이지에서 검색 결과로 돌아왔을 때, 상세 진입 전 스크롤 위치로 복원
  useEffect(() => {
    if (view === 'saved') {
      window.scrollTo(0, scrollBeforeDetailRef.current);
    }
  }, [view]);

  const handleCakeSelectInDetail = (cakeId?: number) => {
    if (cakeId && selectedCakeId && cakeId !== selectedCakeId) {
      // 다른 케이크일 때만 현재 케이크를 스택에 추가
      setDetailStack(prev => [...prev, selectedCakeId]);
    }
    setSelectedCakeId(cakeId);
    if (cakeId) {
      setUrlQuery({ view: 'detail', cakeId: String(cakeId), ...searchParamsToQuery(searchParams) }, { replace: true });
    }
  };

  const handleReset = () => {
    setView('steps');
    setCurrentStep(1);
    setSearchParams({ ...EMPTY_SEARCH_PARAMS });
    setSelectedCakeId(undefined);
    setDetailStack([]);
    setActiveSearchParams(null);
    onDetailViewChange?.(false);
    setUrlQuery({}, { replace: true });
  };

  const hasStepInput =
    currentStep > 1 ||
    !!searchParams.place ||
    !!searchParams.recipient ||
    !!searchParams.shape ||
    !!searchParams.color ||
    !!searchParams.mood ||
    searchParams.detailTags.length > 0;

  const handleStepNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleStepPrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCarouselChange = (index: number) => {
    setCurrentStep(index + 1);
  };

  if (view === 'detail') {
    return (
      <ProductDetail
        onBack={handleBackFromDetail}
        cakeId={selectedCakeId}
        onCakeSelect={handleCakeSelectInDetail}
        selectedTags={searchParams.detailTags}
        location={searchParams.place || ''}
        recipient={searchParams.recipient || ''}
        cakeType={searchParams.shape || ''}
        color={searchParams.color || ''}
        mood={searchParams.mood || ''}
      />
    );
  }

  if (view === 'saved') {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: `calc(100vh - ${BOTTOM_TAB_HEIGHT}px)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pb: 2,
          backgroundColor: colors.background,
        }}
      >
        {searchQuery.isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {searchQuery.error && (
          <Alert severity="error">
            검색 실패: {searchQuery.error instanceof Error ? searchQuery.error.message : '알 수 없는 오류'}
          </Alert>
        )}

        {searchQuery.data && sortedCakes.length === 0 && (
          <NoSearchResult onNavigateToOrder={handleReset} />
        )}

        {searchQuery.data && sortedCakes.length > 0 && (
          <>
            <SavedFilteredHeader
              onBack={handleBackFromSaved}
              tags={searchQuery.data.data.tags}
              onRemoveTag={handleRemoveTag}
              onEditTags={handleEditTags}
              location={searchParams.place || ''}
              recipient={searchParams.recipient || ''}
              cakeType={searchParams.shape || ''}
              color={searchParams.color || ''}
              mood={searchParams.mood || ''}
              embedCount={searchQuery.data.data.cakes.length}
            />
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <SavedInstagramEmbed
                onDetailClick={handleDetailFromSaved}
                cakes={sortedCakes}
                showChips={true}
              />
            </Box>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {currentStep === 1 && (
        <OrderStep1
          onNext={handleStepNext}
          onCarouselChange={handleCarouselChange}
          selectedLocation={searchParams.place || ''}
          onLocationChange={(location) => handleSearchParamChange('place', location)}
          onReset={handleReset}
          showReset={hasStepInput}
        />
      )}
      {currentStep >= 2 && (
        <OrderStep2
          currentStep={currentStep}
          onNext={handleStepNext}
          onPrev={handleStepPrev}
          onComplete={handleSearch}
          onCarouselChange={handleCarouselChange}
          selectedTags={searchParams.detailTags}
          onTagsChange={(tags) => handleSearchParamChange('detailTags', tags)}
          onRecipientChange={(recipient) => handleSearchParamChange('recipient', recipient)}
          onCakeTypeChange={(cakeType) => handleSearchParamChange('shape', cakeType)}
          onColorChange={(color) => handleSearchParamChange('color', color)}
          onMoodChange={(mood) => handleSearchParamChange('mood', mood)}
          selectedRecipient={searchParams.recipient || ''}
          selectedCakeType={searchParams.shape || ''}
          selectedColor={searchParams.color || ''}
          selectedMood={searchParams.mood || ''}
          isLoading={searchQuery.isLoading}
        />
      )}
    </Box>
  );
}
