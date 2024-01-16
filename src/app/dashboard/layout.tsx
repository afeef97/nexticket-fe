import AccessExpired from '@/components/shared/AccessExpired';
import { Metadata } from 'next';
import React from 'react';
import { getUserAccount } from './actions';

export const metadata: Metadata = {
  title: 'nexticket | Dashboard',
};

const AppLayout = async ({ children }: { children: React.ReactElement }) => {
  const getUserAccountResponse = await getUserAccount();
  console.log(getUserAccountResponse);

  return (
    <main>
      <AccessExpired
        key={getUserAccountResponse.data.statusCode}
        open={
          !getUserAccountResponse.ok &&
          getUserAccountResponse.data.statusCode === 401
        }
      >
        {children}
      </AccessExpired>
    </main>
  );
};

export default AppLayout;
