import { Box, Typography, Chip, Button } from '@mui/material';
import { colors } from '../../../theme/colors';
import { BackButton } from '../../../components/BackButton';

interface SavedFilteredHeaderProps {
  onBack?: () => void;
  tags: string[];
  onRemoveTag?: (tagToRemove: string, index: number) => void;
  onEditTags?: () => void;
  location?: string;
  recipient?: string;
  cakeType?: string;
  color?: string;
  mood?: string;
  embedCount?: number;
}

export function SavedFilteredHeader({ onBack, tags, onRemoveTag, onEditTags, location, recipient, cakeType, color, mood, embedCount = 0 }: SavedFilteredHeaderProps) {
  const orderInfoArray = [location, recipient, cakeType, color, mood].filter(Boolean);

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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', alignItems: 'flex-start' }}>
      <Typography variant="t4_b" sx={{ color: '#616161'}}>
        선택된 태그
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', maxHeight: '78px',
            overflowY: 'auto', }}>
          {orderInfoArray.map((info, idx) => (
            <Chip
              key={idx}
              label={info}
              variant="filled"
              color="primary"
              onDelete={() => onRemoveTag?.(tag, idx)}
            />
          ))}
          {tags.map((tag, idx) => (
            <Chip
              key={`tag-${idx}`}
              label={tag}
              onDelete={() => onRemoveTag?.(tag, idx)}
              color="primary"
              variant="filled"
            />
          ))}
        </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="label_3" sx={{ color: '#757575' }}>
          게시물 {embedCount}개
        </Typography>
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
