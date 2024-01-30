'use client';

import { getUserAccount } from '../actions';
import { useEffect } from 'react';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { useRouter } from 'next/navigation';

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: userData } = useQueryHandler({
    query: getUserAccount,
  });

  useEffect(() => {
    if (!userData || !userData.ok) return;
    if (!userData.data.data.organization_id) {
      router.replace('/dashboard/register-organization');
    }
  }, [router, userData]);

  return <>{children}</>;
};

export default CheckUser;
