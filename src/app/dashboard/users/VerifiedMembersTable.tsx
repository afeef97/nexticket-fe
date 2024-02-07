import DataTable from '@/components/shared/DataTable';
import { FetchReturn } from '@/lib/customFetch';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { VerifiedMembersColumn } from './VerifiedMembersColumn';

const VerifiedMembersTable = ({
  verifiedMembersResponse,
}: {
  verifiedMembersResponse: FetchReturn;
}) => {
  if (!verifiedMembersResponse.ok) {
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
      columns={VerifiedMembersColumn}
      data={verifiedMembersResponse.data.data}
    />
  );
};

export default VerifiedMembersTable;
