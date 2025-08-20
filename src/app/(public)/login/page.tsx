'use client';

import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/forms/LoginForm'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#141517] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#FF0558] mb-2">ATCHA</h1>
          <p className="text-gray-500 text-sm">로딩 중...</p>
        </div>
      </div>
    </div>
  ),
});

export default function LoginPage() {
  return <LoginForm />;
}
