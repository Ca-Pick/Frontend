import { Box } from '@mui/material';
import { ProfileSection } from './section/ProfileSection';
import { MenuSection } from './section/MenuSection';

export function MyPage() {
  const handleTermsClick = () => {
    console.log('이용약관 클릭');
  };

  const handlePrivacyClick = () => {
    console.log('개인정보처리방침 클릭');
  };

  const handleLogoutClick = () => {
    console.log('로그아웃 클릭');
  };

  const handleWithdrawClick = () => {
    console.log('회원탈퇴 클릭');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 72px)',
        gap: '24px',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2
      }}
    >
      <ProfileSection
        nickname="닉네임"
        email="sample@naver.com"
      />
      <Box sx={{height: '1px', backgroundColor: '#eee'}}></Box>
      <MenuSection
        onTermsClick={handleTermsClick}
        onPrivacyClick={handlePrivacyClick}
        onLogoutClick={handleLogoutClick}
        onWithdrawClick={handleWithdrawClick}
      />
    </Box>
  );
}
