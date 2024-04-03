'use client';

import { FetchReturn, GetQuery, ParliamentTickets } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import ParliamentEmptyState from './ParliamentEmptyState';
import { TICKET_STATUS_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { updateParliamentTicketStatus } from '../actions';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function ParliamentTicketDetails({
  ticketData,
}: {
  ticketData: FetchReturn<GetQuery<ParliamentTickets>>;
  type: string;
}) {
  const [status, setStatus] = useState<string>(
    ticketData.ok ? ticketData.data.data.ticket_status : 'PENDING'
  );

  const ticketId = ticketData.ok ? ticketData.data.data.id : 0;
  const { mutate: updateStatus } = useMutation({
    mutationFn: () => updateParliamentTicketStatus(status, ticketId.toString()),
  });

  return (
    <div>
      {ticketData.ok ? (
        <>
          <div>Status</div>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              updateStatus();
            }}
          >
            <SelectTrigger
              className={cn(
                'bg-gray-200',
                status === 'PENDING' && 'bg-yellow-300',
                status === 'REJECTED' && 'bg-red-300',
                status === 'COMPLETED' && 'bg-green-300'
              )}
            >
              {status[0] + status.slice(1).split('_').join(' ').toLowerCase()}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TICKET_STATUS_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='mt-8 flex flex-col gap-8 pr-4'>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Ticket ID</div>
              <div className='col-span-3'>{ticketData.data.data?.id}</div>
            </div>
            <div className='grid grid-cols-5 gap-1'>
              <div className='col-span-2'>Created on</div>
              <div className='col-span-3'>
                {new Date(ticketData.data.data?.created_at).toLocaleString(
                  'en-MY'
                )}
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
