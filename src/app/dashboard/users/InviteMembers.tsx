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
import React, { useContext, useEffect, useState } from 'react';
import AddAdminForm from '@/app/parliament/admin/AddAdminForm';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const InviteMembersForm = dynamic(() => import('./InviteMembersForm'), {
  ssr: false,
});

const InviteMembers = () => {
  const { userData } = useContext<IAccessContext>(AccessContext);
  const [open, setOpen] = useState<boolean>();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, []);

  if (userData?.role === 'USER') {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <UserPlus
            size={20}
            aria-label='Invite members'
            className='mr-2'
          />
          {pathname.includes('parliament') ? 'Add admin' : 'Invite members'}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h5>
            {pathname.includes('parliament') ? 'Add admin' : 'Invite members'}
          </h5>
        </DialogHeader>
        {pathname.includes('parliament') ? (
          <AddAdminForm setOpen={setOpen} />
        ) : (
          <InviteMembersForm setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
