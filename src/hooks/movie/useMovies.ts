'use client';
import { useState, useCallback } from 'react';
import { Movie } from '@/types/movie';
import { MoviesApiResponse } from '@/types/api';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';
const ITEMS_PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE) || 20;

// 영화 데이터 검증 함수
const validateMovieData = (movie: any): movie is Movie => {
  return (
    typeof movie === 'object' &&
    movie !== null &&
    typeof movie._id === 'string' &&
    typeof movie.title === 'string' &&
    Array.isArray(movie.categories) &&
    typeof movie.running_time === 'number' &&
    typeof movie.release_date === 'string' &&
    typeof movie.rating_total === 'number' &&
    typeof movie.review_count === 'number' &&
    typeof movie.audience === 'number' &&
    typeof movie.description === 'string' &&
    typeof movie.director === 'object' &&
    movie.director !== null &&
    typeof movie.director.name === 'string' &&
    typeof movie.age_rating === 'string' &&
    typeof movie.is_adult_content === 'boolean'
  );
};

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 중복 요청 방지를 위한 ref
  const loadingRef = useState({ isLoading: false })[0];

  const loadMovies = useCallback(
    async (pageNum: number = 1, categories: string[] = [], append: boolean = false) => {
      // 이미 로딩 중이면 중복 요청 방지
      if (loadingRef.isLoading) {
        return;
      }

      loadingRef.isLoading = true;
      setLoading(true);
      setError(null); // 새로운 요청 시 에러 초기화

      try {
        let url = `${API_BASE_URL}/movies?page=${pageNum}&limit=${ITEMS_PER_PAGE}`;

        if (categories.length > 0) {
          // 카테고리 필터링: 선택된 카테고리의 영화들을 가져옴
          url += `&categories=${encodeURIComponent(categories.join(','))}`;
        } else {
          // 인기 영화: 평점과 최신순의 가중치로 정렬
          url += `&sort=popular`;
        }

        const response = await axios.get<MoviesApiResponse | Movie[]>(url);

        // API 응답 구조를 안정적으로 처리
        let newMovies: Movie[] = [];

        if (Array.isArray(response.data)) {
          // 직접 배열로 반환되는 경우 (레거시 API)
          newMovies = response.data;
        } else if (
          response.data &&
          typeof response.data === 'object' &&
          'movies' in response.data
        ) {
          // 객체 형태로 반환되는 경우 (새로운 API)
          newMovies = response.data.movies || [];
        } else {
          throw new Error('API 응답 형식이 올바르지 않습니다.');
        }

        // 데이터 검증
        const validMovies = newMovies.filter(validateMovieData);
        if (validMovies.length !== newMovies.length) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `${newMovies.length - validMovies.length}개의 잘못된 영화 데이터가 제외되었습니다.`,
            );
          }
        }

        newMovies = validMovies;

        // 카테고리가 없을 때 인기 순위 추가
        const moviesWithRank =
          categories.length === 0
            ? newMovies.map((movie, index) => ({
                ...movie,
                rank: (pageNum - 1) * ITEMS_PER_PAGE + index + 1,
              }))
            : newMovies;

        if (append) {
          setMovies((prev) => {
            // 기존 영화 ID들을 Set으로 관리하여 중복 확인
            const existingIds = new Set(prev.map((movie) => movie._id));
            const newUniqueMovies = moviesWithRank.filter((movie) => !existingIds.has(movie._id));

            // 중복된 영화가 있으면 로그 출력 (개발 환경에서만)
            if (process.env.NODE_ENV === 'development') {
              const duplicateCount = moviesWithRank.length - newUniqueMovies.length;
              if (duplicateCount > 0) {
                console.warn(`${duplicateCount}개의 중복 영화가 제외되었습니다.`);
              }
            }

            return [...prev, ...newUniqueMovies];
          });
        } else {
          setMovies(moviesWithRank);
          setPage(1);
        }

        // 서버에서 반환된 영화 수가 요청한 개수보다 적으면 더 이상 데이터 없음
        setHasMore(newMovies.length === ITEMS_PER_PAGE);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('영화 로드 실패:', err);
        }

        let errorMessage = '영화를 불러오는 중 오류가 발생했습니다.';

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            errorMessage = '요청한 페이지를 찾을 수 없습니다.';
          } else if (err.response?.status === 500) {
            errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          } else if (err.code === 'NETWORK_ERROR') {
            errorMessage = '네트워크 연결을 확인해주세요.';
          } else if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        loadingRef.isLoading = false;
        setLoading(false);
      }
    },
    [], // dependency 제거 - setState 함수들은 stable하므로
  );

  const loadNextPage = useCallback(
    (categories: string[] = []) => {
      if (!hasMore || loading) return;
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies(nextPage, categories, true);
    },
    [page, hasMore, loading, loadMovies],
  );

  return {
    movies,
    loading,
    hasMore,
    error,
    loadMovies,
    loadNextPage,
    setMovies,
    setPage,
    setHasMore,
  };
}
