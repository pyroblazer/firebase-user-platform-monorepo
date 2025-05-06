'use client'; 
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import EmotionCacheProvider from '@/providers/EmotionCacheProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EmotionCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReduxProvider>{children}</ReduxProvider>
          </ThemeProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
