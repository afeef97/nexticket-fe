import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GoKebabHorizontal } from 'react-icons/go';
import { cn } from '@/lib/utils';

const MemberActionButton = ({ disabled, isVerified }: { disabled: boolean; isVerified: boolean }) => {
  const [, setIsOpenDialog] = useState(false);
  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        className={cn('hover:bg-popover p-2 rounded-full', disabled && 'hover:bg-transparent hover:cursor-not-allowed')}
      >
        <GoKebabHorizontal size={24} className={disabled ? 'text-muted' : 'text-foreground'} />
      </PopoverTrigger>
      <PopoverContent>
        {isVerified && (
          <Button variant={'ghost'} onClick={() => {}} className="w-full justify-start">
            Resend invitation
          </Button>
        )}

        <Button variant={'ghost'} onClick={() => setIsOpenDialog(true)} className="w-full justify-start">
          Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default MemberActionButton;
