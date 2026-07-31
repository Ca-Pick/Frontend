import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ProfileSection } from './section/ProfileSection';
import { MenuSection } from './section/MenuSection';
import { getMyInfo } from '../../api/services/memberService';
import { logout, withdraw } from '../../api/services/authService';
import type { UserInfo } from '../../types/api';

export function MyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfo();
        setUserInfo(response.data);
      } catch (error) {
        console.error('마이페이지 조회 실패:', error);
      }
    };

    fetchMyInfo();
  }, []);

  const handleTermsClick = () => {
    console.log('이용약관 클릭');
  };

  const handlePrivacyClick = () => {
    console.log('개인정보처리방침 클릭');
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      localStorage.removeItem('loginRedirectUrl');
      // 로그인 상태에서 받아온 저장 목록 캐시가 남아있으면 로그아웃 후에도
      // 하트가 채워진 채로 보이므로 로그아웃과 동시에 비워준다
      queryClient.removeQueries({ queryKey: ['savedCakes'] });
      // 주문서 탭에 남아있던 이전 세션의 작성 상태(스텝/검색조건 등)를
      // 로그아웃 후에도 그대로 복원하면 안 되므로 함께 비운다
      sessionStorage.removeItem('orderLastPath');
      navigate('/', { replace: true });
    }
  };

  const handleWithdrawClick = () => {
    setWithdrawDialogOpen(true);
  };

  const handleWithdrawCancel = () => {
    setWithdrawDialogOpen(false);
  };

  const handleWithdrawConfirm = async () => {
    setWithdrawing(true);
    try {
      await withdraw();
      queryClient.removeQueries({ queryKey: ['savedCakes'] });
      sessionStorage.removeItem('orderLastPath');
      navigate('/', { replace: true, state: { withdrawSuccess: true } });
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      setWithdrawDialogOpen(false);
      setWithdrawError('탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <>
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
          nickname={userInfo?.nickname}
          provider={userInfo?.provider}
        />
        <Box sx={{ height: '1px', backgroundColor: '#eee' }}></Box>
        <MenuSection
          onTermsClick={handleTermsClick}
          onPrivacyClick={handlePrivacyClick}
          onLogoutClick={handleLogoutClick}
          onWithdrawClick={handleWithdrawClick}
        />
      </Box>

      <Dialog open={withdrawDialogOpen} onClose={handleWithdrawCancel}>
        <DialogTitle>회원탈퇴</DialogTitle>
        <DialogContent>
          <DialogContentText>
            탈퇴하시면 저장된 정보가 모두 삭제되며 되돌릴 수 없습니다. 정말 탈퇴하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWithdrawCancel} disabled={withdrawing} color="secondary"
            variant='text'>
            취소
          </Button>
          <Button
            onClick={handleWithdrawConfirm}
            disabled={withdrawing}
            color="primary"
            variant='text'
          >
            탈퇴하기
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!withdrawError}
        autoHideDuration={4000}
        onClose={() => setWithdrawError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
            color: '#fff',
            padding: '4px 16px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '94px',
          }}
        >
          <Typography variant="label_4">{withdrawError}</Typography>
        </Box>
      </Snackbar>
    </>
  );
}
