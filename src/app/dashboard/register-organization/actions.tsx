'use server';

import fetchNexticket from '@/lib/customFetch';

export const registerOrganization = async (
  name: string,
  email_domain: string
) => {
  return await fetchNexticket('/organization', {
    method: 'POST',
    body: { name, email_domain },
    options: {
      cache: 'no-store',
    },
  });
};
