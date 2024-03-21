'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      <div className="flex flex-col w-96 border-2 border-border rounded-xl mx-auto p-4 md:p-6 max-w-screen-sm bg-secondary/5">
        <h4>Something went wrong</h4>

        <div className="my-2">
          <Button
            variant={'ghost'}
            onClick={() => setSeeMore(!seeMore)}
            className="px-0 hover:bg-transparent hover:text-link"
          >
            <ChevronRight className={cn('transition-transform', seeMore ? 'rotate-90' : 'rotate-0')} />
            More details
          </Button>
          <div className={cn('transition-all overflow-hidden bg-muted rounded p-2', seeMore ? 'block' : 'hidden')}>
            <pre>Digest: {error.digest}</pre>
            <code>
              Logs: <br />
              {error.message}
            </code>
          </div>
        </div>
        <Button onClick={() => reset()} className="self-end">
          Try again
        </Button>
      </div>
    </div>
  );
};

export default Error;
