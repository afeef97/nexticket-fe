'use client';

import React, { createContext, useMemo } from 'react';
import { FetchReturn } from '@/lib/customFetch';
import { OrganizationData } from '@/lib/types';

export interface IOrganizationContext extends Partial<OrganizationData> {
  _count?: { users: number; tickets: number };
  organizationOk: boolean;
  members?: { verified: number; unverified: number };
  hasApiKey: boolean;
}

export const OrganizationContext = createContext({} as IOrganizationContext);

const OrganizationProvider = ({
  children,
  organizationRes,
}: {
  children: React.ReactNode;
  organizationRes: FetchReturn;
}) => {
  const organizationData: Partial<OrganizationData> = useMemo(
    () => organizationRes.data?.data,
    [organizationRes]
  );
  const organizationOk: boolean = useMemo(
    () => organizationRes.ok,
    [organizationRes]
  );
  const hasApiKey: boolean = useMemo(
    () => organizationOk && Boolean(organizationData.api_key),
    [organizationOk, organizationData]
  );

  return (
    <OrganizationContext.Provider
      value={{ ...organizationData, organizationOk, hasApiKey }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationProvider;
