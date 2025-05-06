'use client';

import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import React, { useMemo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function EmotionCacheProvider({ children }: Props) {
  const emotionCache = useMemo(() => createEmotionCache(), []);
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
