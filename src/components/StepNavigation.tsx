import React from 'react';
import { Box, Button } from '@mui/material';

interface StepNavigationProps {
  onNext: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
}

export function StepNavigation({
  onNext,
  onPrev,
  nextLabel = '다음',
  prevLabel = '이전',
  nextDisabled = false,
  prevDisabled = false,
}: StepNavigationProps) {
  // 이전 버튼만 있는 경우
  if (!onPrev) {
    return (
      <Button
        size="xlarge" variant="contained" color="primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </Button>
    );
  }

  // 이전, 다음 버튼 둘 다 있는 경우
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        alignSelf: 'stretch',
        '& > Button': {
          flex: 1,
        },
      }}
    >
      <Button
        size="xlarge" variant="contained" color="secondary"
        onClick={onPrev}
        disabled={prevDisabled}
      >
        {prevLabel}
      </Button>
      <Button
        size="xlarge" variant="contained" color="primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </Button>
    </Box>
  );
}
