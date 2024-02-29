'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import dynamic from 'next/dynamic';

const InviteMembersForm = dynamic(() => import('./InviteMembersForm'), {
  ssr: false,
});

const InviteMembers = () => {
  const { userData } = useContext<IAccessContext>(AccessContext);
  const [open, setOpen] = React.useState<boolean>();

  useEffect(() => {
    setOpen(false);
  }, []);

  if (userData.role === 'USER') {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus size={20} aria-label='Invite members' className='mr-2' />
          Invite members
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h5>Invite members</h5>
        </DialogHeader>
        <InviteMembersForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
