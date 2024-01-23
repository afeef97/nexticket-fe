'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

const ThemeButton = ({
  className,
  variant,
}: {
  className?: string;
  variant?: 'outline' | 'ghost';
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button onClick={toggleTheme} variant={variant} className={className}>
      {theme === 'dark' ? (
        <MoonIcon aria-label='Toggle light mode' />
      ) : (
        <SunIcon aria-label='Toggle dark mode' />
      )}
    </Button>
  );
};

export default ThemeButton;
