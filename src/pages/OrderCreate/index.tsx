import { Box, CircularProgress, Alert } from '@mui/material';
import { useState, useMemo } from 'react';
import { OrderStep1 } from './section/OrderStep1';
import { OrderStep2 } from './section/OrderStep2';
import { ProductDetail } from './detail/index';
import { SavedFilteredHeader } from '../Saved/section/SavedFilteredHeader';
import SavedInstagramEmbed from '../../components/SavedInstagramEmbed';
import { colors } from '../../theme/colors';
import { useSearchDessertsMutation } from '../../hooks';
import type { SearchRequest } from '../../types/api';

type OrderView = 'steps' | 'detail' | 'saved';

interface OrderCreateProps {
  onDetailViewChange?: (isDetail: boolean) => void;
}

interface SearchParams extends SearchRequest {
  recipient?: string;
}

export function OrderCreate({ onDetailViewChange }: OrderCreateProps) {
  const [view, setView] = useState<OrderView>('steps');
  const [currentStep, setCurrentStep] = useState(1);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    place: '',
    target: '',
    shape: '',
    color: '',
    mood: '',
    detailtags: [],
    recipient: '',
  });

  const searchMutation = useSearchDessertsMutation();

  const sortedCakes = useMemo(() => {
    if (!searchMutation.data?.data.cakes) return [];
    return [...searchMutation.data.data.cakes].sort(
      (a, b) => (b.cakeDetailCount || 0) - (a.cakeDetailCount || 0)
    );
  }, [searchMutation.data]);

  const handleSearchParamChange = (key: keyof SearchParams, value: any) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const { recipient, ...rest } = searchParams;
    const apiParams = {
      ...rest,
      target: recipient,
    };
    searchMutation.mutate(apiParams);
    setView('saved');
    onDetailViewChange?.(false);
  };

  const handleDetailView = () => {
    setView('saved');
    onDetailViewChange?.(false);
  };

  const handleBackFromDetail = () => {
    setView('saved');
    onDetailViewChange?.(false);
  };

  const handleBackFromSaved = () => {
    setView('steps');
    setCurrentStep(1);
    onDetailViewChange?.(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleSearchParamChange(
      'detailtags',
      searchParams.detailtags.filter(tag => tag !== tagToRemove)
    );
  };

  const handleEditTags = () => {
    setView('steps');
    setCurrentStep(1);
  };

  const handleDetailFromSaved = () => {
    setView('detail');
    onDetailViewChange?.(true);
  };

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
        selectedTags={searchParams.detailtags}
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
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pb: 2,
          backgroundColor: colors.background,
        }}
      >
        {searchMutation.isPending && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {searchMutation.error && (
          <Alert severity="error">
            검색 실패: {searchMutation.error instanceof Error ? searchMutation.error.message : '알 수 없는 오류'}
          </Alert>
        )}

        {searchMutation.data && (
          <>
            <SavedFilteredHeader
              onBack={handleBackFromSaved}
              tags={searchMutation.data.data.tags}
              onRemoveTag={handleRemoveTag}
              onEditTags={handleEditTags}
              location={searchParams.place || ''}
              recipient={searchParams.recipient || ''}
              cakeType={searchParams.shape || ''}
              color={searchParams.color || ''}
              mood={searchParams.mood || ''}
              embedCount={searchMutation.data.data.cakes.length}
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
        />
      )}
      {currentStep >= 2 && (
        <OrderStep2
          currentStep={currentStep}
          onNext={handleStepNext}
          onPrev={handleStepPrev}
          onComplete={handleSearch}
          onCarouselChange={handleCarouselChange}
          selectedTags={searchParams.detailtags}
          onTagsChange={(tags) => handleSearchParamChange('detailtags', tags)}
          onRecipientChange={(recipient) => handleSearchParamChange('recipient', recipient)}
          onCakeTypeChange={(cakeType) => handleSearchParamChange('shape', cakeType)}
          onColorChange={(color) => handleSearchParamChange('color', color)}
          onMoodChange={(mood) => handleSearchParamChange('mood', mood)}
          selectedRecipient={searchParams.recipient || ''}
          selectedCakeType={searchParams.shape || ''}
          selectedColor={searchParams.color || ''}
          selectedMood={searchParams.mood || ''}
          isLoading={searchMutation.isPending}
        />
      )}
    </Box>
  );
}
