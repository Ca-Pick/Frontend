import { Box, Stack, Typography } from '@mui/material';
import { colors } from '../../theme/colors';

export function OrderCreate() {
  return (
    <Stack sx={{ width: '100%' }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          minHeight: 400,
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: colors.text.secondary, textAlign: 'center' }}
        >
          주문서 작성
        </Typography>
      </Box>
    </Stack>
  );
}
