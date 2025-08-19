import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '@/types';

interface UseMovieReturn {
  movie: Movie | null;
  isLoading: boolean;
  error: string | null;
}

const useMovie = (id: string): UseMovieReturn => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axios
      .get(`http://localhost:4000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch(() => setError('데이터를 가져오는 데 실패했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, isLoading, error };
};

export default useMovie;
