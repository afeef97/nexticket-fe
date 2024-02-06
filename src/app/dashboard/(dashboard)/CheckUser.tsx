'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import { useContext, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();

  const { userData, accessOk } = useContext<IAccessContext>(AccessContext);
  const accessExpires = useMemo(() => {
    if (!accessOk || typeof document === 'undefined') return;
    const cookies = document.cookie.split('; ');
    const access_expires = decodeURIComponent(cookies[1].split('=')[1]);

    return new Date(access_expires);
  }, [accessOk]);

  useEffect(() => {
    if (accessExpires && accessExpires < new Date()) {
      router.refresh();
    }
    if (userData && accessOk) {
      if (!userData.organization_id) {
        router.replace('/dashboard/register-organization');
      } else if (!userData.username) {
        router.replace('/dashboard/account/update');
      }
    }
  }, [router, userData, accessOk, path, accessExpires]);

  return <>{children}</>;
};

export default CheckUser;
