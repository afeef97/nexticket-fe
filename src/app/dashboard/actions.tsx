'use server';

import fetchNexticket from '@/lib/customFetch';

export const getUserAccount = async () => {
  return await fetchNexticket('/users/my-account', {
    useToken: true,
    options: {
      credentials: 'include',
      next: {
        tags: ['user-account'],
        revalidate: 300,
      },
    },
  });
};

export const getOrganization = async () => {
  return await fetchNexticket('/organization', {
    options: {
      credentials: 'include',
      next: {
        tags: ['organization'],
        revalidate: 300,
      },
    },
  });
};