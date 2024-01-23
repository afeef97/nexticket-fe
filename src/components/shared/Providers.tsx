import AccessContextProvider from './AccessContextProvider';
import AccessExpiredProvider from './AccessExpired';
import React from 'react';
import { getUserAccount } from '@/app/dashboard/actions';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const getUserAccountResponse = await getUserAccount();
  return (
    <AccessContextProvider userAccountRes={getUserAccountResponse}>
      <AccessExpiredProvider>{children}</AccessExpiredProvider>
    </AccessContextProvider>
  );
};

export default Providers;
