'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationBar } from '@/components/common/NavigationBar';
import { CategoryTag } from '@/components/common/CategoryTag';
import { MovieCard } from '@/components/movie/MovieCard';
import { SimpleFooter } from '@/components/common/Footer/Footer';
import { useMovies } from '@/hooks/movie/useMovies';

const categoriesList = [
  '액션',
  '로맨스',
  '코미디',
  'SF',
  '공포',
  '스릴러',
  '판타지',
  '다큐',
  '애니메이션',
  '드라마',
];

export default function WatchaMainPage() {
  const router = useRouter();
  const { movies, loading, hasMore, loadMovies, loadNextPage } = useMovies();

  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  // 초기 로드
  useEffect(() => {
    loadMovies(1, activeCategories);
  }, [loadMovies, activeCategories]);

  // 카테고리 변경
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`useEffect 실행 - 카테고리 변경: [${activeCategories.join(', ')}]`);
    }

    loadMovies(1, activeCategories);
  }, [loadMovies, activeCategories]);

  // 무한 스크롤 Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadNextPage(activeCategories);
        }
      },
      { threshold: 0.1, rootMargin: '100px' },
    );
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [movies, hasMore, loading, activeCategories, loadNextPage]);

  useEffect(() => {
    const currentMovieRef = lastMovieRef.current;
    const currentObserver = observerRef.current;

    if (currentMovieRef && currentObserver) {
      currentObserver.observe(currentMovieRef);
    }
    return () => {
      if (currentMovieRef && currentObserver) {
        currentObserver.unobserve(currentMovieRef);
      }
    };
  }, [movies]);

  // 영화 카드 클릭 핸들러
  const handleMovieClick = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  // 카테고리 클릭
  const handleCategoryClick = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  // 검색 필터
  const filteredMovies = searchQuery
    ? movies.filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : movies;

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
        <NavigationBar onSearch={setSearchQuery} />
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #2a2a2a',
            background: '#0a0a0a',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          {categoriesList.map((category) => (
            <CategoryTag
              key={category}
              label={category}
              isActive={activeCategories.includes(category)}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
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
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>
          {activeCategories.length === 0
            ? '🔥 KTR: 큐레이션'
            : `🎬 ${activeCategories.join(', ')} 영화`}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px 12px',
            marginBottom: '40px',
            justifyContent: 'center',
          }}
        >
          {filteredMovies.map((movie, index) => {
            const isLastItem = index === filteredMovies.length - 1;
            return (
              <MovieCard
                key={movie._id}
                ref={isLastItem ? lastMovieRef : null}
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
                director={typeof movie.director === 'object' ? movie.director.name : movie.director}
                is_adult_content={movie.is_adult_content}
                poster_url={movie.poster_url}
                age_rating={movie.age_rating}
                created_at={movie.created_at}
                __v={movie.__v}
                rank={movie.rank && activeCategories.length === 0 ? movie.rank : undefined}
                onClick={() => handleMovieClick(movie._id)}
              />
            );
          })}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
            영화를 불러오는 중...
          </div>
        )}
        {!hasMore && filteredMovies.length > 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            모든 영화를 불러왔습니다
          </div>
        )}
        {filteredMovies.length === 0 && !loading && (
          <div
            style={{ textAlign: 'center', padding: '100px 20px', color: '#666', fontSize: '16px' }}
          >
            표시할 영화가 없습니다
          </div>
        )}
      </main>

      <SimpleFooter />
    </div>
  );
}
