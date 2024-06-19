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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const ConfirmLogout = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { mutateAsync: triggerLogoutUser, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push('/login');
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => setOpen((value) => !value)}
    >
      <DialogContent>
        <DialogHeader className='text-2xl'>Confirm Logout</DialogHeader>
        <DialogDescription>Are you sure you want to logout?</DialogDescription>

        <DialogFooter className='flex gap-1'>
          <Button
            disabled={isPending}
            variant={'destructive'}
            onClick={() => triggerLogoutUser()}
          >
            Logout
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmLogout;
