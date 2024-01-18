import AccessExpired from '@/components/shared/AccessExpired';
import CheckOrganization from './(dashboard)/CheckOrganization';
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
    <AccessExpired
      key={getUserAccountResponse.data.statusCode}
      open={
        !getUserAccountResponse.ok &&
        getUserAccountResponse.data.statusCode === 401
      }
    >
      <main className='md:tw-grid tw-grid-cols-[auto_1fr]'>
        <Navigation />
        <div className='tw-min-h-[calc(100vh-4rem)] tw-py-2 md:tw-py-4 tw-px-3 md:tw-px-6'>
          <CheckOrganization>{children}</CheckOrganization>
        </div>
      </main>
    </AccessExpired>
  );
};

export default AppLayout;
