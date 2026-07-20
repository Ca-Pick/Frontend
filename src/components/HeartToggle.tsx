import { useState } from 'react';
import { IconButton, Snackbar, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface HeartToggleProps {
  onClick?: (isFilled: boolean) => void;
}

export function HeartToggle({ onClick }: HeartToggleProps) {
  const [isFilled, setIsFilled] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const newState = !isFilled;
    setIsFilled(newState);
    if (newState) {
      setOpenToast(true);
    }
    onClick?.(newState);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleViewSaved = () => {
    navigate('/saved');
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          padding: 0,
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <img
          src={isFilled ? '/src/assets/images/fiiledheart.svg' : '/src/assets/images/cherry.svg'}
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
