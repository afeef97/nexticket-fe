'use client';

import DataTable from '@/components/shared/DataTable';
import { FetchReturn } from '@/lib/customFetch';
import { PendingMembersColumn } from './PendingMembersColumn';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PendingMembersTable = ({
  pendingMembersResponse,
}: {
  pendingMembersResponse: FetchReturn;
}) => {
  if (!pendingMembersResponse.ok) {
    return (
      <div className='tw-flex tw-flex-col tw-gap-2'>
        <Skeleton className='tw-w-full tw-h-12' />
        <Skeleton className='tw-w-full tw-h-12' />
        <Skeleton className='tw-w-full tw-h-12' />
      </div>
    );
  }
  return (
    <DataTable
      columns={PendingMembersColumn}
      data={pendingMembersResponse.data.data}
    />
  );
};

export default PendingMembersTable;
