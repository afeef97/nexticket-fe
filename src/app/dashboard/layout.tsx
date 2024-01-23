import AccessContextProvider from '@/components/shared/AccessContextProvider';
import AccessExpiredProvider from '@/components/shared/AccessExpired';
import CheckUser from './(dashboard)/CheckUser';
import { Metadata } from 'next';
import Navigation from './(dashboard)/Navigation';
import React from 'react';
import { getUserAccount } from './actions';

export const metadata: Metadata = {
  title: 'nexticket | Dashboard',
};

const AppLayout = async ({ children }: { children: React.ReactElement }) => {
  const getUserAccountResponse = await getUserAccount();

  return (
    <AccessContextProvider userAccountRes={getUserAccountResponse}>
      <AccessExpiredProvider>
        <main className='md:tw-grid tw-grid-cols-[auto_1fr]'>
          <Navigation />
          <div className='tw-min-h-[calc(100vh-4rem)] tw-py-2 md:tw-py-4 tw-px-3 md:tw-px-6'>
            <CheckUser>{children}</CheckUser>
          </div>
        </main>
      </AccessExpiredProvider>
    </AccessContextProvider>
  );
};

export default AppLayout;
