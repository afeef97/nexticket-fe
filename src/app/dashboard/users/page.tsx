import { getPendingMembers, getVerifiedMembers } from './actions';
import { FetchReturn } from '@/lib/customFetch';
import InviteMembers from './InviteMembers';
import MembersTabs from './MembersTabs';
import { Metadata } from 'next';
import PageTitle from '@/components/shared/PageTitle';

export const metadata: Metadata = {
  title: 'nexticket | Users',
};

const Users = async () => {
  const pendingMembersResponse: FetchReturn = await getPendingMembers();
  const verifiedMembersResponse: FetchReturn = await getVerifiedMembers();

  return (
    <>
      <PageTitle title='Users' />

      <InviteMembers />

      <div className='tw-mt-4'>
        <MembersTabs
          pendingMembersResponse={pendingMembersResponse}
          verifiedMembersResponse={verifiedMembersResponse}
        />
      </div>
    </>
  );
};

export default Users;
