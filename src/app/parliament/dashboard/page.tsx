import { FetchReturn, GetQuery, ParliamentTicketSummary } from '@/lib/types';
import ParliamentDashboardOverview from './ParliamentDashboardOverview';
import ParliamentPendingAidRequestCard from './ParliamentPendingAidRequestCard';
import ParliamentPendingComplaintCard from './ParliamentPendingComplaintCard';
import ParliamentTimeFilter from '../(components)/ParliamentTimeFilter';
import React from 'react';
import fetchNexticket from '@/lib/customFetch';

const ParliamentDashboard = async ({
  searchParams,
}: {
  searchParams: { period_end?: string };
}) => {
  const ticketSummaryResponse: FetchReturn<GetQuery<ParliamentTicketSummary>> =
    await fetchNexticket('/parliament-ticket/summary', {
      queries: {
        period_end: searchParams.period_end || '',
      },
    });

  return (
    <>
      <h4 className='text-foreground font-semibold'>Home</h4>
      <div className='flex flex-col items-center justify-between py-16'>
        <div className='w-full'>
          <div className='flex gap-2 justify-center'>
            <ParliamentPendingAidRequestCard
              ticketSummary={ticketSummaryResponse}
            />
            <ParliamentPendingComplaintCard
              ticketSummary={ticketSummaryResponse}
            />
          </div>
          <div className='w-full flex items-center justify-between mt-10'>
            <h4 className='text-h6 text-textPrimary'>Overview</h4>
            <ParliamentTimeFilter />
          </div>
          <ParliamentDashboardOverview ticketSummary={ticketSummaryResponse} />
        </div>
      </div>
    </>
  );
};

export default ParliamentDashboard;
