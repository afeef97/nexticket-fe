import { getPendingMembers, getVerifiedMembers } from './actions';
import { FetchReturn } from '@/lib/customFetch';
import InviteMembers from './InviteMembers';
import MembersTabs from './MembersTabs';

const Users = async () => {
  const pendingMembersResponse: FetchReturn = await getPendingMembers();
  const verifiedMembersResponse: FetchReturn = await getVerifiedMembers();

  return (
    <>
      <h1 className='tw-mb-8'>Users</h1>

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
