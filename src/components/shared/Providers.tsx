import { getOrganization, getUserAccount } from '@/app/dashboard/actions';
import AccessContextProvider from '../providers/AccessContextProvider';
import AccessExpiredProvider from './AccessExpired';
import OrganizationProvider from '../providers/OrganizationProvider';
import React from 'react';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const getUserAccountResponse = await getUserAccount();
  const getOrganizationResponse = await getOrganization();

  return (
    <AccessContextProvider userAccountRes={getUserAccountResponse}>
      <AccessExpiredProvider
        open={
          !getUserAccountResponse.ok &&
          getUserAccountResponse.data.statusCode === 401
        }
      >
        <OrganizationProvider organizationRes={getOrganizationResponse}>
          {children}
        </OrganizationProvider>
      </AccessExpiredProvider>
    </AccessContextProvider>
  );
};

export default Providers;
