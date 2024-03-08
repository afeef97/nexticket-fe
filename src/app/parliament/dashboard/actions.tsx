'use server';

import { FetchReturn, GetQuery, ParliamentTicketSummary } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getTicketsSummary = async (
  filterTime: string
): Promise<FetchReturn<GetQuery<ParliamentTicketSummary>>> => {
  return await fetchNexticket(`/parliament-ticket/summary${filterTime}`, {});
};
