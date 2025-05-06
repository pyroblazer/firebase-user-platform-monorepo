import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme/theme';
import LoadingOverlay from '../../components/molecules/LoadingOverlay';
import AlertPopup from '../../components/molecules/AlertPopup';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingOverlay />
      <AlertPopup />
      {children}
    </ThemeProvider>
  );
};

export default AuthLayout;