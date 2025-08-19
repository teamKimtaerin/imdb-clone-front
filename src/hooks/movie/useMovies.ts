'use client';
import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';
const ITEMS_PER_PAGE = 20;

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: string;
  genre: string;
  imageUrl: string | null;
  rank?: number;
}

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
          url += `&categories=${categories.join(',')}`;
        } else {
          url += `&sort=popularity`;
        }

        const response = await axios.get(url);

        const newMovies: Movie[] = response.data;

        if (append) {
          setMovies((prev) => [...prev, ...newMovies]);
        } else {
          setMovies(newMovies);
          setPage(1);
        }

        setHasMore(newMovies.length >= ITEMS_PER_PAGE);
      } catch (error) {
        console.error('영화 로드 실패:', error);
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
