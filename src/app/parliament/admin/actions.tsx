'use server';

import { FetchReturn, GetQuery, PaginatedParliamentMember } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getParliamentMembers = async (
  search: string = '',
  page: number = 1,
  perPage: number = 10
): Promise<FetchReturn<GetQuery<PaginatedParliamentMember>>> => {
  return await fetchNexticket(`/organization/all-members?page=${page}&per-page=${perPage}${search}`, {
    options: { next: { tags: ['parliament-members'] } },
  });
};
