import React, { Suspense } from 'react';
import ParliamentDashboardOverview from './ParliamentDashboardOverview';
import ParliamentPendingAidRequestCard from './ParliamentPendingAidRequestCard';
import ParliamentPendingComplaintCard from './ParliamentPendingComplaintCard';
import ParliamentTimeFilter from '../(components)/ParliamentTimeFilter';
import { Skeleton } from '@/components/ui/skeleton';

const ParliamentDashboard = ({
  searchParams,
}: {
  searchParams: { period_end?: string };
}) => {
  return (
    <>
      <h4 className='text-foreground font-semibold'>Home</h4>
      <div className='flex flex-col items-center justify-between py-16'>
        <div className='w-full'>
          <div className='flex gap-2 justify-center'>
            <Suspense fallback={<Skeleton className='w-1/2 h-36' />}>
              <ParliamentPendingAidRequestCard searchParams={searchParams} />
            </Suspense>
            <Suspense fallback={<Skeleton className='w-1/2 h-36' />}>
              <ParliamentPendingComplaintCard searchParams={searchParams} />
            </Suspense>
          </div>
          <div className='w-full flex items-center justify-between mt-10'>
            <h4 className='text-h6 text-foreground'>Overview</h4>
            <Suspense fallback={<Skeleton className='w-60 h-12' />}>
              <ParliamentTimeFilter />
            </Suspense>
          </div>
          <Suspense fallback={<Skeleton className='w-full h-52 mt-4' />}>
            <ParliamentDashboardOverview searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ParliamentDashboard;
