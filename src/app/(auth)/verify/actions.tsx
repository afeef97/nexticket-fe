'use server';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const verifyUser = async (
  email: string | null,
  token: string
): Promise<FetchReturn<EmptyResponse>> => {
  revalidateTag('user-account');
  return await fetchNexticket('/auth/verify', {
    useToken: false,
    method: 'POST',
    body: { email, token },
  });
};
