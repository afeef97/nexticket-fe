import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn, GetQuery, TicketSummary } from '@/lib/types';
import React from 'react';

const TicketTotal = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn<GetQuery<TicketSummary[]>>;
}) => {
  const total: number = getTicketsResponse.ok
    ? getTicketsResponse.data.data.reduce(
        (acc: number, curr: TicketSummary) => acc + curr.total,
        0
      )
    : 0;

  return (
    <Card className='shrink md:max-w-lg flex justify-between items-center'>
      <CardHeader>
        <CardTitle typeof='h5'>Total tickets</CardTitle>
      </CardHeader>

      <CardContent className='py-0'>
        <p className='text-2xl'>{getTicketsResponse.ok && total}</p>
      </CardContent>
    </Card>
  );
};

export default TicketTotal;
