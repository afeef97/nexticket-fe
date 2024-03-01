'use server';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const loginUser = async (
  email: string,
  password: string
): Promise<FetchReturn<EmptyResponse>> => {
  return await fetchNexticket('/auth/login', {
    useToken: false,
    method: 'POST',
    body: { email, password },
    options: {
      cache: 'no-store',
    },
  });
};
