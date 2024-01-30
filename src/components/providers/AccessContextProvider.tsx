'use client';

import React, { createContext, useEffect, useMemo } from 'react';
import { FetchReturn } from '@/lib/customFetch';
import { UserData } from '@/lib/types';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const accessMessage: string = useMemo(
    () => userAccountRes.data?.message,
    [userAccountRes]
  );
  const userData: UserData = useMemo(
    () => userAccountRes.data.data,
    [userAccountRes]
  );
  const accessOk: boolean = useMemo(() => userAccountRes.ok, [userAccountRes]);

  useEffect(() => {
    if (
      userData &&
      Object.keys(userData).length > 0 &&
      /not verified/g.test(accessMessage)
    ) {
      router.replace('/verify?email=' + accessMessage.split(' ')[0]);
      return;
    }
  }, [router, userData, accessMessage]);
  return (
    <AccessContext.Provider value={{ userData, accessOk, accessMessage }}>
      {children}
    </AccessContext.Provider>
  );
};

export default AccessContextProvider;
