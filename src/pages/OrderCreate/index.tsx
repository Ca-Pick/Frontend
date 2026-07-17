import { BottomNavigation, Box } from '@mui/material';
import { useState } from 'react';
import { OrderStep1 } from './section/OrderStep1';
import { OrderStep2 } from './section/OrderStep2';
import { ProductDetail } from './detail/index';
import { SavedFilteredHeader } from '../Saved/section/SavedFilteredHeader';
import SavedInstagramEmbed, { EMBED_COUNT } from '../../components/SavedInstagramEmbed';
import { colors } from '../../theme/colors';
import { BottomTabNavigation } from '../../components/BottomTabNavigation';

type OrderView = 'steps' | 'detail' | 'saved';

interface OrderCreateProps {
  onDetailViewChange?: (isDetail: boolean) => void;
}

export function OrderCreate({ onDetailViewChange }: OrderCreateProps) {
  const [view, setView] = useState<OrderView>('steps');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [selectedCakeType, setSelectedCakeType] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');

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
    setCurrentStep(4);
    onDetailViewChange?.(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
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
    return <ProductDetail onBack={handleBackFromDetail} selectedTags={selectedTags} location={selectedLocation} recipient={selectedRecipient} cakeType={selectedCakeType} color={selectedColor} mood={selectedMood} />;
  }

  if (view === 'saved') {
    return (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pb: 2, backgroundColor: colors.background,
 }}>
        <SavedFilteredHeader
          onBack={handleBackFromSaved}
          tags={selectedTags}
          onRemoveTag={handleRemoveTag}
          onEditTags={handleEditTags}
          location={selectedLocation}
          recipient={selectedRecipient}
          cakeType={selectedCakeType}
          color={selectedColor}
          mood={selectedMood}
          embedCount={EMBED_COUNT}
        />
        <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <SavedInstagramEmbed onDetailClick={handleDetailFromSaved} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {currentStep === 1 && <OrderStep1 onNext={handleStepNext} onCarouselChange={handleCarouselChange} selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} />}
      {currentStep >= 2 && <OrderStep2 currentStep={currentStep} onNext={handleStepNext} onPrev={handleStepPrev} onComplete={handleDetailView} onCarouselChange={handleCarouselChange} selectedTags={selectedTags} onTagsChange={setSelectedTags} onRecipientChange={setSelectedRecipient} onCakeTypeChange={setSelectedCakeType} onColorChange={setSelectedColor} onMoodChange={setSelectedMood} selectedRecipient={selectedRecipient} selectedCakeType={selectedCakeType} selectedColor={selectedColor} selectedMood={selectedMood} />}
    </Box>
  );
}
