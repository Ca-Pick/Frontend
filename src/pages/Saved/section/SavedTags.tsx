import { Box, Typography, Chip, Button } from '@mui/material';
import { colors } from '../../../theme/colors';

interface SavedTagsProps {
  tags: string[];
  onRemoveTag?: (tagToRemove: string, index: number) => void;
  onEditTags?: () => void;
}

export function SavedTags({ tags, onRemoveTag, onEditTags }: SavedTagsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 2, py: 1 }}>
      <Typography variant="t4_b" sx={{ color: colors.text.secondary, fontSize: 16, fontWeight: 600 }}>
        선택된 태그
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1, maxWidth: '280px', flexWrap: 'wrap' }}>
          {tags.map((tag, idx) => (
            <Chip
              key={idx}
              label={tag}
              onDelete={() => onRemoveTag?.(tag, idx)}
              sx={{
                backgroundColor: colors.primary.main,
                color: colors.primary.contrastText,
                height: '24px',
                fontSize: 13,
                '& .MuiChip-deleteIcon': {
                  color: colors.primary.contrastText,
                  fontSize: 16,
                  marginRight: '2px',
                },
              }}
            />
          ))}
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={onEditTags}
          sx={{
            borderColor: colors.secondary.light,
            color: colors.secondary.light,
            padding: '3px 6px',
            minWidth: 'auto',
            fontSize: 13,
            textTransform: 'none',
            fontWeight: 500,
            height: '24px',
            '&:hover': {
              borderColor: colors.secondary.light,
              backgroundColor: colors.secondary._states.hover,
            },
          }}
        >
          수정하기
        </Button>
      </Box>
    </Box>
  );
}
