'use client';
import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function WatchaMainPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (process.env.NODE_ENV === 'development') {
    console.log('WatchaMainPage component rendered'); // 디버깅용
  }

  const { movies, loading, hasMore, loadMovies, loadNextPage } = useMovies();

  if (process.env.NODE_ENV === 'development') {
    console.log('useMovies returned:', { movies: movies.length, loading, hasMore }); // 디버깅용
  }

  // URL에서 카테고리 파라미터 읽기
  const categoryParam = searchParams.get('category');
  const initialCategories = useMemo(
    () => (categoryParam ? categoryParam.split(',').filter(Boolean) : []),
    [categoryParam],
  );

  const [activeCategories, setActiveCategories] = useState<string[]>(initialCategories);
  const [isInitialized, setIsInitialized] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  // URL 파라미터가 변경될 때 activeCategories 업데이트
  useEffect(() => {
    const newCategories = categoryParam ? categoryParam.split(',').filter(Boolean) : [];
    setActiveCategories(newCategories);
  }, [categoryParam]);

  // 초기 로드 - 컴포넌트 마운트 시 즉시 실행
  useEffect(() => {
    console.log('🚀 Initial load useEffect triggered'); // 디버깅용
    if (!isInitialized) {
      console.log('📞 Calling loadMovies(1, []) for initial load'); // 디버깅용
      loadMovies(1, initialCategories);
      setIsInitialized(true);
    }
  }, [loadMovies, isInitialized, initialCategories]); // initialCategories 추가

  // 카테고리가 변경될 때 영화 다시 로드
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Categories changed, reloading movies with:', activeCategories);
    }
    if (isInitialized) {
      // 초기화 후에만 카테고리 변경에 따른 로드 수행
      loadMovies(1, activeCategories);
    }
  }, [activeCategories, loadMovies, isInitialized]);

  // 무한 스크롤 처리
  useEffect(() => {
    const currentRef = lastMovieRef.current;
    if (!currentRef) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading && isInitialized) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Loading next page via intersection observer');
        }
        loadNextPage(activeCategories);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    observerRef.current.observe(currentRef);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, isInitialized, loadNextPage, activeCategories]);

  // 영화 카드 클릭 핸들러
  const handleMovieClick = (movieId: string) => {
    console.log('Movie clicked:', movieId); // 디버깅용
    router.push(`/movie/${movieId}`);
  };

  // 카테고리 클릭 - URL 업데이트 포함
  const handleCategoryClick = (category: string) => {
    const newCategories = activeCategories.includes(category)
      ? activeCategories.filter((c) => c !== category)
      : [...activeCategories, category];

    // URL 업데이트
    const params = new URLSearchParams();
    if (newCategories.length > 0) {
      params.set('category', newCategories.join(','));
    }

    const newUrl = newCategories.length > 0 ? `/?${params.toString()}` : '/';
    router.push(newUrl);
  };

  // 검색은 NavigationBar에서 처리하므로 더미 함수
  const handleSearch = (_query: string) => {
    // 검색은 NavigationBar에서 URL 변경으로 처리됨
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
        <NavigationBar onSearch={handleSearch} />
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
        {/* 카테고리 필터 */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>카테고리</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {categoriesList.map((category) => (
              <CategoryTag
                key={category}
                label={category}
                isActive={activeCategories.includes(category)}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>

        {/* 영화 제목 */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700' }}>
            {activeCategories.length > 0 ? `${activeCategories.join(', ')} 영화` : '인기 영화'}
          </h1>
        </div>

        {/* 로딩 상태 */}
        {loading && movies.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
            영화를 불러오는 중...
          </div>
        )}

        {/* 영화 카드 그리드 */}
        {movies.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '20px 12px',
              marginBottom: '40px',
              justifyContent: 'center',
            }}
          >
            {movies.map((movie, index) => {
              const isLast = index === movies.length - 1;
              return (
                <div key={movie._id} ref={isLast ? lastMovieRef : null}>
                  <MovieCard
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
                    rank={movie.rank && activeCategories.length === 0 ? movie.rank : undefined}
                    onClick={() => handleMovieClick(movie._id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* 추가 로딩 상태 */}
        {loading && movies.length > 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #333',
                borderTop: '4px solid #ff6b6b',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
              }}
            ></div>
            <style jsx>{`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </div>
        )}

        {/* 더 이상 로드할 영화가 없을 때 */}
        {!hasMore && movies.length > 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            모든 영화를 불러왔습니다.
          </div>
        )}

        {/* 영화가 없을 때 */}
        {!loading && movies.length === 0 && isInitialized && (
          <div style={{ textAlign: 'center', padding: '100px 20px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎬</div>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>영화가 없습니다</div>
            <div style={{ fontSize: '14px' }}>다른 카테고리를 선택해보세요</div>
          </div>
        )}
      </main>

      <SimpleFooter />
    </div>
  );
}

export default function WatchaMainPage() {
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
          <div>페이지를 로드하는 중...</div>
        </div>
      }
    >
      <WatchaMainPageContent />
    </Suspense>
  );
}
