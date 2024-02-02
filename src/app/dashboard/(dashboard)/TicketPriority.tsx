import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn } from '@/lib/customFetch';
import React from 'react';

const TicketPriority = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn;
}) => {
  const priorities: Map<string, number> = getTicketsResponse.data.priorities;

  return (
    <Card className='tw-grow'>
      <CardHeader>
        <CardTitle typeof='h5'>Ticket priority</CardTitle>
      </CardHeader>

      <CardContent className='tw-max-h-36 tw-overflow-scroll'>
        {getTicketsResponse.ok && priorities.size > 0 ? (
          <ul className='tw-space-y-1'>
            {Array.from(priorities.entries()).map(([key, value]) => (
              <li
                key={key}
                className='tw-pt-1 tw-text-2xl tw-flex tw-justify-between tw-border-t tw-border-t-border'
              >
                {key[0].toUpperCase() + key.toLowerCase().slice(1)}{' '}
                <span>{value}</span>
              </li>
            ))}
          </ul>
        ) : (
          'No tickets assigned'
        )}
      </CardContent>
    </Card>
  );
};

export default TicketPriority;
