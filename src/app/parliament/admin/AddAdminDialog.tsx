import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AddAdminForm from './AddAdminForm';
import { BsPlusLg } from 'react-icons/bs';
import React from 'react';

const AddAdminDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" px-4 w-[150px] h-[48px] bg-primary hover:brightness-105 text-whiteBg text-sub1 rounded-[4.8px] flex items-center justify-center">
        <span>
          <BsPlusLg size={20} className="text-whiteBg" />
        </span>
        Add admin
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add admin</DialogTitle>
        </DialogHeader>

        <AddAdminForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminDialog;
