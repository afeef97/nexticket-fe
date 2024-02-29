import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className='min-h-[calc(100vh-15rem)] md:min-h-[calc(100vh-12rem)] flex items-center'>
        <div className='container py-8 h-full'>
          <div className='border-2 border-border rounded-xl mx-auto p-4 md:p-6 max-w-screen-sm bg-secondary/5'>
            <Link
              href={'/'}
              className='hover:text-link flex items-center mb-2 transition-colors'
            >
              <MoveLeft
                className='mr-2 inline-block'
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
