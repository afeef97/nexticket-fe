'use server';

import {
  EmptyResponse,
  FetchReturn,
  GetQuery,
  OrganizationMember,
} from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const inviteMembers = async (
  previousState: unknown,
  formData: FormData
): Promise<FetchReturn<EmptyResponse>> => {
  revalidateTag('pending-members');
  revalidateTag('parliament-members');

  const memberList: Record<string, FormDataEntryValue>[] = [];
  formData.forEach((value) => {
    memberList.push({ email: value, role: 'PARLIAMENT_ADMIN' });
  });

  console.log(memberList);
  return await fetchNexticket('/organization/invite-member', {
    method: 'POST',
    body: { memberList },
    options: {
      cache: 'no-store',
    },
  });
};

export const getPendingMembers = async (): Promise<
  FetchReturn<GetQuery<OrganizationMember[]>>
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
  FetchReturn<GetQuery<OrganizationMember[]>>
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