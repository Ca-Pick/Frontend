import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'md', variant = 'contained', ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        variant={variant as MuiButtonProps['variant']}
        size={size as any}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
