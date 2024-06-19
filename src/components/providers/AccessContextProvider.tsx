'use client';

import { FetchReturn, GetQuery, UserData } from '@/lib/types';
import React, { createContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { useTheme } from 'next-themes';

export interface IAccessContext {
  userData: UserData | undefined;
  hasUserData: boolean | undefined;
  accessOk: boolean;
  accessMessage: string;
}

export const AccessContext = createContext({} as IAccessContext);

const AccessContextProvider = ({
  children,
  userAccountRes,
}: {
  children: React.ReactNode;
  userAccountRes: FetchReturn<GetQuery<UserData>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();

  const accessOk: boolean = userAccountRes.ok;
  const accessMessage: string = userAccountRes.data.message;

  const userData: UserData | undefined = userAccountRes.ok
    ? userAccountRes.data.data
    : undefined;
  const hasUserData: boolean | undefined =
    Object.keys(userData || {}).length > 0;

  const isInvalidRoute: boolean =
    (pathname.includes('parliament') &&
      userData?.role !== 'PARLIAMENT_ADMIN') ||
    (!pathname.includes('parliament') && userData?.role === 'PARLIAMENT_ADMIN');

  useEffect(() => {
    if (hasUserData) {
      if (accessMessage && /not verified/g.test(accessMessage)) {
        router.replace('/verify?email=' + accessMessage.split(' ')[0]);
        return;
      }

      if (
        userData?.role === 'PARLIAMENT_ADMIN' &&
        !pathname.includes('/parliament')
      ) {
        setTheme('light');
        router.replace('/parliament/dashboard');
      } else if (
        userData?.role !== 'PARLIAMENT_ADMIN' &&
        pathname.includes('/parliament')
      ) {
        router.replace('/dashboard');
      }
    }
  }, [router, userData, hasUserData, accessMessage, pathname, setTheme]);

  return (
    <AccessContext.Provider
      value={{ userData, hasUserData, accessOk, accessMessage }}
    >
      {hasUserData && isInvalidRoute ? (
        <div className='h-screen w-screen bg-white flex flex-col justify-center items-center gap-4'>
          <Loader2Icon
            className='animate-spin'
            size={48}
          />
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AccessContext.Provider>
  );
};

export default AccessContextProvider;
