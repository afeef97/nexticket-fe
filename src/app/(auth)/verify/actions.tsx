'use server';

import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const verifyUser = async (email: string | null, token: string) => {
  revalidateTag('user-account');
  return await fetchNexticket('/auth/verify', {
    useToken: false,
    method: 'POST',
    body: { email, token },
  });
};
