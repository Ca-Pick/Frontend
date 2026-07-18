import { Box, Typography } from '@mui/material';

interface SavedHeaderProps {
  count?: number;
}

export function SavedHeader({ count = 0 }: SavedHeaderProps) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
        <Typography variant="t2_b" sx={{ color: '#000' }}>
          저장함
        </Typography>
        {count > 0 && (
          <Typography variant="label_3" sx={{ color: '#757575' }}>
            총 {count}개
          </Typography>
        )}
      </Box>
    </Box>
  );
}
