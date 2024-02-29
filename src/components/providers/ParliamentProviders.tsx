import AccessExpiredProvider from './AccessExpiredProvider';
import ParliamentAccessContextProvider from './ParliamentAccessContextProvider';
import React from 'react';
import { getUserAccount } from '@/app/dashboard/actions';

const ParliamentProviders = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getUserAccountResponse = await getUserAccount();

  return (
    <ParliamentAccessContextProvider userAccountRes={getUserAccountResponse}>
      <AccessExpiredProvider
        open={
          !getUserAccountResponse.ok &&
          getUserAccountResponse.data.statusCode === 401
        }
      >
        {children}
      </AccessExpiredProvider>
    </ParliamentAccessContextProvider>
  );
};

export default ParliamentProviders;
