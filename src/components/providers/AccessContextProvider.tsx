'use client';

import React, { createContext, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FetchReturn } from '@/lib/customFetch';
import { Loader2Icon } from 'lucide-react';
import { UserData } from '@/lib/types';
import { useTheme } from 'next-themes';

export interface IAccessContext {
  userData: UserData;
  accessOk: boolean;
  accessMessage: string;
}

export const AccessContext = createContext({} as IAccessContext);

const AccessContextProvider = ({
  children,
  userAccountRes,
}: {
  children: React.ReactNode;
  userAccountRes: FetchReturn;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();

  const accessMessage: string = useMemo(
    () => userAccountRes.data?.message,
    [userAccountRes]
  );
  const userData: UserData = useMemo(
    () => userAccountRes.data.data,
    [userAccountRes]
  );
  const hasUserData: boolean = useMemo(
    () => userData && Object.keys(userData).length > 0,
    [userData]
  );
  const isInvalidRoute: boolean = useMemo(
    () =>
      (pathname.includes('parliament') &&
        userData.role !== 'PARLIAMENT_ADMIN') ||
      (!pathname.includes('parliament') &&
        userData.role === 'PARLIAMENT_ADMIN'),
    [userData, pathname]
  );
  const accessOk: boolean = useMemo(() => userAccountRes.ok, [userAccountRes]);

  useEffect(() => {
    if (hasUserData) {
      if (/not verified/g.test(accessMessage)) {
        router.replace('/verify?email=' + accessMessage.split(' ')[0]);
        return;
      }

      if (
        userData.role === 'PARLIAMENT_ADMIN' &&
        !pathname.includes('/parliament')
      ) {
        setTheme('light');
        router.replace('/parliament/dashboard');
      } else if (
        userData.role !== 'PARLIAMENT_ADMIN' &&
        pathname.includes('/parliament')
      ) {
        router.replace('/dashboard');
      }
    }
  }, [router, userData, hasUserData, accessMessage, pathname, setTheme]);

  return (
    <AccessContext.Provider value={{ userData, accessOk, accessMessage }}>
      {hasUserData && isInvalidRoute ? (
        <div className='h-screen w-screen bg-white flex flex-col justify-center items-center gap-4'>
          <Loader2Icon className='animate-spin' size={48} />
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AccessContext.Provider>
  );
};

export default AccessContextProvider;
