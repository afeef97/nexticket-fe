'use server';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<FetchReturn<EmptyResponse>> => {
  return await fetchNexticket('/auth/register', {
    useToken: false,
    method: 'POST',
    body: { username, email, password },
  });
};
