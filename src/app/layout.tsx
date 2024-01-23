import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ThemeButton from '@/components/shared/ThemeButton';
import ThemeProviderClient from '@/components/shared/ThemeProviderClient';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'nexticket',
  description: 'A simple help desk ticketing system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('relative', inter.className)}>
        <ThemeProviderClient>
          <ThemeButton
            variant='outline'
            className='tw-absolute tw-top-4 tw-right-6 !tw-px-2'
          />
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}
