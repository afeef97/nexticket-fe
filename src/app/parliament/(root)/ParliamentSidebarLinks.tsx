'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import React, { useContext } from 'react';
import { ILink } from '@/app/dashboard/(dashboard)/Navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks: ILink[] = [
  {
    href: '/parliament/dashboard',
    label: 'Home',
  },
  {
    href: '/parliament/aid',
    label: 'Aid',
  },
  {
    href: '/parliament/complaint',
    label: 'Complaint',
  },
  {
    href: '/parliament/admin',
    label: 'Admin',
  },
];

const ParliamentSidebarLinks = () => {
  const { userData } = useContext<IAccessContext>(AccessContext);
  const pathname: string = usePathname();
  return (
    <nav className='flex flex-col gap-3'>
      {navLinks.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            'text-body1 hover:bg-card hover:text-link px-4 py-3 transition-colors rounded',
            {
              'bg-card/40 text-link': pathname === link.href,
            },
            {
              'text-muted pointer-events-none': !userData?.organization_id,
            }
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default ParliamentSidebarLinks;
