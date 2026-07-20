import { Box } from '@mui/material';
import { useState } from 'react';
import { TopSection } from './section/top';
import { BottomSection } from './section/bottom';
import { DETAIL_DUMMY_DATA } from '../../../constants/detailDummyData';

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
  const detailData = DETAIL_DUMMY_DATA.data;

  return (
    <Box sx={{ width: '100%', bgcolor: '#fbf8f3' }}>
      <TopSection activeTab={activeTab} onTabChange={setActiveTab} onBack={onBack} name={detailData.name} instagramEmbed={detailData.instagramEmbed} />
      <BottomSection
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedTags={detailData.tags}
        location={detailData.address}
        recipient={undefined}
        cakeType={undefined}
        color={undefined}
        mood={undefined}
        cakelists={detailData.cakelists}
        instagramUrl={detailData.instagramUrl}
      />
    </Box>
  );
}
