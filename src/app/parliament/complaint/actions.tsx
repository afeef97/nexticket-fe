'use server';

import { FetchReturn, GetQuery, PaginatedParliamentTickets } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getComplaintTickets = async ({
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
    `/parliament-ticket?type=COMPLAINT&page=${page}&per-page=${perPage}${filter}${search}`,
    {}
  );
};
