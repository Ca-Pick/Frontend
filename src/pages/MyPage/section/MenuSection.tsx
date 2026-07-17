import { Box, Typography, Divider, Button } from '@mui/material';
import { colors } from '../../../theme/colors';

interface MenuSectionProps {
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
  onLogoutClick?: () => void;
  onWithdrawClick?: () => void;
}

export function MenuSection({
  onTermsClick,
  onPrivacyClick,
  onLogoutClick,
  onWithdrawClick,
}: MenuSectionProps) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Help Center Section */}
      <Box
        sx={{
          gap: '12px',
          display: 'flex',
          flexDirection: 'column',
          paddingX: '16px',
          textAlign: 'left'
        }}
      >
        <Typography
          variant="t3_b"
          sx={{
            color: '#9E9E9E',
          }}
        >
          고객센터
        </Typography>
        <Typography
          variant="t3_b"
          sx={{
            color: '#000',
          }}
        >
          이용약관
        </Typography>
        <Typography
          variant="t3_b"
          sx={{
            color: '#000',
          }}
        >
          개인정보처리방침
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ borderColor: '#EEE' }} />

      {/* Account Section */}
      <Box
        sx={{
          gap: '12px',
          display: 'flex',
          flexDirection: 'column',
          paddingX: '16px',
          width: 'fit-content',
        }}
      >
        <Button
          sx={{
            justifyContent: 'flex-start',
            padding: 0,
            textTransform: 'none',
            color: '#000',
            fontSize: '18px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={onLogoutClick}
        >
          로그아웃
        </Button>
        <Button
          sx={{
            justifyContent: 'flex-start',
            padding: 0,
            textTransform: 'none',
            color: colors.primary.main,
            fontSize: '18px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={onWithdrawClick}
        >
          회원탈퇴
        </Button>
      </Box>
    </Box>
  );
}
