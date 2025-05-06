import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import React from 'react';

const Typography: React.FC<TypographyProps> = ({ children, ...props }) => {
  return <MuiTypography {...props}>{children}</MuiTypography>;
};

export default Typography;
