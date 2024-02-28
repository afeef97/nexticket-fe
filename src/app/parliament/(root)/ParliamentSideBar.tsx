import Image from 'next/image';
import ParliamentSidebarLinks from './ParliamentSidebarLinks';
import React from 'react';

const ParliamentSideBar = () => {
  return (
    <aside className='w-[200px] p-4 sticky min-h-screen left-0 top-0 border-r-[1px] border-r-lineSecondary'>
      <div className='w-full h-[50px] relative mb-8 cursor-pointer'>
        <Image
          src='/logo_black.png'
          alt='logo'
          fill
          className='object-contain'
        />
      </div>
      <ParliamentSidebarLinks />
    </aside>
  );
};

export default ParliamentSideBar;
