'use client';

import { useEffect, useState } from 'react';

const useWindowInnerWidth = () => {
  const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowInnerWidth(window.innerWidth);
      window.addEventListener('resize', () => {
        setWindowInnerWidth(window.innerWidth);
      });
    }
  }, []);

  return windowInnerWidth;
};

export default useWindowInnerWidth;
