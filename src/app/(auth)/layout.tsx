import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className='tw-min-h-[calc(100vh-15rem)] md:tw-min-h-[calc(100vh-12rem)] tw-flex tw-items-center'>
        <div className='tw-container tw-py-8 tw-h-full'>
          <div className='tw-border-2 tw-border-border tw-rounded-xl tw-mx-auto tw-p-4 md:tw-p-6 tw-max-w-screen-sm tw-bg-secondary/5'>
            <Link
              href={'/'}
              className='hover:tw-text-link tw-flex tw-items-center tw-mb-2 tw-transition-colors'
            >
              <MoveLeft
                className='tw-mr-2 tw-inline-block'
                aria-label='Back to home'
              />{' '}
              Back to Home
            </Link>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
