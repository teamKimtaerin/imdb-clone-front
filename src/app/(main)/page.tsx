'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavigationBar } from '@/components/common/NavigationBar';
import { CategoryTag } from '@/components/common/CategoryTag';
import { MovieCard } from '@/components/movie/MovieCard';
import { SimpleFooter } from '@/components/common/Footer/Footer';

// 타입 정의
interface Movie {
  id: number;
  title: string;
  year: number;
  rating: string;
  genre: string;
  imageUrl: string | null;
  rank?: number;
}

export default function WatchaMainPage() {
  // 상태 관리
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 무한 스크롤을 위한 ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  // 카테고리 데이터
  const categories = [
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

  // 페이지당 아이템 수
  const ITEMS_PER_PAGE = 20;

  // 가상의 영화 데이터 생성 (실제로는 API 호출)
  const generateMovies = useCallback((pageNum: number, categories: string[]) => {
    const start = (pageNum - 1) * ITEMS_PER_PAGE + 1;

    // 카테고리가 없으면 랭킹 순으로 반환
    if (categories.length === 0) {
      return Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
        id: start + i,
        title: `인기 영화 ${start + i}`,
        year: 2024,
        rating: (4.5 - i * 0.05).toFixed(1),
        genre: '전체',
        imageUrl: null,
        rank: start + i,
      }));
    }

    // 선택된 카테고리에 해당하는 영화 반환
    const moviesPerCategory = Math.ceil(ITEMS_PER_PAGE / categories.length);
    const result: Movie[] = [];

    categories.forEach((category, categoryIndex) => {
      for (let i = 0; i < moviesPerCategory && result.length < ITEMS_PER_PAGE; i++) {
        result.push({
          id: start + result.length,
          title: `${category} 영화 ${start + result.length}`,
          year: 2020 + Math.floor(Math.random() * 5),
          rating: (3 + Math.random() * 2).toFixed(1),
          genre: category,
          imageUrl: null,
        });
      }
    });

    return result;
  }, []);

  // 영화 데이터 로드 함수
  const loadMovies = useCallback(
    async (pageNum: number = 1, categories: string[] = [], append: boolean = false) => {
      if (loading) return;

      setLoading(true);

      try {
        // API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 실제로는 이런 식으로 API 호출
        // const response = await fetch(`/api/movies?page=${pageNum}&categories=${categories.join(',')}`);
        // const data = await response.json();

        const newMovies = generateMovies(pageNum, categories);

        if (append) {
          setMovies((prev) => [...prev, ...newMovies]);
        } else {
          setMovies(newMovies);
          setPage(1);
        }

        // 100개 이상이면 더 이상 로드하지 않음
        if (pageNum * ITEMS_PER_PAGE >= 100) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.error('영화 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading, generateMovies],
  );

  // 초기 데이터 로드 (랭킹 순)
  useEffect(() => {
    loadMovies(1, []);
  }, []);

  // 카테고리 변경 시 데이터 다시 로드
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadMovies(1, activeCategories);
  }, [activeCategories]);

  // 무한 스크롤 Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadMovies(nextPage, activeCategories, true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      },
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [page, hasMore, loading, activeCategories, loadMovies]);

  // 마지막 아이템에 Observer 연결
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

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setActiveCategories((prev) => {
      if (prev.includes(category)) {
        // 이미 활성화된 카테고리면 제거
        return prev.filter((c) => c !== category);
      } else {
        // 비활성화된 카테고리면 추가
        return [...prev, category];
      }
    });
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#000',
    },
    categorySection: {
      padding: '16px 24px',
      borderBottom: '1px solid #2a2a2a',
      background: '#0a0a0a',
    },
    categoryContainer: {
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '8px',
      // scrollbarWidth와 scrollbarColor는 표준 CSS 속성이 아니므로 주석 처리하거나 as any 사용
      // scrollbarWidth: 'thin',
      // scrollbarColor: '#333 transparent',
    },
    main: {
      flex: 1,
      padding: '40px 60px',
      maxWidth: '1840px',
      margin: '0 auto',
      width: '100%',
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#fff',
    },
    movieGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '20px 12px',
      marginBottom: '40px',
    },
    moviePoster: {
      position: 'relative',
      paddingBottom: '145%',
      background: 'linear-gradient(135deg, #1c1c1c, #2a2a2a)',
      borderRadius: '4px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    posterImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    rankBadge: {
      position: 'absolute',
      top: '8px',
      left: '8px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      backdropFilter: 'blur(4px)',
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '60px',
      color: '#999',
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      border: '3px solid #333',
      borderTop: '3px solid #ff0558',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    noContent: {
      textAlign: 'center',
      padding: '100px 20px',
      color: '#666',
      fontSize: '16px',
    },
  };

  // 필터링된 영화 (검색 쿼리 적용)
  const filteredMovies = searchQuery
    ? movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : movies;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <NavigationBar onSearch={setSearchQuery} />

        {/* Category Tags */}
        <div style={styles.categorySection}>
          <div style={styles.categoryContainer}>
            {categories.map((category) => (
              <CategoryTag
                key={category}
                label={category}
                isActive={activeCategories.includes(category)}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Section Title */}
        <h2 style={styles.sectionTitle}>
          {activeCategories.length === 0
            ? '🔥 인기 영화 TOP 20'
            : `🎬 ${activeCategories.join(', ')} 영화`}
        </h2>

        {/* Movie Grid - 왓챠 스타일 (포스터만 표시) */}
        <div style={styles.movieGrid}>
          {filteredMovies.map((movie, index) => {
            const isLastItem = index === filteredMovies.length - 1;
            return (
              <div
                key={movie.id}
                ref={isLastItem ? lastMovieRef : null}
                style={styles.moviePoster}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {/* 랭킹 뱃지 (인기 영화일 때만) */}
                {movie.rank && activeCategories.length === 0 && (
                  <div style={styles.rankBadge}>#{movie.rank}</div>
                )}

                {/* 포스터 이미지 (실제로는 이미지 URL 사용) */}
                {movie.imageUrl ? (
                  <img src={movie.imageUrl} alt={movie.title} style={styles.posterImage} />
                ) : (
                  <div
                    style={{
                      ...styles.posterImage,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#666',
                      textAlign: 'center',
                      padding: '20px',
                      background: 'linear-gradient(135deg, #1c1c1c, #2a2a2a)',
                    }}
                  >
                    {movie.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <div style={{ marginTop: '20px' }}>영화를 불러오는 중...</div>
          </div>
        )}

        {/* No More Content */}
        {!hasMore && filteredMovies.length > 0 && (
          <div style={styles.noContent}>
            <div>모든 영화를 불러왔습니다</div>
          </div>
        )}

        {/* No Results */}
        {filteredMovies.length === 0 && !loading && (
          <div style={styles.noContent}>
            <div>표시할 영화가 없습니다</div>
          </div>
        )}
      </main>

      {/* Footer */}
      <SimpleFooter />

      {/* 스타일 애니메이션 */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* 스크롤바 스타일 */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
