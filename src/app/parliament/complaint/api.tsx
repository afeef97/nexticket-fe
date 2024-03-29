'use server';
import 'server-only';

import {
  FetchReturn,
  GetQuery,
  PaginatedParliamentTickets,
  ParliamentTickets,
} from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getComplaintTickets = async ({
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
}): Promise<FetchReturn<GetQuery<ParliamentTickets>>> => {
  return await fetchNexticket(`/parliament-ticket/${ticketId}`, {});
};

export const getComplaintTicketComment = async ({
  ticketId,
}: {
  ticketId: string;
}): Promise<FetchReturn<GetQuery<any>>> => {
  return await fetchNexticket(`/parliament-ticket/comment/${ticketId}`, {
    options: { next: { tags: ['complaint-comments'] } },
  });
};