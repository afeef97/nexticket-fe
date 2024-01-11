'use client';

import { useEffect, useState } from 'react';
import { LoadingState } from '@/lib/types';

const useFetch = (
  // eslint-disable-next-line
  query: (...args: unknown[]) => Promise<unknown> | unknown
) => {
  const [data, setData] = useState<unknown>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');

  const handleFetch = async () => {
    try {
      setLoadingState('loading');
      const response = await query();
      setData(response);
      setLoadingState('success');
    } catch {
      setLoadingState('error');
    }
  };

  useEffect(() => {
    handleFetch();
  });

  return {
    data,
    loadingState,
  };
};

export default useFetch;
