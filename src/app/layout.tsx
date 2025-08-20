import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NavigationBar } from '@/components/common/NavigationBar';
import { SimpleFooter } from '@/components/common/Footer/Footer';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IMDB Clone',
  description: 'Movie and actor search application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
