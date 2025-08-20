'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { User } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  const checkAuth = useCallback(async () => {
    try {
      // NextAuth 세션이 있는 경우
      if (session?.user) {
        setUser({
          _id: session.user?.email ?? '',
          email: session.user.email ?? '',
          username: session.user.name ?? '',
          isEmailVerified: true,
        } as User);
        setLoading(false);
        return;
      }

      // 기존 JWT 기반 인증 확인
      const response = await fetch('/api/auth/profile');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.user) {
          setUser(data.data.user);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || '로그인에 실패했습니다');
    }

    if (data.data?.user) {
      setUser(data.data.user);
      router.push('/');
    }
  };

  const logout = async () => {
    try {
      // NextAuth 세션이 있는 경우
      if (session) {
        await signOut({ redirect: false });
      } else {
        // 기존 JWT 기반 로그아웃
        await fetch('/api/auth/logout', { method: 'POST' });
      }
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      checkAuth();
    }
  }, [session, status, checkAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
