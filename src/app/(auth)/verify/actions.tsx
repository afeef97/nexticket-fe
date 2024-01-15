'use server';

import fetchNexticket from '@/lib/customFetch';
import { handleAsyncQuery } from '@/lib/utils';

export const verifyUser = async (email: string | null, token: string) => {
  return await handleAsyncQuery(() =>
    fetchNexticket('/auth/verify', {
      useToken: false,
      method: 'POST',
      body: { email, token },
    })
  );
};
