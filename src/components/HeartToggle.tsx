import { useState, useEffect } from 'react';
import { IconButton, Snackbar, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSaveCakeMutation, useUnsaveCakeMutation } from '../hooks';
import { setPendingHeartAction, consumePendingHeartToast } from '../utils/pendingHeartAction';
import filledHeartSvg from '../assets/images/fiiledheart.svg';
import cherrySvg from '../assets/images/cherry.svg';

interface HeartToggleProps {
  referenceId: number;
  initialSaved?: boolean;
  onClick?: (isSaved: boolean) => void;
}

export function HeartToggle({ referenceId, initialSaved = false, onClick }: HeartToggleProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const saveMutation = useSaveCakeMutation();
  const unsaveMutation = useUnsaveCakeMutation();

  useEffect(() => {
    setIsSaved(initialSaved);
  }, [initialSaved]);

  useEffect(() => {
    if (consumePendingHeartToast(referenceId)) {
      setOpenToast(true);
    }
  }, [referenceId]);

  const handleClick = async () => {
    const newState = !isSaved;
    const previousState = isSaved;

    // 즉시 UI 업데이트 (Optimistic Update)
    setIsSaved(newState);

    try {
      if (newState) {
        await saveMutation.mutateAsync(referenceId);
        setOpenToast(true);
      } else {
        await unsaveMutation.mutateAsync(referenceId);
      }
      onClick?.(newState);
    } catch (error: any) {
      // 에러가 발생하면 이전 상태로 복구
      setIsSaved(previousState);

      if (error.response?.status === 401) {
        // 로그인이 필요한 경우 - 이어서 실행할 액션을 기록해두고 로그인 페이지로 이동
        setPendingHeartAction(referenceId, newState ? 'save' : 'unsave');
        navigate('/login', { state: { from: location.pathname } });
      } else {
        console.error('API 호출 실패:', error);
      }
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleViewSaved = () => {
    navigate('/saved');
  };

  const isLoading = saveMutation.isPending || unsaveMutation.isPending;

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={isLoading}
        sx={{
          padding: 0,
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        }}
      >
        <img
          src={isSaved ? filledHeartSvg : cherrySvg}
          alt="heart toggle"
          style={{ width: 24, height: 24 }}
        />
      </IconButton>

      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={handleCloseToast}
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
          <Typography variant="label_4">저장함에 담았어요</Typography>
          <Button
            size="small"
            variant='text'
            color="primary"
            onClick={handleViewSaved}
          >
            보러가기
          </Button>
        </Box>
      </Snackbar>
    </>
  );
}
