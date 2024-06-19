'use client';

import { ILink } from '@/app/dashboard/(dashboard)/Navigation';
import Link from 'next/link';
import React from 'react';
import ThemeButton from './ThemeButton';

const linksSupport: ILink[] = [
  {
    label: 'Documentation',
    href: '/docs',
  },
  {
    label: 'Contact us',
    href: '/contact-us',
  },
];

const Footer = () => {
  return (
    <footer className='h-72 md:h-48 border-t border-t-border bg-secondary/5'>
      <div className='container h-full relative flex flex-col md:flex-row justify-between items-start md:items-start gap-6 md:gap-20 py-8'>
        <ThemeButton
          variant='outline'
          className='absolute top-8 right-8 !px-2'
        />
        <div className='flex-shrink'>
          <h2 className='font-normal'>
            nex<span className='font-bold'>ticket</span>
          </h2>
          <p className='text-left md:text-right'>by INVOKE</p>
        </div>

        <nav className='flex flex-col flex-1 gap-0 md:gap-2'>
          <p className='font-bold'>Support</p>
          {linksSupport.map((link) => (
            <Link key={link.label} href={link.href} className='hover:underline'>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='md:self-end'>
          <p className='text-sm'>Copyright © INVOKE 2016 - 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
