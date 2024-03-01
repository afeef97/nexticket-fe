import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchReturn } from '@/lib/types';
import React from 'react';

const TicketTypes = ({
  getTicketsResponse,
}: {
  getTicketsResponse: FetchReturn;
}) => {
  const categoriesMap: Map<string, number> = getTicketsResponse.data.categories;

  return (
    <Card className='grow md:max-w-lg'>
      <CardHeader>
        <CardTitle typeof='h5'>Ticket types</CardTitle>
      </CardHeader>

      <CardContent className='max-h-32 overflow-scroll'>
        {getTicketsResponse.ok && categoriesMap.size > 0 ? (
          <ul className='space-y-1'>
            {Array.from(categoriesMap.entries()).map(([key, value]) => (
              <li key={key} className='pt-1 flex justify-between'>
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
