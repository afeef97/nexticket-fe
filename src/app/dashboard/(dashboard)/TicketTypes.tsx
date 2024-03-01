import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn, GetQuery, TicketSummary } from '@/lib/types';
import React from 'react';

const TicketTypes = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn<GetQuery<TicketSummary[]>>;
}) => {
  return (
    <Card className='grow md:max-w-lg'>
      <CardHeader>
        <CardTitle typeof='h5'>Ticket types</CardTitle>
      </CardHeader>

      <CardContent className='max-h-32 overflow-scroll'>
        {getTicketsResponse.ok && getTicketsResponse.data.data.length > 0 ? (
          <ul className='space-y-1'>
            {getTicketsResponse.data.data.map((ticket: TicketSummary) => (
              <li key={ticket.category} className='pt-1 flex justify-between'>
                {ticket.category} <span>{ticket.total}</span>
              </li>
            ))}
          </ul>
        ) : (
          'No tickets found'
        )}
      </CardContent>
    </Card>
  );
};

export default TicketTypes;
