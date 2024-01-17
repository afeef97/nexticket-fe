'use server';

import fetchNexticket from '@/lib/customFetch';

export const verifyUser = async (email: string | null, token: string) => {
  return await fetchNexticket('/auth/verify', {
    useToken: false,
    method: 'POST',
    body: { email, token },
  });
};
