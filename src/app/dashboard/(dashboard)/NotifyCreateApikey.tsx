'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';

const NotifyCreateApikey = () => {
  const localShowNotify: string | null =
    window.localStorage.getItem('showNotifyApikey');

  const [showNotify, setShowNotify] = useState<boolean>(
    localShowNotify === null ? true : localShowNotify === 'true'
  );

  const handleDontShowAgain = () => {
    setShowNotify(false);
    window.localStorage.setItem('showNotifyApikey', 'false');
  };

  return (
    showNotify && (
      <section className='tw-max-w-3xl tw-relative tw-flex tw-flex-col tw-gap-2 tw-rounded-2xl tw-border tw-border-border tw-p-4 tw-bg-secondary/15 '>
        <Button
          variant={'ghost'}
          onClick={() => setShowNotify(false)}
          className='tw-absolute tw-top-3 tw-right-3 !tw-p-1 tw-h-auto hover:tw-bg-inherit'
        >
          <X aria-label='Close reminder to create API key' />
        </Button>
        <h5>Generate your API key</h5>
        <p>
          If this is your first time using nexticket, you will need to create an
          API key which is required to access the nexticket&apos;s API.
        </p>
        <p>
          You can find the settings under the &quot;Settings&quot; tab after
          clicking on your profile image in the top right corner or you can{' '}
          <Link href='/dashboard/settings' className='tw-text-link'>
            click here
          </Link>
          .
        </p>

        <Button
          onClick={handleDontShowAgain}
          className='tw-mt-4 tw-whitespace-pre-line tw-shrink tw-self-end'
        >
          I understand, don&apos;t show again
        </Button>
      </section>
    )
  );
};

export default NotifyCreateApikey;
