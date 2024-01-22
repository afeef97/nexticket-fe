'use client';

import { Menu, X } from 'lucide-react';
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
        'tw-sticky tw-top-0 tw-w-full tw-h-16 tw-py-2 tw-px-3 tw-flex tw-justify-between tw-items-center tw-bg-white tw-border-b tw-border-neutral-400 md:tw-hidden'
      )}
    >
      <h3>nexticket</h3>
      <Button
        variant='ghost'
        onClick={() => setShowPanel(!showPanel)}
        className='hover:tw-bg-transparent'
      >
        {showPanel ? <X /> : <Menu />}
      </Button>
    </div>
  );
};

export default MobileHeader;
