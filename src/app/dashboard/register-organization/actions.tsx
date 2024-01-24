'use server';

import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const registerOrganization = async (
  name: string,
  email_domain: string
) => {
  const response = await fetchNexticket('/organization', {
    method: 'POST',
    body: { name, email_domain },
    options: {
      cache: 'no-store',
    },
  });

  if (response.ok) revalidateTag('user-account');
  return response;
};
