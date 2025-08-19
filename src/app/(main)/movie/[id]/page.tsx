'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import useMovie from '@/hooks/useMovie';
import MovieDetail from '@/components/movie/MovieDetail/MovieDetail';

const MovieDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const { movie, isLoading, error } = useMovie(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>영화를 불러오는 중 오류가 발생했습니다.</div>;
  if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

  return <MovieDetail movie={movie} />;
};

export default MovieDetailPage;
