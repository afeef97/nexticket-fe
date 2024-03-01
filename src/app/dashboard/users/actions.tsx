'use server';
import { EmptyResponse, FetchReturn, OrganizationMember } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const inviteMembers = async (memberList: {
  email: string;
  role: string;
}): Promise<FetchReturn<EmptyResponse>> => {
  revalidateTag('pending-members');
  return await fetchNexticket('/organization/invite-member', {
    method: 'POST',
    body: { memberList },
    options: {
      cache: 'no-store',
    },
  });
};

export type GetOrganizationMembers = {
  data: OrganizationMember[];
  message?: string;
};

export const getPendingMembers = async (): Promise<
  FetchReturn<GetOrganizationMembers>
> => {
  return await fetchNexticket(
    '/organization/members?is-verified=false&fields=email&order-email=asc',
    {
      options: {
        next: {
          tags: ['pending-members'],
        },
      },
    }
  );
};

export const getVerifiedMembers = async (): Promise<
  FetchReturn<GetOrganizationMembers>
> => {
  return await fetchNexticket(
    '/organization/members?is-verified=true&fields=email&order-time=asc',
    {
      options: {
        next: {
          tags: ['verified-members'],
        },
      },
    }
  );
};