import {
  GetOrganizationMembers,
  getPendingMembers,
  getVerifiedMembers,
} from './actions';
import { FetchReturn } from '@/lib/types';
import InviteMembers from './InviteMembers';
import MembersTabs from './MembersTabs';
import { Metadata } from 'next';
import PageTitle from '@/components/shared/PageTitle';

export const metadata: Metadata = {
  title: 'nexticket | Users',
};

const Users = async () => {
  const pendingMembersResponse: FetchReturn<GetOrganizationMembers> =
    await getPendingMembers();
  const verifiedMembersResponse: FetchReturn<GetOrganizationMembers> =
    await getVerifiedMembers();

  return (
    <>
      <PageTitle title='Users' />

      <InviteMembers />

      <div className='mt-4'>
        <MembersTabs
          pendingMembersResponse={pendingMembersResponse}
          verifiedMembersResponse={verifiedMembersResponse}
        />
      </div>
    </>
  );
};

export default Users;
