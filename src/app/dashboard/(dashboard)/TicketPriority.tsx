import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn, GetQuery, TicketSummary } from '@/lib/types';
import React from 'react';

const TicketPriority = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn<GetQuery<TicketSummary[]>>;
}) => {
  const ticketsData = getTicketsResponse.ok ? getTicketsResponse.data.data : [];
  const ticketPriorityCount = {
    important: 0,
    medium: 0,
    low: 0,
  };

  ticketsData.forEach((ticket: TicketSummary) => {
    ticketPriorityCount.important += ticket.priority_important_count;
    ticketPriorityCount.medium += ticket.priority_medium_count;
    ticketPriorityCount.low += ticket.priority_low_count;
  });

  return (
    <Card className='grow md:max-w-64'>
      <CardHeader>
        <CardTitle typeof='h5'>Ticket priority</CardTitle>
      </CardHeader>

      <CardContent className='max-h-36 overflow-scroll'>
        {getTicketsResponse.ok && ticketsData.length > 0 ? (
          <ul className='space-y-1'>
            <li className='pt-1 flex justify-between'>
              Important <span>{ticketPriorityCount.important}</span>
            </li>
            <li className='pt-1 flex justify-between'>
              Medium <span>{ticketPriorityCount.medium}</span>
            </li>
            <li className='pt-1 flex justify-between'>
              Low <span>{ticketPriorityCount.low}</span>
            </li>
          </ul>
        ) : (
          'No tickets assigned'
        )}
      </CardContent>
    </Card>
  );
};

export default TicketPriority;
