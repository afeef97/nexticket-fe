'use server';

import { FetchReturn, GetQuery, PaginatedParliamentTickets } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getComplaintTickets = async ({
  page,
  perPage,
  status = '',
  period_end = '',
  search = '',
}: {
  page: number;
  perPage: number;
  status?: string;
  period_end?: string;
  search?: string;
}): Promise<FetchReturn<GetQuery<PaginatedParliamentTickets>>> => {
  return await fetchNexticket(`/parliament-ticket`, {
    queries: {
      type: 'COMPLAINT',
      page,
      'per-page': perPage,
      status,
      period_end,
      search,
    },
  });
};

export const getComplaintTicket = async ({
  ticketId,
}: {
  ticketId: string;
}): Promise<FetchReturn<GetQuery<any>>> => {
  const ticketResponse = await fetchNexticket(
    `/parliament-ticket/${ticketId}`,
    {}
  );
  const commentsResponse = await fetchNexticket(
    `/parliament-ticket/comment/${ticketId}`,
    {}
  );

  const response = {
    ticket: ticketResponse.data,
    comments: commentsResponse.data,
  };
  const errorMessage = `Error fetching: ${ticketResponse.ok && 'ticket'} ${
    commentsResponse.ok && 'comments'
  }`;

  return ticketResponse.ok && commentsResponse.ok
    ? {
        ok: true,
        data: {
          data: response,
          message: 'Ticket and comments fetched successfully',
        },
      }
    : {
        ok: false,
        data: {
          data: response,
          message: errorMessage,
          statusCode: 500,
        },
      };
};
