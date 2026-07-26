import { Box, Typography } from '@mui/material';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  name?: string;
  height?: number | string;
}

export function KakaoMap({ latitude, longitude, name, height = '180px' }: KakaoMapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
  });

  if (error) {
    return (
      <Box sx={{ width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="b3_r" sx={{ color: '#757575' }}>
          지도를 불러올 수 없습니다.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return <Box sx={{ width: '100%', height, bgcolor: '#f5f5f5', borderRadius: '8px' }} />;
  }

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height, borderRadius: '8px' }}
      level={3}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} title={name} />
    </Map>
  );
}
