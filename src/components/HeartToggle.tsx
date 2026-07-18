import { useState } from 'react';
import { IconButton } from '@mui/material';

interface HeartToggleProps {
  onClick?: (isFilled: boolean) => void;
}

export function HeartToggle({ onClick }: HeartToggleProps) {
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    const newState = !isFilled;
    setIsFilled(newState);
    onClick?.(newState);
  };

  return (
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
  );
}
