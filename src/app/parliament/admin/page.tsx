import InviteMembers from '@/app/dashboard/users/InviteMembers';
import ParliamentAdminTable from './ParliamentAdminTable';
import ParliamentSearch from '../(components)/ParliamentSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { getParliamentMembers } from './api';

export default async function Admin({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: number;
    'per-page'?: number;
  };
}) {
  const membersData = await getParliamentMembers(
    searchParams.search,
    searchParams.page,
    searchParams['per-page']
  );

  return (
    <div>
      <h4>Admin</h4>

      <div className='flex  flex-col items-center justify-between py-16 '>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <Suspense fallback={<Skeleton className='w-full h-[6.5rem]' />}>
              <ParliamentSearch />
            </Suspense>
            <Suspense fallback={<Skeleton className='w-full h-[6.5rem]' />}>
              <InviteMembers />
            </Suspense>
          </div>
          <div className='mt-8 flex flex-col overflow-x-hidden'>
            <div className=' sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <Suspense fallback={<Skeleton className='w-full h-full' />}>
                  <ParliamentAdminTable membersData={membersData} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
