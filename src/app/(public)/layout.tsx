'use client';

import { SessionProvider } from 'next-auth/react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div
        style={{
          minHeight: '100vh',
          background: '#141517',
          color: '#fff',
        }}
      >
        {children}
      </div>
    </SessionProvider>
  );
}
