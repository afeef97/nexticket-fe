import { FetchReturn, GetQuery, ParliamentTicketSummary } from '@/lib/types';
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
          {/* <div className='w-full border border-lineSecondary flex text-textPrimary mt-4 '>
            <div className='w-1/3 border-r border-lineSecondary'>
              <div className='p-6'>
                <div className='flex flex-col gap-2'>
                  <div className='text-body1'>Total ticket received</div>
                  <div className='text-h5'>
                    {isPendingTicketSummary ? (
                      <ParliamentSkeletonCard />
                    ) : (
                      (ticketSummaryData?.ok &&
                        ticketSummaryData.data.data.all?.total_ticket_count) ||
                      0
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-4 mt-10'>
                  <div className='w-full flex items-center justify-between'>
                    <div className='text-body1'>Aid ticket</div>
                    <div className='text-sub1'>
                      {isPendingTicketSummary ? (
                        <ParliamentSkeletonCard />
                      ) : (
                        (ticketSummaryData?.ok &&
                          ticketSummaryData.data.data.aid
                            ?.total_ticket_count) ||
                        0
                      )}
                    </div>
                  </div>
                  <div className='w-full flex items-center justify-between'>
                    <div className='text-body1'>Complaint ticket</div>
                    <div className='text-sub1'>
                      {isPendingTicketSummary ? (
                        <ParliamentSkeletonCard />
                      ) : (
                        (ticketSummaryData?.ok &&
                          ticketSummaryData.data.data.complaint
                            ?.total_ticket_count) ||
                        0
                      )}
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
                      {isPendingTicketSummary ? (
                        <ParliamentSkeletonCard />
                      ) : (
                        (ticketSummaryData?.ok &&
                          ticketSummaryData.data.data.aid
                            ?.total_completed_count) ||
                        0
                      )}
                    </div>
                  </div>
                </div>
                <div className='w-1/2'>
                  <div className='flex flex-col gap-2 p-4'>
                    <div className='text-body1'>Total aid ticket rejected</div>
                    <div className='text-h5'>
                      {isPendingTicketSummary ? (
                        <ParliamentSkeletonCard />
                      ) : (
                        (ticketSummaryData?.ok &&
                          ticketSummaryData.data.data.aid
                            ?.total_rejected_count) ||
                        0
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full border-t border-lineSecondary'>
                <div className='flex flex-col gap-2 p-4'>
                  <div className='text-body1'>
                    Total complaint ticket resolved
                  </div>
                  <div className='text-h5'>
                    {isPendingTicketSummary ? (
                      <ParliamentSkeletonCard />
                    ) : (
                      (ticketSummaryData?.ok &&
                        ticketSummaryData.data.data.complaint
                          ?.total_completed_count) ||
                      0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ParliamentDashboard;
