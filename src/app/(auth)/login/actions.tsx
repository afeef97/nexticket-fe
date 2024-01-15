'use server';

import fetchNexticket from '@/lib/customFetch';
import { handleAsyncQuery } from '@/lib/utils';

export const loginUser = async (email: string, password: string) => {
  return await handleAsyncQuery(() =>
    fetchNexticket('/auth/login', {
      useToken: false,
      method: 'POST',
      body: { email, password },
      options: {
        cache: 'no-store',
      },
    })
  );
};
