'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();

  const { userData, accessOk } = useContext<IAccessContext>(AccessContext);

  useEffect(() => {
    if (!userData || !accessOk) return;
    if (!userData.organization_id) {
      router.replace('/dashboard/register-organization');
    } else if (!userData.username) {
      router.replace('/dashboard/account/update');
    }
  }, [router, userData, accessOk, path]);

  return <>{children}</>;
};

export default CheckUser;
