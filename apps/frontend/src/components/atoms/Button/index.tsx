import { Button as MuiButton, ButtonProps } from '@mui/material';
import React from 'react';

export interface CustomButtonProps extends ButtonProps {
  fullWidth?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};

export default Button;