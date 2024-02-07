'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FetchReturn } from '@/lib/customFetch';
import PendingMembersTable from './PendingMembersTable';
import VerifiedMembersTable from './VerifiedMembersTable';

const MembersTabs = ({
  pendingMembersResponse,
  verifiedMembersResponse,
}: {
  pendingMembersResponse: FetchReturn;
  verifiedMembersResponse: FetchReturn;
}) => {
  const [tabsValue, setTabsValue] = useState<string>('verified');

  return (
    <Tabs
      defaultValue={tabsValue}
      value={tabsValue}
      onValueChange={setTabsValue}
    >
      <h4 className='tw-mb-2'>
        {tabsValue[0].toUpperCase() + tabsValue.slice(1)} members
      </h4>
      <TabsList>
        <TabsTrigger value='verified'>Verified</TabsTrigger>
        <TabsTrigger value='pending'>Pending</TabsTrigger>
      </TabsList>

      <TabsContent value='verified'>
        <VerifiedMembersTable
          verifiedMembersResponse={verifiedMembersResponse}
        />
      </TabsContent>
      <TabsContent value='pending'>
        <PendingMembersTable pendingMembersResponse={pendingMembersResponse} />
      </TabsContent>
    </Tabs>
  );
};

export default MembersTabs;
