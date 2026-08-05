import { Box, CircularProgress, Alert, Drawer } from '@mui/material';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TopSection } from './section/top';
import { BottomSection } from './section/bottom';
import { useDessertDetail } from '../../../hooks';

interface ProductDetailProps {
  productId?: string;
  cakeId?: number;
  onBack?: () => void;
  onCakeSelect?: (cakeId?: number) => void;
  selectedTags?: string[];
  location?: string;
  recipient?: string;
  cakeType?: string;
  color?: string;
  mood?: string;
  // 홈처럼 URL이 상세뷰와 동기화되지 않는 곳에 임베드된 경우 전달. 미리보기 시트로 연 다른
  // 케이크에도 그대로 이어져야 하므로 재귀적으로 전달한다.
  useDessertRedirect?: boolean;
}

export function ProductDetail({
  productId,
  cakeId,
  onBack,
  selectedTags,
  location,
  recipient,
  cakeType,
  color,
  mood,
  useDessertRedirect,
}: ProductDetailProps) {
  // URL 파라미터에서 cakeId 추출 (라우터를 통해 들어온 경우)
  const params = useParams<{ cakeId: string }>();
  const id = cakeId || (params.cakeId ? parseInt(params.cakeId) : undefined);

  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'other'>('info');
  // 초기값을 id로 바로 세팅해야 첫 렌더부터 쿼리가 활성화되어, "상세정보 없음"이
  // 한 프레임 잘못 보였다가 사라지는 깜빡임이 생기지 않는다.
  const [currentCakeId, setCurrentCakeId] = useState<number | undefined>(id);
  const [previewCakeId, setPreviewCakeId] = useState<number>();
  const [sheetOpen, setSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sheetRect, setSheetRect] = useState({ left: 0, width: 0 });

  // cakeId prop이 마운트 이후에 바뀌는 경우("다른 케이크" 선택 등, 리마운트 없이
  // 같은 인스턴스가 재사용됨)를 반영하기 위해 계속 유지
  useEffect(() => {
    if (id) {
      setCurrentCakeId(id);
    }
  }, [id]);

  // 실제 API 데이터 가져오기
  const { data, isLoading, error } = useDessertDetail(currentCakeId || 0);
  const detailData = data?.data;

  // 데스크탑 등 넓은 화면에서도 앱은 375px 고정 폭으로 가운데 정렬돼 있으므로,
  // 시트를 뷰포트 기준 50% 가운데 정렬하면 실제 앱 영역과 어긋난다.
  // 대신 현재 페이지 컨테이너의 실제 화면상 좌표(left, width)를 측정해서 그대로 시트에 적용한다.
  // detailData가 로드되어야 containerRef가 실제 DOM(성공 렌더링 분기)에 붙으므로 deps에 포함한다.
  useLayoutEffect(() => {
    const updateRect = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setSheetRect({ left: rect.left, width: rect.width });
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [detailData]);

  // 다른 케이크 선택 시 실제로 페이지를 전환하지 않고, 아래에서 위로 올라오는
  // 바텀시트로 미리보기만 보여준다. 시트를 닫으면 원래 케이크로 그대로 복귀.
  const handleCakeSelect = (selectedCakeId?: number) => {
    if (selectedCakeId) {
      setPreviewCakeId(selectedCakeId);
      setSheetOpen(true);
    }
  };

  const handleSheetClose = () => {
    setSheetOpen(false);
  };

  if (!id) {
    return (
      <Box sx={{ width: '100%', bgcolor: '#fbf8f3', p: 4 }}>
        <Alert severity="error">케이크 ID가 없습니다.</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          bgcolor: '#fbf8f3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', bgcolor: '#fbf8f3', p: 4 }}>
        <Alert severity="error">
          상세정보를 불러오는데 실패했습니다: {error instanceof Error ? error.message : '알 수 없는 오류'}
        </Alert>
      </Box>
    );
  }

  if (!detailData) {
    return (
      <Box sx={{ width: '100%', bgcolor: '#fbf8f3', p: 4 }}>
        <Alert severity="warning">상세정보가 없습니다.</Alert>
      </Box>
    );
  }

  return (
    <Box ref={containerRef} sx={{ width: '100%', bgcolor: '#fbf8f3' }}>
      <Box
        sx={{
          opacity: sheetOpen ? 0.3 : 1,
          transition: 'opacity 320ms ease',
        }}
      >
        <TopSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBack={onBack}
          name={detailData.name}
          instagramEmbed={detailData.instagramEmbed}
          location={detailData.address}
        />
        <BottomSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedTags={detailData.tags}
          location={detailData.address}
          recipient={recipient}
          cakeType={cakeType}
          color={color}
          mood={mood}
          cakelists={detailData.cakelists}
          instagramUrl={detailData.instagramUrl}
          cakeId={detailData.cakeId}
          saved={detailData.saved}
          latitude={detailData.latitude}
          longitude={detailData.longitude}
          name={detailData.name}
          onCakeSelect={handleCakeSelect}
          useDessertRedirect={useDessertRedirect}
        />
      </Box>

      <Drawer
        anchor="bottom"
        open={sheetOpen}
        onClose={handleSheetClose}
        transitionDuration={320}
        slotProps={{
          paper: {
            sx: {
              left: `${sheetRect.left}px`,
              width: `${sheetRect.width}px`,
              height: '100%',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              overflowY: 'auto',
            },
          },
        }}
      >
        {previewCakeId && (
          <ProductDetail
            cakeId={previewCakeId}
            onBack={handleSheetClose}
            recipient={recipient}
            cakeType={cakeType}
            color={color}
            mood={mood}
            useDessertRedirect={useDessertRedirect}
          />
        )}
      </Drawer>
    </Box>
  );
}
