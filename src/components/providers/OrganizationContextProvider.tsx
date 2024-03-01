'use client';

import { FetchReturn, OrganizationData } from '@/lib/types';
import React, { createContext, useMemo } from 'react';
import { GetOrganization } from '@/app/dashboard/actions';

export interface IOrganizationContext extends Partial<OrganizationData> {
  _count?: { users: number; tickets: number };
  organizationOk: boolean;
  members?: { verified: number; unverified: number };
  hasApiKey: boolean;
}

export const OrganizationContext = createContext({} as IOrganizationContext);

const OrganizationContextProvider = ({
  children,
  organizationRes,
}: {
  children: React.ReactNode;
  organizationRes: FetchReturn<GetOrganization>;
}) => {
  const organizationData: Partial<OrganizationData> | undefined = useMemo(
    () => (organizationRes.ok ? organizationRes.data?.data : undefined),
    [organizationRes]
  );
  const organizationOk: boolean = useMemo(
    () => organizationRes.ok,
    [organizationRes]
  );
  const hasApiKey: boolean = useMemo(
    () => Boolean(organizationData?.api_key),
    [organizationData]
  );

  return (
    <OrganizationContext.Provider
      value={{ ...organizationData, organizationOk, hasApiKey }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationContextProvider;
