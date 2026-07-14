import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { LiArrowLeft } from './Icons';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

export function BackButton({
  onClick,
  label = '검색 결과',
  disabled = false,
}: BackButtonProps) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center', gap: 1,
    }}>
      <Button
        onClick={onClick}
        disabled={disabled}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          minWidth: 'auto',
          color: 'rgba(0, 0, 0, 0.0)',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 0.7,
          },
        }}
      >
        <LiArrowLeft />
      </Button>
      <Typography variant="t2_b" sx={{ color: "#000" }}>{label}</Typography>
    </Box>
  );
}
