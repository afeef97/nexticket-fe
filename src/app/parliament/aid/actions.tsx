'use server';

import { FetchReturn, GetQuery, PaginatedParliamentTickets } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getAidTickets = async ({
  page,
  perPage,
  filter,
  search = '',
}: {
  page: number;
  perPage: number;
  filter: string;
  search: string;
}): Promise<FetchReturn<GetQuery<PaginatedParliamentTickets>>> => {
  return await fetchNexticket(
    `/parliament-ticket?type=AID&page=${page}&per-page=${perPage}${filter}${search}`,
    {}
  );
};
