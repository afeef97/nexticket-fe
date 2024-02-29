'use client';

import { Menu, X } from 'lucide-react';
import AvatarMenu from '@/components/shared/AvatarMenu';
import { Button } from '@/components/ui/button';
import React from 'react';
import { cn } from '@/lib/utils';

const MobileHeader = ({
  showPanel,
  setShowPanel,
}: {
  showPanel: boolean;
  setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header
      data-testid='mobile-header'
      className={cn(
        'sticky top-0 w-full h-16 py-2 px-3 flex justify-between items-center bg-card border-b border-border md:hidden'
      )}
    >
      <h3>nexticket</h3>
      <div className='flex gap-1'>
        <AvatarMenu />
        <Button
          variant='ghost'
          onClick={() => setShowPanel(!showPanel)}
          className='hover:bg-background hover:text-foreground'
        >
          {showPanel ? (
            <X aria-label='Close navigation panel' />
          ) : (
            <Menu aria-label='Open navigation panel' />
          )}
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;
