'use server';

import fetchNexticket from '@/lib/customFetch';
import { handleAsyncQuery } from '@/lib/utils';

export const getUserAccount = async () => {
  return await handleAsyncQuery(() =>
    fetchNexticket('/users/my-account', {
      useToken: true,
      options: {
        credentials: 'include',
        next: {
          tags: ['user-account'],
        },
      },
    })
  );
};
