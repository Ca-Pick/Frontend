import { useState } from 'react';
import { ProductDetail } from '../../OrderCreate/detail';

interface HomeDetailProps {
  cakeId?: number;
  onBack: () => void;
}

export function HomeDetail({ cakeId, onBack }: HomeDetailProps) {
  const [selectedCakeId, setSelectedCakeId] = useState<number | undefined>(cakeId);
  const [detailStack, setDetailStack] = useState<number[]>([]);

  const handleCakeSelectInDetail = (newCakeId?: number) => {
    if (newCakeId && selectedCakeId && newCakeId !== selectedCakeId) {
      setDetailStack(prev => [...prev, selectedCakeId]);
    }
    setSelectedCakeId(newCakeId);
  };

  const handleBackFromDetail = () => {
    if (detailStack.length > 0) {
      const newStack = [...detailStack];
      const previousCakeId = newStack.pop();
      setDetailStack(newStack);
      setSelectedCakeId(previousCakeId);
    } else {
      onBack();
    }
  };

  return (
    <ProductDetail
      onBack={handleBackFromDetail}
      cakeId={selectedCakeId}
      onCakeSelect={handleCakeSelectInDetail}
      useDessertRedirect
    />
  );
}
