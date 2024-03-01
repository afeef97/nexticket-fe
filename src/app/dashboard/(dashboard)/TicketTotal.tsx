import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn } from '@/lib/types';
import React from 'react';

const TicketTotal = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn;
}) => {
  return (
    <Card className='shrink md:max-w-lg flex justify-between items-center'>
      <CardHeader>
        <CardTitle typeof='h5'>Total tickets</CardTitle>
      </CardHeader>

      <CardContent className='py-0'>
        <p className='text-2xl'>
          {getTicketsResponse.ok && getTicketsResponse.data.totalTickets}
        </p>
      </CardContent>
    </Card>
  );
};

export default TicketTotal;
