import { Box } from '@mui/material';
import { OrderStep1 } from './section/OrderStep1';
import { OrderStep2 } from './section/OrderStep2';


export function OrderCreate() {
  return (
    <Box sx={{ width: '100%' }}>
      <OrderStep1 />
      <OrderStep2 />
    </Box>
  );
}
