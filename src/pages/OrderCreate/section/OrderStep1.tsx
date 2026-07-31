import { Box, Typography, Button } from '@mui/material';
import { colors } from '../../../theme/colors';
import CarouselIndicators from '../../../components/CarouselIndicators';
import { StepNavigation } from '../../../components/StepNavigation';
import imgMap from '../../../assets/images/order_map.svg';

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
      borderRadius: '999px',
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

interface OrderStep1Props {
  onNext?: () => void;
  onCarouselChange?: (index: number) => void;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
  onReset?: () => void;
  showReset?: boolean;
}

export function OrderStep1({ onNext, onCarouselChange, selectedLocation = '', onLocationChange, onReset, showReset = false }: OrderStep1Props) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 72px)',
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
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            visibility: showReset ? 'visible' : 'hidden'
          }}>
            <Button
              variant="text"
              color="secondary"
              size="small"
              onClick={onReset}
              tabIndex={showReset ? 0 : -1}
            >
              초기화
            </Button>
          </Box>
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
          selected={selectedLocation === '강남'}
          onClick={() => onLocationChange?.('강남')}
        />
        <CircleButton
          label="성수"
          selected={selectedLocation === '성수'}
          onClick={() => onLocationChange?.('성수')}
        />
        <CircleButton
          label="홍대/상수"
          selected={selectedLocation === '홍대/상수'}
          onClick={() => onLocationChange?.('홍대/상수')}
        />
        <CircleButton
          label="잠실/송파"
          selected={selectedLocation === '잠실/송파'}
          onClick={() => onLocationChange?.('잠실/송파')}
        />
      </Box>
      <CarouselIndicators current={0} total={4} onChange={onCarouselChange} />
      <StepNavigation
        onNext={() => onNext?.()}
        nextDisabled={!selectedLocation}
      />
    </Box>
  );
}
