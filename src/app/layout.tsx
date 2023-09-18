import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'URL shortner',
  description: 'url shortner',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
