import CheckUser from './(dashboard)/CheckUser';
import { Metadata } from 'next';
import Navigation from './(dashboard)/Navigation';
import Providers from '@/components/shared/Providers';
import React from 'react';

export const metadata: Metadata = {
  title: 'nexticket | Dashboard',
};

const AppLayout = async ({ children }: { children: React.ReactElement }) => {
  return (
    <Providers>
      <main className='md:tw-grid tw-grid-cols-[auto_1fr]'>
        <Navigation />
        <div className='tw-min-h-[calc(100vh-4rem)] tw-py-2 md:tw-py-4 tw-px-3 md:tw-px-6'>
          <CheckUser>{children}</CheckUser>
        </div>
      </main>
    </Providers>
  );
};

export default AppLayout;
