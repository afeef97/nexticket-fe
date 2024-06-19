import React from 'react';
import { getTicketsSummary } from './api';

const ParliamentDashboardOverview = async ({
  searchParams,
}: {
  searchParams: { period_end?: string };
}) => {
  const ticketSummary = await getTicketsSummary(searchParams.period_end || '');

  return (
    <div className='w-full border border-lineSecondary flex text-textPrimary mt-4 '>
      <div className='w-1/3 border-r border-lineSecondary'>
        <div className='p-6'>
          <div className='flex flex-col gap-2'>
            <div className='text-body1'>Total ticket received</div>
            <div className='text-h5'>
              {(ticketSummary?.ok &&
                ticketSummary.data.data.all?.total_ticket_count) ||
                0}
            </div>
          </div>
          <div className='flex flex-col gap-4 mt-10'>
            <div className='w-full flex items-center justify-between'>
              <div className='text-body1'>Aid ticket</div>
              <div className='text-sub1'>
                {(ticketSummary?.ok &&
                  ticketSummary.data.data.aid?.total_ticket_count) ||
                  0}
              </div>
            </div>
            <div className='w-full flex items-center justify-between'>
              <div className='text-body1'>Complaint ticket</div>
              <div className='text-sub1'>
                {(ticketSummary?.ok &&
                  ticketSummary.data.data.complaint?.total_ticket_count) ||
                  0}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-2/3 flex flex-col'>
        <div className='flex'>
          <div className='w-1/2 border-r border-lineSecondary'>
            <div className='flex flex-col gap-2 p-4'>
              <div className='text-body1'>Total aid ticket approved</div>
              <div className='text-h5'>
                {(ticketSummary?.ok &&
                  ticketSummary.data.data.aid?.total_completed_count) ||
                  0}
              </div>
            </div>
          </div>
          <div className='w-1/2'>
            <div className='flex flex-col gap-2 p-4'>
              <div className='text-body1'>Total aid ticket rejected</div>
              <div className='text-h5'>
                {(ticketSummary?.ok &&
                  ticketSummary.data.data.aid?.total_rejected_count) ||
                  0}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full border-t border-lineSecondary'>
          <div className='flex flex-col gap-2 p-4'>
            <div className='text-body1'>Total complaint ticket resolved</div>
            <div className='text-h5'>
              {(ticketSummary?.ok &&
                ticketSummary.data.data.complaint?.total_completed_count) ||
                0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParliamentDashboardOverview;
