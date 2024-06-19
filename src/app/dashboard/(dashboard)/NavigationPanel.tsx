'use client';

import { AccessContext } from '@/components/providers/AccessContextProvider';
import { ILink } from './Navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';

const NavigationPanel = ({
  showPanel,
  links = [],
}: {
  showPanel: boolean | undefined;
  links: ILink[];
}) => {
  const pathname = usePathname();

  const { userData } = useContext(AccessContext);

  return (
    <aside
      data-testid='navigation-panel'
      className={cn(
        'flex flex-col items-center fixed md:static bottom-0 z-50 rounded-[0.75rem_0.75rem_0_0] md:rounded-none py-4 px-6 w-full md:w-52 min-h-40 md:min-h-screen transition-transform md:transition-none duration-300 shadow-lg shadow-foreground md:shadow-none md:border-r md:border-border bg-card',
        showPanel ? 'max-md:translate-y-0' : 'max-md:translate-y-full'
      )}
    >
      <div>
        <h3 className='self-center hidden md:block font-light'>
          nex<span className='font-normal'>ticket</span>
        </h3>
        <div className='bg-muted h-1 w-32 mb-1 rounded-xl md:hidden' />
        <p className='text-center'>{userData?.organization?.name}</p>
      </div>
      <nav className='w-full md:mt-4'>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              'py-2 md:py-3 w-full flex flex-row-reverse md:flex-row items-center justify-start gap-3 hover:text-link transition-colors',
              (!userData?.organization_id || !userData?.username) &&
                'text-gray-500 pointer-events-none',
              pathname === link.href &&
                'font-bold text-link pointer-events-none'
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default NavigationPanel;
