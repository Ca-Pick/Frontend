import { Box, Typography } from '@mui/material';
import { colors } from '../../../theme/colors';
import { borderRadius } from '../../../theme/radius';
import CarouselIndicators from '../../../components/CarouselIndicators';
import { StepNavigation } from '../../../components/StepNavigation';

const imgMap = "/src/assets/images/order_map.svg";

interface CircleButtonProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({ label, selected = false, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex',
      width: '70px',
      height: '70px',
      padding: '16px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1,
      aspectRatio: '1/1',
      borderRadius: borderRadius.pill,
      backgroundColor: selected ? colors.primary._states.selected : '#EAE7E2',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}
  >
    <Typography
      sx={{
        color: selected ? colors.primary.dark : '#54473B',
        fontSize: '15px',
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>
  </Box>
);

export function OrderStep1() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '645px',
        backgroundColor: colors.background,
        px: 4,
        pt: 12,
        pb: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'center'
        }}>
        <Box
          component="img"
          src={imgMap}
          sx={{
            width: '147px',
            height: '145px',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
          <Typography variant="t1_b" color="textPrimary">어느 지역에서 구매하시나요?</Typography>
          <Typography
            variant="b2_m"
            sx={{ color: '#757575' }}
          >
            위치를 선택하면 추천을 시작해요.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <CircleButton
          label="강남"
          onClick={() => console.log('clicked')}
        />
        <CircleButton
          label="성수"
          selected={true}
          onClick={() => console.log('clicked')}
        />
        <CircleButton
          label="홍대/상수"
          onClick={() => console.log('clicked')}
        />
        <CircleButton
          label="잠실/송파"
          onClick={() => console.log('clicked')}
        />
      </Box>
      <CarouselIndicators />
      <StepNavigation
        onNext={() => console.log('다음 클릭')}
      />
    </Box>
  );
}
