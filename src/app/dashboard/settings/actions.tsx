'use server';

import fetchNexticket from '@/lib/customFetch';

export const generateApiKey = () => {
  return fetchNexticket('/organization/generate-key', {
    method: 'PUT',
    options: {
      cache: 'no-store',
    },
  });
};
