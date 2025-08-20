'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { NavigationBar } from '@/components/common/NavigationBar';
import { MovieCard } from '@/components/movie/MovieCard';
import { SimpleFooter } from '@/components/common/Footer/Footer';
import { useSearchStore } from '@/store/searchStore';
import { useMovies } from '@/hooks/movie/useMovies';
import { Movie } from '@/types/movie';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';

  const { performSearch, results, isLoading, error } = useSearchStore();
  const { movies, loading: moviesLoading, loadMoviesByIds } = useMovies();

  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 검색어가 비어있으면 홈으로 리다이렉트
  useEffect(() => {
    if (!searchQuery.trim()) {
      router.push('/');
      return;
    }
  }, [searchQuery, router]);

  // URL의 검색어가 변경될 때마다 검색 수행
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      setIsInitialLoad(false);
    }
  }, [searchQuery, performSearch]);

  // 검색 결과에서 영화 ID들을 추출하여 영화 데이터 로드
  useEffect(() => {
    if (results && results.length > 0) {
      // 모든 검색 결과에서 movie ID들을 수집
      const allMovieIds = results.reduce((acc: string[], item) => {
        return [...acc, ...item.movieIds];
      }, []);

      // 중복 제거
      const uniqueMovieIds = [...new Set(allMovieIds)];

      if (uniqueMovieIds.length > 0) {
        loadMoviesByIds(uniqueMovieIds);
      }
    } else {
      setSearchedMovies([]);
    }
  }, [results, loadMoviesByIds]);

  // 로드된 영화들을 검색된 영화 상태에 설정
  useEffect(() => {
    if (movies && movies.length > 0) {
      setSearchedMovies(movies);
    }
  }, [movies]);

  const handleNewSearch = (query: string) => {
    // NavigationBar에서 새로운 검색이 수행될 때
    if (!query.trim()) {
      // 검색어가 비어있으면 홈으로 이동
      router.push('/');
    }
    // 검색어가 있으면 URL이 이미 변경되므로 추가 처리 불필요
  };

  // 영화 카드 클릭 핸들러
  const handleMovieClick = (movieId: string) => {
    console.log('Movie clicked:', movieId); // 디버깅용
    router.push(`/movie/${movieId}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#000' }}>
        <NavigationBar onSearch={handleNewSearch} />
      </header>

      <main
        style={{
          flex: 1,
          padding: '40px 60px',
          maxWidth: '1840px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '10px' }}>검색 결과</h1>
          {searchQuery && (
            <p style={{ fontSize: '16px', color: '#999' }}>
              &quot;{searchQuery}&quot;에 대한 검색 결과 {searchedMovies.length}개
            </p>
          )}
        </div>

        {/* 로딩 상태 */}
        {(isLoading || moviesLoading) && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>검색 중...</div>
        )}

        {/* 에러 상태 */}
        {error && !isLoading && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#ff6b6b' }}>{error}</div>
        )}

        {/* 검색 결과가 없는 경우 */}
        {!isLoading &&
          !moviesLoading &&
          !error &&
          searchedMovies.length === 0 &&
          !isInitialLoad && (
            <div
              style={{
                textAlign: 'center',
                padding: '100px 20px',
                color: '#666',
                fontSize: '16px',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
              <div style={{ marginBottom: '10px' }}>검색 결과가 없습니다</div>
              <div style={{ fontSize: '14px', color: '#999' }}>다른 키워드로 검색해보세요</div>
            </div>
          )}

        {/* 검색 결과 영화 카드들 */}
        {searchedMovies.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '20px 12px',
              marginBottom: '40px',
              justifyContent: 'center',
            }}
          >
            {searchedMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                _id={movie._id}
                title={movie.title}
                categories={movie.categories}
                running_time={movie.running_time}
                release_date={movie.release_date}
                rating_total={movie.rating_total}
                review_count={movie.review_count}
                audience={movie.audience}
                trailer_url={movie.trailer_url}
                description={movie.description}
                director={movie.director}
                is_adult_content={movie.is_adult_content}
                poster_url={movie.poster_url}
                age_rating={movie.age_rating}
                created_at={movie.created_at}
                __v={movie.__v}
                onClick={() => handleMovieClick(movie._id)}
              />
            ))}
          </div>
        )}
      </main>

      <SimpleFooter />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            background: '#000',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>검색 페이지를 로드하는 중...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
