import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn } from '@/lib/customFetch';
import React from 'react';

const TicketTypes = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn;
}) => {
  const categoriesMap: Map<string, number> = getTicketsResponse.data.categories;

  return (
    <Card className='tw-grow'>
      <CardHeader>
        <CardTitle typeof='h5'>Ticket types</CardTitle>
      </CardHeader>

      <CardContent className='tw-max-h-32 tw-overflow-scroll'>
        {getTicketsResponse.ok && categoriesMap.size > 0 ? (
          <ul className='tw-space-y-1'>
            {Array.from(categoriesMap.entries()).map(([key, value]) => (
              <li
                key={key}
                className='tw-pt-1 tw-text-2xl tw-flex tw-justify-between tw-border-t tw-border-t-border'
              >
                {key} <span>{value}</span>
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
