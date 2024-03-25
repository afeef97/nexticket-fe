import { FetchReturn, GetQuery, ParliamentTicketSummary } from '@/lib/types';
import React, { Suspense } from 'react';
import { GiCartwheel } from 'react-icons/gi';
import Link from 'next/link';
import ParliamentSkeletonCard from '../(components)/ParliamentSkeletonCard';

const ParliamentPendingAidRequestCard = ({
  ticketSummary,
}: {
  ticketSummary: FetchReturn<GetQuery<ParliamentTicketSummary>> | undefined;
}) => {
  return (
    <div className='border border-lineSecondary w-1/2 rounded'>
      <div className='w-full flex items-center justify-between px-6 py-4'>
        <div className='flex flex-col gap-4'>
          <div className='text-body1 text-textPrimary'>Pending aid request</div>
          <div className='text-h5 text-textPrimary'>
            <Suspense fallback={<ParliamentSkeletonCard />}>
              {(ticketSummary?.ok &&
                ticketSummary.data.data.aid?.total_pending_count) ||
                0}
            </Suspense>
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
  );
};

export default ParliamentPendingAidRequestCard;
