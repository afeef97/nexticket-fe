'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';
import { refreshToken } from '@/app/(auth)/actions';

export const AccessContext = React.createContext({
  openAccessExpired: false,
  // eslint-disable-next-line
  setOpenAccessExpired: (value: React.SetStateAction<boolean>): void => {},
});

const AccessExpired = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  const [openAccessExpired, setOpenAccessExpired] =
    React.useState<boolean>(false);
  const handleRefreshToken = async () => {
    await refreshToken();
    setOpenAccessExpired(false);
  };

  // Dialog can only appear after the component is mounted to prevent hydration error.
  React.useEffect(() => {
    setOpenAccessExpired(open);
  }, [open]);

  return (
    <Dialog open={openAccessExpired}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Access Expired</DialogTitle>
          <DialogDescription>
            Your access has expired, please refresh your token
          </DialogDescription>
        </DialogHeader>

        <Button onClick={handleRefreshToken}>Refresh</Button>
      </DialogContent>

      <AccessContext.Provider
        value={{ openAccessExpired, setOpenAccessExpired }}
      >
        {children}
      </AccessContext.Provider>
    </Dialog>
  );
};

export default AccessExpired;
