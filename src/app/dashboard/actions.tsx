'use server';

import {
  FetchReturn,
  GetQuery,
  OrganizationData,
  TicketSummary,
  UserData,
} from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getUserAccount = async (): Promise<
  FetchReturn<GetQuery<UserData>>
> => {
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

export const getOrganization = async (): Promise<
  FetchReturn<GetQuery<OrganizationData>>
> => {
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

export const getTicketSummary = async (): Promise<
  FetchReturn<GetQuery<TicketSummary[]>>
> => {
  return await fetchNexticket('/ticket/summary', {
    options: {},
  });
};