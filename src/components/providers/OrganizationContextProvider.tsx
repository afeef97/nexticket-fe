'use client';

import { FetchReturn, GetQuery, OrganizationData } from '@/lib/types';
import React, { createContext } from 'react';

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
  organizationRes: FetchReturn<GetQuery<OrganizationData>>;
}) => {
  const organizationOk: boolean = organizationRes.ok;
  const organizationData: Partial<OrganizationData> | undefined =
    organizationRes.ok ? organizationRes.data.data : undefined;
  const hasApiKey: boolean = Boolean(organizationData?.api_key);

  return (
    <OrganizationContext.Provider
      value={{ ...organizationData, organizationOk, hasApiKey }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationContextProvider;
