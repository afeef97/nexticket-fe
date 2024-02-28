'use client';
import React, { useState } from 'react';
import { formatDateToString, subtractMonths, subtractWeeks } from '@/lib/utils';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const ParliamentDashboard = ({ data }: { data: any }) => {
  const isLoading = false;
  const [, setFilterTime] = useState<string>('');
  const getCurrentDate = () => {
    const currentDate = new Date();
    return `&&period_end=${formatDateToString(currentDate)}`;
  };

  const getPastWeekDate = () => {
    const pastWeek = subtractWeeks(new Date(), 1);
    return `&&period_end=${formatDateToString(pastWeek)}`;
  };

  const getPastMonthDate = () => {
    const pastMonth = subtractMonths(new Date(), 1);
    return `&&period_end=${formatDateToString(pastMonth)}`;
  };

  return (
    <main className='w-[calc(100vw-200px)] px-[24px] py-[16px] overflow-y-auto'>
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
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      data?.data.aid.pending_ticket_count
                    )}
                  </div>
                </div>
                {/* <div className=' w-[64px] h-[64px] rounded-full flex items-center justify-center bg-baseBg'>
                  <GiCartwheel size={24} className='text-warning' />
                </div> */}
              </div>
              <div className='w-full flex items-center justify-center border-t border-lineSecondary py-4'>
                <Link href='/aid?status=1'>
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
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      data?.data.complaint.pending_ticket_count
                    )}
                  </div>
                </div>
                {/* <div className=' w-[64px] h-[64px] rounded-full flex items-center justify-center bg-baseBg'>
                  <FaRegFlag size={24} className='text-warning' />
                </div> */}
              </div>
              <div className='w-full flex items-center justify-center border-t border-lineSecondary py-4'>
                <Link href='/complaint?status=1'>
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
                onChange={(e) => setFilterTime(e.target.value)}
                className='border text-body1 border-linePrimary w-[240px] h-[48px] px-2 py-0.5 rounded focus:outline-none focus:border-linePrimary'
              >
                <option value=''>All time</option>
                <option value={getCurrentDate()}>Today</option>
                <option value={getPastWeekDate()}>Past week</option>
                <option value={getPastMonthDate()}>Past month</option>
              </select>
            </div>
          </div>
          <div className='w-full border border-lineSecondary flex text-textPrimary mt-4 '>
            <div className='w-1/3 border-r border-lineSecondary'>
              <div className='p-6'>
                <div className='flex flex-col gap-2'>
                  <div className='text-body1'>Total ticket received</div>
                  <div className='text-h5'>
                    {isLoading ? <Skeleton /> : data?.data.all.ticket_count}
                  </div>
                </div>
                <div className='flex flex-col gap-4 mt-10'>
                  <div className='w-full flex items-center justify-between'>
                    <div className='text-body1'>Aid ticket</div>
                    <div className='text-sub1'>
                      {isLoading ? <Skeleton /> : data?.data.aid.ticket_count}
                    </div>
                  </div>
                  <div className='w-full flex items-center justify-between'>
                    <div className='text-body1'>Complaint ticket</div>
                    <div className='text-sub1'>
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        data?.data.complaint.ticket_count
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
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        data?.data.aid.completed_ticket_count
                      )}
                    </div>
                  </div>
                </div>
                <div className='w-1/2'>
                  <div className='flex flex-col gap-2 p-4'>
                    <div className='text-body1'>Total aid ticket rejected</div>
                    <div className='text-h5'>
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        data?.data.aid.rejected_ticket_count
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
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      data?.data.complaint.completed_ticket_count
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ParliamentDashboard;
