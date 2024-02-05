import { FetchReturn } from '@/lib/customFetch';
import InviteMembers from './InviteMembers';
import PendingMemberTable from './PendingMemberTable';
import { getPendingMembers } from './actions';

const Users = async () => {
  const pendingMembersResponse: FetchReturn = await getPendingMembers();

  return (
    <>
      <h1 className='tw-mb-8'>Users</h1>

      <InviteMembers />

      <div className='tw-mt-4'>
        <h4 className='tw-mb-2'>Pending invitations</h4>
        <PendingMemberTable pendingMembersResponse={pendingMembersResponse} />
      </div>
    </>
  );
};

export default Users;
