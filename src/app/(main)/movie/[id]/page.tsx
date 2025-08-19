import React from 'react';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import MovieDetail from '@/components/movie/MovieDetail/MovieDetail';

const MovieDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { movie, isLoading, error } = useMovie(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>영화를 불러오는 중 오류가 발생했습니다.</div>;
  if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

  return <MovieDetail movie={movie} />;
};

export default MovieDetailPage;
