import { useState, useEffect } from 'react';
import { IconButton, Snackbar, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSaveCakeMutation, useUnsaveCakeMutation } from '../hooks';
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

  const saveMutation = useSaveCakeMutation();
  const unsaveMutation = useUnsaveCakeMutation();

  useEffect(() => {
    setIsSaved(initialSaved);
  }, [initialSaved]);

  const handleClick = async () => {
    const newState = !isSaved;
    const previousState = isSaved;

    // 즉시 UI 업데이트 (Optimistic Update)
    setIsSaved(newState);
    if (newState) {
      setOpenToast(true);
    }

    try {
      if (newState) {
        await saveMutation.mutateAsync(referenceId);
      } else {
        await unsaveMutation.mutateAsync(referenceId);
      }
      onClick?.(newState);
    } catch (error: any) {
      // 에러가 발생하면 이전 상태로 복구
      setIsSaved(previousState);

      if (error.response?.status === 404) {
        console.error('케이크를 찾을 수 없습니다');
      }
      // 401은 이제 Interceptor에서 자동 처리됨
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
