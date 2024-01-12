'use server';

import fetchNexticket from '@/lib/customFetch';
import { handleAsyncQuery } from '@/lib/utils';

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  return await handleAsyncQuery(() =>
    fetchNexticket('/auth/register', {
      useToken: false,
      method: 'POST',
      body: { username, email, password },
    })
  );
};
