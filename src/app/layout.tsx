import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ThemeProviderClient from '@/components/shared/ThemeProviderClient';

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
      <body className={inter.className}>
        <ThemeProviderClient>{children}</ThemeProviderClient>
      </body>
    </html>
  );
}
