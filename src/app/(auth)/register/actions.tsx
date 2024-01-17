'use server';

import fetchNexticket from '@/lib/customFetch';

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  return await fetchNexticket('/auth/register', {
    useToken: false,
    method: 'POST',
    body: { username, email, password },
  });
};
