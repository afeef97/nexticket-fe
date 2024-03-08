'use server';

import { FetchReturn, GetQuery, OrganizationMember } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const getParliamentMembers = async (): Promise<
  FetchReturn<GetQuery<OrganizationMember[]>>
> => {
  const verifiedMembersRes: FetchReturn<GetQuery<OrganizationMember[]>> =
    await fetchNexticket(
      '/organization/members?is-verified=true&fields=email&order-email=asc',
      {}
    );
  const pendingMembersRes: FetchReturn<GetQuery<OrganizationMember[]>> =
    await fetchNexticket(
      '/organization/members?is-verified=false&fields=email&order-email=asc',
      {}
    );

  const verifiedMembers = verifiedMembersRes.ok
    ? verifiedMembersRes.data.data
    : [];
  const pendingMembers = pendingMembersRes.ok
    ? pendingMembersRes.data.data
    : [];

  const combinedMembers: OrganizationMember[] = [];
  combinedMembers.push(...verifiedMembers, ...pendingMembers);

  return combinedMembers.length > 0
    ? {
        ok: true,
        data: { data: combinedMembers, message: 'Members fetched' },
      }
    : {
        ok: false,
        data: { message: 'Error fetching members', statusCode: 500 },
      };
};
