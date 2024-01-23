'use client';

import { Home, Ticket, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import MobileHeader from './MobileHeader';
import NavigationPanel from './NavigationPanel';
import useWindowInnerWidth from '@/lib/hooks/useWindowInnerWidth';

export interface ILink {
  label: string;
  href: string;
  icon?: React.ReactElement;
}

const links: ILink[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home size={20} aria-label='Home link icon' />,
  },
  {
    label: 'Tickets',
    href: '/dashboard/tickets',
    icon: <Ticket size={20} aria-label='Ticket link icon' />,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <User size={20} aria-label='User link icon' />,
  },
];

const Navigation = () => {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const innerWidth = useWindowInnerWidth();

  useEffect(() => {
    if (innerWidth > 768) {
      setShowPanel(true);
    } else {
      setShowPanel(false);
    }
  }, [innerWidth]);

  return (
    <>
      <MobileHeader showPanel={showPanel} setShowPanel={setShowPanel} />
      <NavigationPanel showPanel={showPanel} links={links} />
    </>
  );
};

export default Navigation;
