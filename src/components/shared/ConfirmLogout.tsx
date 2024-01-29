'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import { Button } from '../ui/button';
import React from 'react';
import { logoutUser } from '@/app/(auth)/actions';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { useRouter } from 'next/navigation';

const ConfirmLogout = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { triggerQuery: triggerLogoutUser } = useQueryHandler({
    query: logoutUser,
    queryOnMount: false,
  });

  const handleLogout = async () => {
    const response = await triggerLogoutUser();

    if (response.ok) {
      router.push('/login');
    }
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen((value) => !value)}>
      <DialogContent>
        <DialogHeader className='tw-text-2xl'>Confirm Logout</DialogHeader>
        <DialogDescription>Are you sure you want to logout?</DialogDescription>

        <DialogFooter className='tw-flex tw-gap-1'>
          <Button variant={'destructive'} onClick={handleLogout}>
            Logout
          </Button>
          <Button variant={'outline'} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmLogout;
