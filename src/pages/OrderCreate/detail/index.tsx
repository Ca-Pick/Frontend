import { Box } from '@mui/material';
import { useState } from 'react';
import { TopSection } from './section/top';
import { BottomSection } from './section/bottom';

interface ProductDetailProps {
  productId?: string;
  onBack?: () => void;
  selectedTags?: string[];
  location?: string;
  recipient?: string;
  cakeType?: string;
  color?: string;
  mood?: string;
}

export function ProductDetail({ productId, onBack, selectedTags, location, recipient, cakeType, color, mood }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'other'>('info');

  return (
    <Box sx={{ width: '100%', bgcolor: '#fbf8f3' }}>
      <TopSection activeTab={activeTab} onTabChange={setActiveTab} onBack={onBack} />
      <BottomSection activeTab={activeTab} onTabChange={setActiveTab} selectedTags={selectedTags} location={location} recipient={recipient} cakeType={cakeType} color={color} mood={mood} />
    </Box>
  );
}
