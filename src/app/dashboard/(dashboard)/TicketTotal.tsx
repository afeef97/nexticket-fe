import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn } from '@/lib/customFetch';
import React from 'react';

const TicketTotal = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn;
}) => {
  return (
    <Card className='tw-shrink md:tw-max-w-lg tw-flex tw-justify-between tw-items-center'>
      <CardHeader>
        <CardTitle typeof='h5'>Total tickets</CardTitle>
      </CardHeader>

      <CardContent className='tw-py-0'>
        <p className='tw-text-2xl'>
          {getTicketsResponse.ok && getTicketsResponse.data.totalTickets}
        </p>
      </CardContent>
    </Card>
  );
};

export default TicketTotal;
