'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import useMovie from '@/hooks/useMovie';
import MovieDetail from '@/components/movie/MovieDetail/MovieDetail';
import { NavigationBar } from '@/components/common/NavigationBar/NavigationBar';

const MovieDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const { movie, isLoading, error } = useMovie(id);

  const handleMenuClick = (menu: string) => {
    console.log(`메뉴 클릭: ${menu}`);
    // 실제 페이지 이동 로직은 useRouter 등을 사용
  };

  const handleSearch = (value: string) => {
    console.log(`검색어: ${value}`);
    // 실제 검색 페이지로 이동하는 로직 추가
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
        <div className="flex items-center justify-center h-screen text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <div>로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
        <div className="flex items-center justify-center h-screen text-red-400">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <div className="text-xl">영화를 불러오는 중 오류가 발생했습니다.</div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
        <div className="flex items-center justify-center h-screen text-gray-400">
          <div className="text-center">
            <div className="text-6xl mb-4">🎬</div>
            <div className="text-xl">영화를 찾을 수 없습니다.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
      <MovieDetail movie={movie} />
    </div>
  );
};

export default MovieDetailPage;
