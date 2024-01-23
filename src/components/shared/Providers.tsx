import AccessContextProvider from './AccessContextProvider';
import AccessExpiredProvider from './AccessExpired';
import React from 'react';
import ThemeProviderClient from './ThemeProviderClient';
import { getUserAccount } from '@/app/dashboard/actions';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const getUserAccountResponse = await getUserAccount();
  return (
    <AccessContextProvider userAccountRes={getUserAccountResponse}>
      <ThemeProviderClient>
        <AccessExpiredProvider>{children}</AccessExpiredProvider>
      </ThemeProviderClient>
    </AccessContextProvider>
  );
};

export default Providers;
