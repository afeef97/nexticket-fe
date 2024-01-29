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
    <div
      data-testid='mobile-header'
      className={cn(
        'tw-sticky tw-top-0 tw-w-full tw-h-16 tw-py-2 tw-px-3 tw-flex tw-justify-between tw-items-center tw-bg-secondary/5 tw-border-b tw-border-border md:tw-hidden'
      )}
    >
      <h3>nexticket</h3>
      <div className='tw-flex tw-gap-1'>
        <AvatarMenu />
        <Button
          variant='ghost'
          onClick={() => setShowPanel(!showPanel)}
          className='hover:tw-bg-background hover:tw-text-foreground'
        >
          {showPanel ? (
            <X aria-label='Close navigation panel' />
          ) : (
            <Menu aria-label='Open navigation panel' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
