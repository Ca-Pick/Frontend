import { Box } from '@mui/material';
import { useState } from 'react';
import { OrderStep1 } from './section/OrderStep1';
import { OrderStep2 } from './section/OrderStep2';
import { ProductDetail } from './detail/index';

type OrderView = 'steps' | 'detail';

interface OrderCreateProps {
  onDetailViewChange?: (isDetail: boolean) => void;
}

export function OrderCreate({ onDetailViewChange }: OrderCreateProps) {
  const [view, setView] = useState<OrderView>('steps');

  const handleDetailView = () => {
    setView('detail');
    onDetailViewChange?.(true);
  };

  const handleBackFromDetail = () => {
    setView('steps');
    onDetailViewChange?.(false);
  };

  if (view === 'detail') {
    return <ProductDetail onBack={handleBackFromDetail} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <OrderStep1 />
      <OrderStep2 onComplete={handleDetailView} />
    </Box>
  );
}
