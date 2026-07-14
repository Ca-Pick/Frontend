import { Box, Typography, Chip, Button } from '@mui/material';
import { colors } from '../../../theme/colors';
import { BackButton } from '../../../components/BackButton';

interface SavedFilteredHeaderProps {
  onBack?: () => void;
  tags: string[];
  onRemoveTag?: (tagToRemove: string, index: number) => void;
  onEditTags?: () => void;
}

export function SavedFilteredHeader({ onBack, tags, onRemoveTag, onEditTags }: SavedFilteredHeaderProps) {

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start'
      }}
    >
      <Box sx={{ py: '12px' }}>
        <BackButton onClick={onBack}/>
        </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', alignItems: 'flex-start' }}>
      <Typography variant="t4_b" sx={{ color: '#616161'}}>
        선택된 태그
      </Typography>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1, maxWidth: '280px', flexWrap: 'wrap' }}>
          {tags.map((tag, idx) => (
            <Chip
              key={idx}
              label={tag}
              onDelete={() => onRemoveTag?.(tag, idx)}
              color="primary"
              variant="filled"
            />
          ))}
        </Box>
        <Button
          variant="text"
          size="small"
          color="secondary"
          onClick={onEditTags}
        >
          수정하기
        </Button>
      </Box>
    </Box>
    </Box>
  );
}
