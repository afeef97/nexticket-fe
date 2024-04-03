'use server';
import 'server-only';

import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const commentOnParliamentTicket = async (
  comments: string,
  ticketId: string
) => {
  revalidateTag('complaint-comments');
  return await fetchNexticket(`/parliament-ticket/comment/${ticketId}`, {
    method: 'POST',
    body: { comments },
  });
};

export const updateParliamentTicketStatus = async (
  status: string,
  ticketId: string
) => {
  revalidateTag('complaint-tickets');
  console.log(status);
  return await fetchNexticket(`/parliament-ticket/${ticketId}`, {
    method: 'PUT',
    body: { status },
  });
};