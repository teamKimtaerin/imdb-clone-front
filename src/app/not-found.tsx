'use client';

import { Button } from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-32 sm:pt-32 h-screen">
      <div className="flex flex-col items-center gap-5">
        <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          404 Page Not Found
        </h2>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          해당 페이지를 찾을 수 없습니다.
        </p>
        <Button
          variant="secondary"
          size="md"
          className="hidden md:inline-flex"
          onClick={() => router.back()}
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
