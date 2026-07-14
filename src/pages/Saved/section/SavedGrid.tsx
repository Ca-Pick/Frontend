import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { colors } from '../../../theme/colors';
import { SavedCard } from './SavedCard';

type SavedCardItem = {
  id: string;
  title: string;
  image: string;
  liked?: boolean;
};

interface SavedGridProps {
  items: SavedCardItem[];
  isLoading?: boolean;
  error?: Error | null;
  onLike?: (id: string) => void;
  onDetailClick?: (id: string) => void;
}

export function SavedGrid({ items, isLoading, error, onLike, onDetailClick }: SavedGridProps) {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: colors.text.secondary,
        }}
      >
        <Typography>데이터를 불러올 수 없습니다.</Typography>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
        <Typography sx={{ color: colors.text.secondary }}>저장된 항목이 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={1} sx={{ width: '100%' }}>
      {items.map((item) => (
        <Grid item xs={6} key={item.id}>
          <SavedCard
            item={item}
            onLike={onLike}
            onDetailClick={onDetailClick}
          />
        </Grid>
      ))}
    </Grid>
  );
}
