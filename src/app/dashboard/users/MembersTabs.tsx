'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FetchReturn } from '@/lib/types';
import MembersTable from './MembersTable';
import { PendingMembersColumn } from './PendingMembersColumn';
import { VerifiedMembersColumn } from './VerifiedMembersColumn';

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
      <h4 className='mb-2'>
        {tabsValue[0].toUpperCase() + tabsValue.slice(1)} members
      </h4>
      <TabsList>
        <TabsTrigger value='verified'>Verified</TabsTrigger>
        <TabsTrigger value='pending'>Pending</TabsTrigger>
      </TabsList>

      <TabsContent value='verified'>
        <MembersTable
          fetchMembersResponse={verifiedMembersResponse}
          MembersColumn={VerifiedMembersColumn}
        />
      </TabsContent>
      <TabsContent value='pending'>
        <MembersTable
          fetchMembersResponse={pendingMembersResponse}
          MembersColumn={PendingMembersColumn}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MembersTabs;
