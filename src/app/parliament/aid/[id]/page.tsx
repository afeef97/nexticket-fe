import { getAidTicket, getAidTicketComments } from '../api';
import Link from 'next/link';
import ParliamentEmptyState from '../../(components)/ParliamentEmptyState';
import ParliamentTicketContent from '../../(components)/ParliamentTicketContent';
import ParliamentTicketDetails from '../../(components)/ParliamentTicketDetails';
import ParliamentTicketTabs from '../../(components)/ParliamentTicketTabs';
import { ParliamentTickets } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default async function AidPage({ params }: { params: { id: string } }) {
  const aidData = await getAidTicket({ ticketId: params.id });
  const commentData = await getAidTicketComments({ ticketId: params.id });
  // const historyData = await getComplaintTicketHistory({ ticketId: params.id });

  return (
    <div>
      <h4>Aid</h4>
      <div className='flex flex-col items-center justify-between mt-9'>
        <div className='w-full'>
          <div className='grid grid-cols-4 gap-4'>
            <div className='col-span-3'>
              <div>
                <Link
                  href={'/parliament/complaint'}
                  className='text-link underline cursor-pointer'
                >
                  Aid
                </Link>
                <span>{` > `}</span>
                <span>{`Ticket ID ${params.id}`}</span>
              </div>
              <h5 className='mt-[35px]'>
                {(aidData.data.data as ParliamentTickets)?.title ||
                  'Title Not Found'}
              </h5>
              <div className='mt-4'>
                {aidData.ok && <ParliamentTicketContent ticketData={aidData} />}
                {!aidData.ok && <ParliamentEmptyState />}
              </div>
              <div className='my-6'>
                {/* <FileListTile files={aidData?.data.media_url} /> */}
              </div>
              <ParliamentTicketTabs
                commentData={commentData}
                ticketId={(aidData.data.data as ParliamentTickets)?.id || 0}
              />
            </div>
            <div className='col-span-1 border-l border-lineSecondary h-full pl-4'>
              <Suspense fallback={<Skeleton className='h-full w-full' />}>
                <ParliamentTicketDetails ticketData={aidData} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
