import { Box, Typography, Button } from '@mui/material';
import { colors } from '../../../theme/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import imgCake from '../../../assets/images/cake.svg';
import imgLogo from '../../../assets/logos/logo_sm.svg';

interface HeroSectionProps {
    onNavigateToOrder?: () => void;
}

export function HeroSection( {onNavigateToOrder }: HeroSectionProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '294px',
        position: 'relative',
        backgroundColor: colors.background,
        overflow: 'hidden',
        px: 2,
        py: 3,
      }}>
      <Box
        component="img"
        src={imgCake}
        sx={{
          position: 'absolute',
          right: '16px',
          bottom: '49px',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          width: '214px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px'
        }}
      >
        <Box
          component="img"
          src={imgLogo}
          sx={{
            width: '53px',
            height: '30px',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            height: '122px',
            display: 'flex',
            width: 'fit-content',
            flexDirection: 'column',
            gap: 2
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'flex-start',
              textAlign: 'left'
            }}>
            <Typography variant="t2_b" color="textPrimary">오늘은 어떤 케이크를<br />찾고 있나요?</Typography>
            <Typography variant="body_b3_m" sx={{ color: '#616161' }}>당신의 취향에 꼭 맞는<br />케이크를 찾아드릴게요.</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex'
            }}>
            <Button variant="contained" color="primary" endIcon={<ChevronRightIcon />} onClick={onNavigateToOrder}>케이크 주문하기</Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '24px',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.04), 0 0 4px 3px rgba(51, 51, 51, 0.02)',
          backgroundColor: colors.color
        }}
      />
    </Box>
  );
}
