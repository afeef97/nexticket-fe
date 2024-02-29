'use client';

import React, { createContext, useEffect, useMemo } from 'react';
import { FetchReturn } from '@/lib/customFetch';
import { Loader2Icon } from 'lucide-react';
import { UserData } from '@/lib/types';
import { useRouter } from 'next/navigation';

export interface IAccessContext {
  userData: UserData;
  accessOk: boolean;
  accessMessage: string;
}

export const AccessContext = createContext({} as IAccessContext);

const ParliamentAccessContextProvider = ({
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
  const hasUserData: boolean = useMemo(
    () => userData && Object.keys(userData).length > 0,
    [userData]
  );

  useEffect(() => {
    if (!hasUserData) {
      return;
    }

    if (userData && userData.role !== 'PARLIAMENT_ADMIN') {
      router.replace('/dashboard');
    }
  }, [router, userData, hasUserData]);

  return (
    <AccessContext.Provider value={{ userData, accessOk, accessMessage }}>
      {hasUserData && userData.role !== 'PARLIAMENT_ADMIN' ? (
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

export default ParliamentAccessContextProvider;
