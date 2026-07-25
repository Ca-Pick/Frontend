import { Box, Stack, Typography, Avatar } from '@mui/material';
import { colors } from '../../../theme/colors';

const PROVIDER_LABELS: Record<string, string> = {
  kakao: '카카오 계정',
  naver: '네이버 계정',
};

interface ProfileSectionProps {
  nickname?: string;
  provider?: string;
  profileImage?: string;
}

export function ProfileSection({
  nickname = '닉네임',
  provider,
  profileImage,
}: ProfileSectionProps) {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '243px',
      }}
    >
      {/* Profile Image */}
      <Avatar
        src={profileImage}
        sx={{
          width: 120,
          height: 120,
          backgroundColor: colors._components.avatar.fill,
        }}
      />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        alignItems: 'center'
      }}>
        {/* Nickname */}
        <Typography
          variant="t2_b"
          sx={{
            color: '#000',
            textAlign: 'center',
          }}
        >
          {nickname}
        </Typography>

        {/* Provider */}
        <Typography
          variant="t4_r"
          sx={{
            color: '#9E9E9E',
            textAlign: 'center',
          }}
        >
          {provider ? PROVIDER_LABELS[provider] ?? provider : ''}
        </Typography>
      </Box>
    </Box>
  );
}
