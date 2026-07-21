import { Box, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TopSection } from './section/top';
import { BottomSection } from './section/bottom';
import { useDessertDetail } from '../../../hooks';

interface ProductDetailProps {
  productId?: string;
  cakeId?: number;
  onBack?: () => void;
  selectedTags?: string[];
  location?: string;
  recipient?: string;
  cakeType?: string;
  color?: string;
  mood?: string;
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
}: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'other'>('info');

  // URL 파라미터에서 cakeId 추출 (라우터를 통해 들어온 경우)
  const params = useParams<{ cakeId: string }>();
  const id = cakeId || (params.cakeId ? parseInt(params.cakeId) : undefined);

  // 실제 API 데이터 가져오기
  const { data, isLoading, error } = useDessertDetail(id || 0);
  const detailData = data?.data;

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
    <Box sx={{ width: '100%', bgcolor: '#fbf8f3' }}>
      <TopSection
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={onBack}
        name={detailData.name}
        instagramEmbed={detailData.instagramEmbed}
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
      />
    </Box>
  );
}
