'use client';

import { ILink } from './Navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import useWindowInnerWidth from '@/lib/hooks/useWindowInnerWidth';

const NavigationPanel = ({
  showPanel,
  links = [],
}: {
  showPanel: boolean;
  links: ILink[];
}) => {
  const pathname = usePathname();
  const windowInnerWidth = useWindowInnerWidth();

  return (
    <>
      <div
        data-testid='navigation-panel'
        className={cn(
          'tw-flex tw-flex-col tw-items-center md:tw-items-start tw-fixed md:tw-static tw-bottom-0 tw-z-50 tw-rounded-[0.75rem_0.75rem_0_0] md:tw-rounded-none tw-py-4 tw-px-6 tw-w-full md:tw-w-52 tw-h-40 md:tw-min-h-screen tw-transition-transform md:tw-transition-none tw-duration-300 tw-shadow-lg tw-shadow-black md:tw-shadow-none md:tw-border-r md:tw-border-black'
        )}
        style={{ transform: showPanel ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {windowInnerWidth > 768 ? (
          <h3 className='tw-self-center'>nexticket</h3>
        ) : (
          <div className='tw-bg-gray-300 tw-h-1 tw-w-32 tw-mb-1 tw-rounded-xl'></div>
        )}
        <nav className='tw-w-full md:tw-mt-4'>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'tw-py-2 md:tw-py-3  tw-w-full tw-flex tw-items-center tw-justify-end md:tw-justify-start tw-gap-3',
                pathname === link.href && 'tw-font-bold tw-pointer-events-none'
              )}
            >
              {windowInnerWidth > 768 ? (
                <>
                  {link.icon}
                  {link.label}
                </>
              ) : (
                <>
                  {link.label}
                  {link.icon}
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default NavigationPanel;
