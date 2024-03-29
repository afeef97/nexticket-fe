'use client';

import { FetchReturn, GetQuery } from '@/lib/types';
import ParliamentEmptyState from './ParliamentEmptyState';

export default function ParliamentTicketDetails({
  ticketData,
}: {
  ticketData: FetchReturn<GetQuery<any>>;
  type: string;
}) {
  return (
    <div>
      {ticketData.ok ? (
        <>
          <div>Status</div>
          {/* <TicketingSelect
            intialValue={data?.ticket_status}
            ticketId={data?.id}
            type={type}
            refetch={refetch}
            historyRefetch={historyRefetch}
          /> */}
          <div className='mt-8 flex flex-col gap-8 pr-4'>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Ticket ID</div>
              <div className='col-span-3'>{ticketData.data.data?.id}</div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Created on</div>
              <div className='col-span-3'>
                {ticketData.data.data?.created_at}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Requester</div>
              <div className='col-span-3'>
                {ticketData.data.data?.full_name}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Phone no.</div>
              <div className='col-span-3'>
                {ticketData.data.data?.phone_number}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Email</div>
              <div className='col-span-3 break-words'>
                {ticketData.data.data?.email}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Address</div>
              <div className='col-span-3'>
                {ticketData.data.data?.address ?? 'Tidak dinyatakan'}
              </div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Occupation</div>
              <div className='col-span-3'>
                {ticketData.data.data?.occupation ?? 'Tidak dinyatakan'}
              </div>
            </div>
          </div>
        </>
      ) : (
        <ParliamentEmptyState />
      )}
      {/* success snackbar */}
      {/* <Snackbar/> */}
    </div>
  );
}
