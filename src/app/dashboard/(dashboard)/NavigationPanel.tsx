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

  const { userData, accessOk } = useContext(AccessContext);

  return (
    <aside
      data-testid='navigation-panel'
      className={cn(
        'tw-flex tw-flex-col tw-items-center tw-fixed md:tw-static tw-bottom-0 tw-z-50 tw-rounded-[0.75rem_0.75rem_0_0] md:tw-rounded-none tw-py-4 tw-px-6 tw-w-full md:tw-w-52 tw-min-h-40 md:tw-min-h-screen tw-transition-transform md:tw-transition-none tw-duration-300 tw-shadow-lg tw-shadow-foreground md:tw-shadow-none md:tw-border-r md:tw-border-border tw-bg-secondary/5',
        showPanel ? 'max-md:tw-translate-y-0' : 'max-md:tw-translate-y-full'
      )}
    >
      <div>
        <h3 className='tw-self-center tw-hidden md:tw-block tw-font-light'>
          nex<span className='tw-font-normal'>ticket</span>
        </h3>
        <div className='tw-bg-muted tw-h-1 tw-w-32 tw-mb-1 tw-rounded-xl md:tw-hidden' />
        <p className='tw-text-center'>
          {accessOk && userData.organization.name}
        </p>
      </div>
      <nav className='tw-w-full md:tw-mt-4'>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              'tw-py-2 md:tw-py-3 tw-w-full tw-flex tw-flex-row-reverse md:tw-flex-row tw-items-center tw-justify-start tw-gap-3 hover:tw-text-link tw-transition-colors',
              accessOk &&
                !userData.organization_id &&
                'tw-text-gray-500 tw-pointer-events-none',
              pathname === link.href &&
                'tw-font-bold tw-text-link tw-pointer-events-none'
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
