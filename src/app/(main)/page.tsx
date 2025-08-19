'use client';
import React, { useEffect, useRef } from 'react';
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
  const { movies, loading, hasMore, loadMovies, loadNextPage } = useMovies();

  const [activeCategories, setActiveCategories] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  // 초기 로드
  useEffect(() => {
    loadMovies(1, activeCategories);
  }, []);

  // 카테고리 변경
  useEffect(() => {
    loadMovies(1, activeCategories);
  }, [activeCategories]);

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
    if (lastMovieRef.current && observerRef.current) {
      observerRef.current.observe(lastMovieRef.current);
    }
    return () => {
      if (lastMovieRef.current && observerRef.current) {
        observerRef.current.unobserve(lastMovieRef.current);
      }
    };
  }, [movies]);

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
            ? '🔥 인기 영화 TOP 20'
            : `🎬 ${activeCategories.join(', ')} 영화`}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '20px 12px',
            marginBottom: '40px',
          }}
        >
          {filteredMovies.map((movie, index) => {
            const isLastItem = index === filteredMovies.length - 1;
            return (
              <div
                key={movie.id}
                ref={isLastItem ? lastMovieRef : null}
                style={{
                  position: 'relative',
                  paddingBottom: '145%',
                  background: '#1c1c1c',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {movie.rank && activeCategories.length === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    #{movie.rank}
                  </div>
                )}
                {movie.imageUrl ? (
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#666',
                      textAlign: 'center',
                      padding: '20px',
                    }}
                  >
                    {movie.title}
                  </div>
                )}
              </div>
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
