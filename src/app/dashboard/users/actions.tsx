'use server';
import fetchNexticket from '@/lib/customFetch';

export const inviteMembers = async (memberList: {
  email: string;
  role: string;
}) => {
  return await fetchNexticket('/organization/invite-member', {
    method: 'POST',
    body: { memberList },
    options: {
      cache: 'no-store',
    },
  });
};
