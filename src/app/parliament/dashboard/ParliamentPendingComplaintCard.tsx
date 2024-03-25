import { FetchReturn, GetQuery, ParliamentTicketSummary } from '@/lib/types';
import { FaRegFlag } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import fetchNexticket from '@/lib/customFetch';

const ParliamentPendingComplaintCard = async ({
  searchParams,
}: {
  searchParams: { period_end?: string };
}) => {
  const ticketSummary: FetchReturn<GetQuery<ParliamentTicketSummary>> =
    await fetchNexticket('/parliament-ticket/summary', {
      queries: {
        period_end: searchParams.period_end || '',
      },
    });
  return (
    <div className='border border-lineSecondary w-1/2 rounded'>
      <div className='w-full flex items-center justify-between px-6 py-4'>
        <div className='flex flex-col gap-4'>
          <div className='text-body1 text-textPrimary'>Pending complaint</div>
          <div className='text-h5 text-textPrimary'>
            {(ticketSummary?.ok &&
              ticketSummary.data.data.complaint?.total_pending_count) ||
              0}
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
  );
};

export default ParliamentPendingComplaintCard;
