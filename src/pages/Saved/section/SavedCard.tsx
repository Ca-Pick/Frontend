import { Box, Button } from '@mui/material';
import { colors } from '../../../theme/colors';
import { LiCherry } from '../../../components/Icons';

export type SavedCardItem = {
  id: string;
  title: string;
  image: string;
  liked?: boolean;
};

interface SavedCardProps {
  item: SavedCardItem;
  onLike?: (id: string) => void;
  onDetailClick?: (id: string) => void;
}

export function SavedCard({ item, onLike, onDetailClick }: SavedCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        border: `1px solid ${colors._components.paper.outlineBorder}`,
        borderRadius: '6px',
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.04), 0px 0px 4px 0px rgba(51, 51, 51, 0.02)',
      }}
    >
      {/* Thumbnail */}
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: '100%',
          height: '270px',
          objectFit: 'cover',
          borderRadius: '6px',
          border: `1px solid ${colors._components.paper.outlineBorder}`,
        }}
      />

      {/* Action Row */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onDetailClick?.(item.id)}
          sx={{
            flex: 1,
            backgroundColor: colors.secondary.lighter,
            color: colors.primary.contrastText,
            padding: '4px 10px',
            minHeight: 'auto',
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: colors.secondary.light,
            },
          }}
        >
          상세 보기
        </Button>
        <Box
          onClick={() => onLike?.(item.id)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '2px 4px',
          }}
        >
          <LiCherry sx={{ opacity: item.liked ? 1 : 0.5 }} />
        </Box>
      </Box>
    </Box>
  );
}
