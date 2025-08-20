'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <div
          style={{
            minHeight: '100vh',
            background: '#000',
            color: '#fff',
          }}
        >
          {children}
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}
