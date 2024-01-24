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
    <footer className='tw-h-72 md:tw-h-48 tw-border-t tw-border-t-border tw-bg-secondary/5'>
      <div className='tw-container tw-h-full tw-relative tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-start tw-gap-6 md:tw-gap-20 tw-py-8'>
        <ThemeButton
          variant='outline'
          className='tw-absolute tw-top-8 tw-right-8 !tw-px-2'
        />
        <div className='tw-flex-shrink'>
          <h2 className='tw-font-normal'>
            nex<span className='tw-font-bold'>ticket</span>
          </h2>
          <p className='tw-text-left md:tw-text-right'>by INVOKE</p>
        </div>

        <nav className='tw-flex tw-flex-col tw-flex-1 tw-gap-0 md:tw-gap-2'>
          <p className='tw-font-bold'>Support</p>
          {linksSupport.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className='hover:tw-underline'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='md:tw-self-end'>
          <p className='tw-text-sm'>Copyright © INVOKE 2016 - 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
