import Footer from '@/components/shared/Footer';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className='tw-min-h-[calc(100vh-15rem)] md:tw-min-h-[calc(100vh-12rem)]'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
