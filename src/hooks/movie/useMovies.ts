'use client';
import { useState, useCallback } from 'react';
import { Movie } from '@/types/movie';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';
const ITEMS_PER_PAGE = 20;

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = useCallback(
    async (pageNum: number = 1, categories: string[] = [], append: boolean = false) => {
      if (loading) return;

      setLoading(true);

      try {
        let url = `${API_BASE_URL}/movies?page=${pageNum}&limit=${ITEMS_PER_PAGE}`;

        if (categories.length > 0) {
          // 카테고리 필터링: 선택된 카테고리의 영화들을 가져옴
          url += `&categories=${encodeURIComponent(categories.join(','))}`;
        } else {
          // 인기 영화: 평점과 최신순의 가중치로 정렬
          url += `&sort=popular`;
        }

        console.log('API 호출 URL:', url);
        const response = await axios.get(url);

        // API 응답 구조 확인
        const newMovies: Movie[] = response.data.movies || response.data;

        // 카테고리가 없을 때 인기 순위 추가
        const moviesWithRank =
          categories.length === 0
            ? newMovies.map((movie, index) => ({
                ...movie,
                rank: (pageNum - 1) * ITEMS_PER_PAGE + index + 1,
              }))
            : newMovies;

        if (append) {
          setMovies((prev) => [...prev, ...moviesWithRank]);
        } else {
          setMovies(moviesWithRank);
          setPage(1);
        }

        setHasMore(newMovies.length >= ITEMS_PER_PAGE);
      } catch (error) {
        console.error('영화 로드 실패:', error);
        if (axios.isAxiosError(error)) {
          console.error('에러 상세:', error.response?.data || error.message);
        } else {
          console.error('에러 상세:', String(error));
        }
      } finally {
        setLoading(false);
      }
    },
    [loading],
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
    loadMovies,
    loadNextPage,
    setMovies,
    setPage,
    setHasMore,
  };
}
