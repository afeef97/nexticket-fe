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
    <Card className='grow md:max-w-64'>
      <CardHeader>
        <CardTitle typeof='h5'>Ticket priority</CardTitle>
      </CardHeader>

      <CardContent className='max-h-36 overflow-scroll'>
        {getTicketsResponse.ok && priorities.size > 0 ? (
          <ul className='space-y-1'>
            <li className='pt-1 flex justify-between'>
              Important <span>{priorities.get('IMPORTANT')}</span>
            </li>
            <li className='pt-1 flex justify-between'>
              Medium <span>{priorities.get('MEDIUM')}</span>
            </li>
            <li className='pt-1 flex justify-between'>
              Low <span>{priorities.get('LOW')}</span>
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
