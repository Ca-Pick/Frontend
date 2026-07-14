import { Box, Typography } from '@mui/material';

export function SavedHeader() {
  return (
    <Box
      sx={{
        px: 2,
        pt: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
        <Typography variant="t2_b" sx={{ color: '#000' }}>
          저장함
        </Typography>
        <Typography variant="label_3" sx={{ color: '#757575' }}>
          총 22개
        </Typography>
      </Box>
    </Box>
  );
}
