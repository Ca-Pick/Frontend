import { Box } from '@mui/material';
import { colors } from '../../../theme/colors';
import { useState } from 'react';
import { TopSection } from './section/top';
import { BottomSection } from './section/bottom';

interface ProductDetailProps {
  productId?: string;
  onBack?: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'other'>('info');

  return (
    <Box sx={{ width: '100%', bgcolor: '#fbf8f3', pb: 12 }}>
      <TopSection activeTab={activeTab} onTabChange={setActiveTab} onBack={onBack} />
      <BottomSection activeTab={activeTab} onTabChange={setActiveTab} />
    </Box>
  );
}
