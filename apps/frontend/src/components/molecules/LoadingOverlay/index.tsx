'use client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import { useAppSelector } from '../../../store/hooks/useAppSelector';

const LoadingOverlay: React.FC = () => {
  const { loading } = useAppSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 1300 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
