'use server';

import { FetchReturn, GetQuery, PaginatedParliamentTickets } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getAidTickets = async ({
  page = 1,
  perPage = 10,
  status = '',
  period_end = '',
  search = '',
}: {
  page?: number;
  perPage?: number;
  status?: string;
  period_end?: string;
  search?: string;
}): Promise<FetchReturn<GetQuery<PaginatedParliamentTickets>>> => {
  return await fetchNexticket(`/parliament-ticket`, {
    queries: {
      type: 'AID',
      page,
      'per-page': perPage,
      status,
      period_end,
      search,
    },
  });
};

export const getAidTicket = async ({
  ticketId,
}: {
  ticketId: string;
}): Promise<FetchReturn<GetQuery<any>>> => {
  return await fetchNexticket(`/parliament-ticket/${ticketId}`, {});
};

export const getAidTicketComments = async ({
  ticketId,
}: {
  ticketId: string;
}): Promise<FetchReturn<GetQuery<any>>> => {
  return await fetchNexticket(`/parliament-ticket/comment/${ticketId}`, {
    options: { next: { tags: ['aid-comments'] } },
  });
};