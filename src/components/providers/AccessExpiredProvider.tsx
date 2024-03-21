'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React, { createContext } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { refreshToken } from '@/app/(auth)/actions';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export interface IAccessExpired {
  openAccessExpired: boolean;
  setOpenAccessExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccessExpired = createContext<IAccessExpired>(
  {} as IAccessExpired
);

const AccessExpiredProvider = ({
  open,
  children,
}: {
  open?: boolean | undefined;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [openAccessExpired, setOpenAccessExpired] =
    React.useState<boolean>(false);
  const [refreshTokenError, setRefreshTokenError] = React.useState<string>('');
  const handleRefreshToken = async () => {
    const response = await refreshToken();
    setOpenAccessExpired(!response.ok);
    if (!response.ok) {
      setRefreshTokenError(response.data.message);
    }
    queryClient.invalidateQueries({ queryKey: ['token'] });
  };

  // Dialog can only appear after the component is mounted to prevent hydration error.
  React.useEffect(() => {
    if (open === undefined) return;
    setOpenAccessExpired(open);
  }, [open]);

  return (
    <Dialog open={openAccessExpired}>
      <DialogContent
        disableClose
        className='!z-index-99'
      >
        <DialogHeader>
          <DialogTitle>Access Expired</DialogTitle>
          <DialogDescription>
            {refreshTokenError
              ? 'Failed to refresh token, please try to login again'
              : 'Your access has expired, please refresh your token'}
          </DialogDescription>
        </DialogHeader>
        {refreshTokenError && (
          <p className='text-red-500'>{refreshTokenError}</p>
        )}

        {refreshTokenError ? (
          <Button
            asChild
            onClick={() =>
              pathname === '/login' ? setOpenAccessExpired(false) : null
            }
          >
            <Link
              replace
              href={'/login'}
            >
              Login
            </Link>
          </Button>
        ) : (
          <Button onClick={handleRefreshToken}>Refresh</Button>
        )}
      </DialogContent>

      <AccessExpired.Provider
        value={{ openAccessExpired, setOpenAccessExpired }}
      >
        {children}
      </AccessExpired.Provider>
    </Dialog>
  );
};

export default AccessExpiredProvider;
