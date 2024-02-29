'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectParliament = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/parliament/dashboard');
  }, [router]);

  return null;
};

export default RedirectParliament;
