'use client';
import React, { useEffect, useState } from 'react';
import { FaRegFlag } from 'react-icons/fa';
import { GiCartwheel } from 'react-icons/gi';
import Link from 'next/link';
import ParliamentSkeletonCard from '../(components)/ParliamentSkeletonCard';
import { getTicketsSummary } from './actions';
import { useQuery } from '@tanstack/react-query';

const ParliamentDashboard = () => {
  const [filterTime, setFilterTime] = useState<string>('');

  const {
    data: ticketSummaryData,
    isPending: isPendingTicketSummary,
    refetch: refetchTicketSummary,
  } = useQuery({
    queryKey: ['parliament-tickets-summary'],
    queryFn: () => getTicketsSummary(filterTime),
  });
  useEffect(() => {
    refetchTicketSummary();
  }, [filterTime, refetchTicketSummary]);

  return (
    <>
      <h4 className='text-foreground font-semibold'>Home</h4>
      <div className='flex flex-col items-center justify-between py-16'>
        <div className='w-full'>
          <div className='flex gap-2 justify-center'>
            <div className='border border-lineSecondary w-1/2 rounded'>
              <div className='w-full flex items-center justify-between px-6 py-4'>
                <div className='flex flex-col gap-4'>
                  <div className='text-body1 text-textPrimary'>
                    Pending aid request
                  </div>
                  <div className='text-h5 text-textPrimary'>
                    {isPendingTicketSummary ? (
                      <ParliamentSkeletonCard />
                    ) : (
                      (ticketSummaryData?.ok &&
                        ticketSummaryData.data.data.aid?.total_pending_count) ||
                      0
                    )}
                  </div>
                </div>
                <div className=' w-[64px] h-[64px] rounded-full flex items-center justify-center bg-baseBg'>
                  <GiCartwheel
                    size={24}
                    className='text-warning'
                  />
                </div>
              </div>
              <div className='w-full flex items-center justify-center border-t border-lineSecondary py-4'>
                <Link href='/parliament/aid?status=PENDING'>
                  <div className='text-primary underline cursor-pointer text-sub1 hover:text-primaryHover'>
                    View all
                  </div>
                </Link>
              </div>
            </div>
            <div className='border border-lineSecondary w-1/2 rounded'>
              <div className='w-full flex items-center justify-between px-6 py-4'>
                <div className='flex flex-col gap-4'>
                  <div className='text-body1 text-textPrimary'>
                    Pending complaint
                  </div>
                  <div className='text-h5 text-textPrimary'>
                    {isPendingTicketSummary ? (
                      <ParliamentSkeletonCard />
                    ) : (
                      (ticketSummaryData?.ok &&
                        ticketSummaryData.data.data.complaint
                          ?.total_pending_count) ||
                      0
                    )}
                  </div>
                </div>
                <div className=' w-[64px] h-[64px] rounded-full flex items-center justify-center bg-baseBg'>
                  <FaRegFlag
                    size={24}
                    className='text-warning'
                  />
                </div>
              </div>
              <div className='w-full flex items-center justify-center border-t border-lineSecondary py-4'>
                <Link href='/parliament/complaint?status=PENDING'>
                  <div className='text-primary underline cursor-pointer text-sub1 hover:text-primaryHover'>
                    View all
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full flex items-center justify-between mt-10'>
            <h4 className='text-h6 text-textPrimary'>Overview</h4>
            <div>
              <select
                onChange={(e) => {
                  setFilterTime(e.target.value);
                }}
                className='border text-body1 border-linePrimary w-[240px] h-[48px] px-2 py-0.5 rounded focus:outline-none focus:border-linePrimary'
              >
                <option value=''>All time</option>
                <option value={'today'}>Today</option>
                <option value={'past_week'}>Past week</option>
                <option value={'past_month'}>Past month</option>
              </select>
            </div>
          </div>
          <div className='w-full border border-lineSecondary flex text-textPrimary mt-4 '>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ParliamentDashboard;
