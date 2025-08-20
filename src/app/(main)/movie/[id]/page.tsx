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

  // 현재 페이지가 '홈' 메뉴에 해당된다고 가정하고 activeMenu prop 전달
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
      <>
        <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
        <div className="flex items-center justify-center h-screen text-gray-700">로딩 중...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
        <div className="flex items-center justify-center h-screen text-red-500">
          영화를 불러오는 중 오류가 발생했습니다.
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
        <div className="flex items-center justify-center h-screen text-gray-700">
          영화를 찾을 수 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar activeMenu="홈" onMenuClick={handleMenuClick} onSearch={handleSearch} />
      <main className="container mx-auto mt-4 p-4">
        <MovieDetail movie={movie} />
      </main>
    </>
  );
};

export default MovieDetailPage;
