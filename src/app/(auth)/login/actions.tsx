'use server';

import fetchNexticket from '@/lib/customFetch';

export const loginUser = async (email: string, password: string) => {
  return await fetchNexticket('/auth/login', {
    useToken: false,
    method: 'POST',
    body: { email, password },
    options: {
      cache: 'no-store',
    },
  });
};
