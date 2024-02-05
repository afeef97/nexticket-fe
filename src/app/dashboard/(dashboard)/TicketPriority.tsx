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
    <Card className='tw-grow md:tw-max-w-64'>
      <CardHeader>
        <CardTitle typeof='h5'>Ticket priority</CardTitle>
      </CardHeader>

      <CardContent className='tw-max-h-36 tw-overflow-scroll'>
        {getTicketsResponse.ok && priorities.size > 0 ? (
          <ul className='tw-space-y-1'>
            <li className='tw-pt-1 tw-flex tw-justify-between'>
              Important <span>{priorities.get('IMPORTANT')}</span>
            </li>
            <li className='tw-pt-1 tw-flex tw-justify-between'>
              Medium <span>{priorities.get('MEDIUM')}</span>
            </li>
            <li className='tw-pt-1 tw-flex tw-justify-between'>
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
