'use client';

import ParliamentEmptyState from './ParliamentEmptyState';
import ParliamentSkeletonCard from './ParliamentSkeletonCard';

export default function ParliamentTicketDetails({
  data,
  isLoading,
  isError,
}: {
  data: any;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  historyRefetch?: () => void;
  type: string;
}) {
  return (
    <div>
      {!isError && (
        <>
          <div className='text-textPrimary text-body1'>Status</div>
          {/* <TicketingSelect
            intialValue={data?.ticket_status}
            ticketId={data?.id}
            type={type}
            refetch={refetch}
            historyRefetch={historyRefetch}
          /> */}
          <div className='mt-8 flex flex-col gap-8'>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2 text-body1 text-textSecondary'>
                Ticket ID
              </div>
              <div className='col-span-3 text-body1 text-textPrimary'>
                {isLoading ? <ParliamentSkeletonCard /> : data?.id}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2 text-body1 text-textSecondary'>
                Created on
              </div>
              <div className='col-span-3 text-body1 text-textPrimary'>
                {isLoading ? <ParliamentSkeletonCard /> : data?.created_at}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2 text-body1 text-textSecondary'>
                Requester
              </div>
              <div className='col-span-3 text-body1 text-textPrimary'>
                {isLoading ? <ParliamentSkeletonCard /> : data?.full_name}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2 text-body1 text-textSecondary'>
                Phone no.
              </div>
              <div className='col-span-3 text-body1 text-textPrimary'>
                {isLoading ? <ParliamentSkeletonCard /> : data?.phone_number}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2 text-body1 text-textSecondary'>
                Email
              </div>
              <div className='col-span-3 text-body1 text-textPrimary'>
                {isLoading ? <ParliamentSkeletonCard /> : data?.email}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2 text-body1 text-textSecondary'>
                Address
              </div>
              <div className='col-span-3 text-body1 text-textPrimary'>
                {isLoading ? (
                  <ParliamentSkeletonCard />
                ) : (
                  data?.address ?? 'Tidak dinyatakan'
                )}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2 text-body1 text-textSecondary'>
                Occupation
              </div>
              <div className='col-span-3 text-body1 text-textPrimary'>
                {isLoading ? (
                  <ParliamentSkeletonCard />
                ) : (
                  data?.occupation ?? 'Tidak dinyatakan'
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {/* success snackbar */}
      {/* <Snackbar/> */}

      {/* empty state */}
      {isError && <ParliamentEmptyState />}
    </div>
  );
}
