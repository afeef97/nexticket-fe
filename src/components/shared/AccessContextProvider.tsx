'use client';

import React, { createContext, useEffect, useMemo } from 'react';
import { FetchReturn } from '@/lib/customFetch';
import { useRouter } from 'next/navigation';

export interface IAccessContext {
  userData: FetchReturn;
}

export const AccessContext = createContext({} as IAccessContext);

const AccessContextProvider = ({
  children,
  userAccountRes,
}: {
  children: React.ReactNode;
  userAccountRes: FetchReturn;
}) => {
  const router = useRouter();

  const userData = useMemo(() => userAccountRes, [userAccountRes]);

  useEffect(() => {
    if (
      Object.keys(userData).length > 0 &&
      /not verified/g.test(userData.data.message)
    ) {
      router.replace('/verify?email=' + userData.data.message.split(' ')[0]);
      return;
    }
  }, [router, userData]);
  return (
    <AccessContext.Provider value={{ userData }}>
      {children}
    </AccessContext.Provider>
  );
};

export default AccessContextProvider;
