import React from 'react';
import { Box } from '@mui/material';
import AuthLayout from '../AuthLayout';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AuthLayout>
        {children}
    </AuthLayout>
  );
};

export default MainLayout;