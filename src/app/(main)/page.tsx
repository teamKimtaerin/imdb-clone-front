'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavigationBar } from '@/components/common/NavigationBar';
import { CategoryTag } from '@/components/common/CategoryTag';
import { MovieCard } from '@/components/movie/MovieCard';
import { Button } from '@/components/common/Button';
import { SimpleFooter } from '@/components/common/Footer/Footer';
import { MovieCardProps } from '@/components/movie/MovieCard/MovieCard';
import { CategoryTagProps } from '@/components/common/CategoryTag/CategoryTag';

export default function WatchaMainPage() {
  // 상태 관리
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<CategoryTagProps[]>([]);
  const [sortBy, setSortBy] = useState('latest'); // latest, rating, title
  const [viewMode, setViewMode] = useState('infinite'); // infinite or pagination
  const [searchQuery, setSearchQuery] = useState('');

  // 무한 스크롤을 위한 ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  // 임시 카테고리 데이터
  const categories: CategoryTagProps[] = [
    { label: '전체', isActive: false },
    { label: '액션', isActive: false },
    { label: '로맨스', isActive: false },
    { label: '코미디', isActive: false },
    { label: 'SF', isActive: false },
    { label: '공포', isActive: false },
    { label: '스릴러', isActive: false },
    { label: '판타지', isActive: false },
    { label: '다큐', isActive: false },
    { label: '애니메이션', isActive: false },
    { label: '드라마', isActive: false },
  ];

  // 페이지당 아이템 수
  const ITEMS_PER_PAGE = 20;

  // 가상의 영화 데이터 생성
  const generateMovies = (start: number, count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: start + i,
      title: `영화 ${start + i}`,
      year: 2020 + Math.floor(Math.random() * 5),
      rating: (3 + Math.random() * 2).toFixed(1),
      genre: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
      imageUrl: null,
    }));
  };

  // 영화 데이터 로드
  const loadMovies = useCallback(async (pageNum = 1, append = false) => {
    setLoading(true);

    // API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newMovies = generateMovies((pageNum - 1) * ITEMS_PER_PAGE + 1, ITEMS_PER_PAGE);

    if (append) {
      // setMovies(prev => [...prev, ...newMovies]);
    } else {
      // setMovies(newMovies);
    }

    // 100개 이상이면 더 이상 로드하지 않음 (예시)
    if (pageNum * ITEMS_PER_PAGE >= 100) {
      setHasMore(false);
    }

    setLoading(false);
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    loadMovies(1);
  }, []);

  // 필터링 및 정렬 적용
  useEffect(() => {
    let result = [...movies];

    // 카테고리 필터링
    // if (selectedCategories.length > 0) {
    //   result = result.filter(movie => selectedCategories.includes(movie.genre));
    // }

    // 검색 필터링
    if (searchQuery) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 정렬
    switch (sortBy) {
      // case 'rating':
      //   result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      //   break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'latest':
      default:
        result.sort((a, b) => b.year - a.year);
        break;
    }

    setFilteredMovies(result);
  }, [movies, selectedCategories, sortBy, searchQuery]);

  // 무한 스크롤 Observer 설정
  useEffect(() => {
    if (viewMode !== 'infinite') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
          loadMovies(page + 1, true);
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [page, hasMore, loading, viewMode]);

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
  }, [filteredMovies]);

  // 카테고리 선택 핸들러
  const handleCategoryClick = (category: CategoryTagProps) => {
    if (category.isActive === false) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) => {
        if (prev.includes(category)) {
          return prev.filter((c) => c !== category);
        } else {
          return [...prev, category];
        }
      });
    }
    setPage(1);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(100 / ITEMS_PER_PAGE); // 총 100개 아이템 가정
  const currentPageMovies =
    viewMode === 'pagination'
      ? filteredMovies.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
      : filteredMovies;

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (newPage > Math.ceil(movies.length / ITEMS_PER_PAGE)) {
      loadMovies(newPage);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styles: { [key: string]: React.CSSProperties } = {
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
      scrollbarWidth: 'thin',
      scrollbarColor: '#333 transparent',
    },
    main: {
      flex: 1,
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
    },
    sortSection: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
    },
    viewModeSection: {
      display: 'flex',
      gap: '8px',
      padding: '4px',
      background: '#1c1c1c',
      borderRadius: '8px',
    },
    movieGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '32px',
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '32px',
      color: '#999',
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      padding: '32px 0',
    },
    pageButton: {
      padding: '8px 12px',
      background: 'transparent',
      // border: '1px solid #333',
      color: '#999',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    activePageButton: {
      background: '#ff0558',
      borderColor: '#ff0558',
      color: '#fff',
    },
    comparisonBox: {
      background: '#1c1c1c',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '24px',
    },
    comparisonTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#ff0558',
    },
    comparisonGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    comparisonCard: {
      background: '#0a0a0a',
      padding: '16px',
      borderRadius: '8px',
    },
    comparisonCardTitle: {
      fontWeight: 'bold',
      marginBottom: '12px',
      color: '#fff',
    },
    prosList: {
      listStyle: 'none',
      padding: 0,
      margin: '8px 0',
    },
    prosItem: {
      padding: '4px 0',
      color: '#4ade80',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'flex-start',
    },
    consItem: {
      padding: '4px 0',
      color: '#f87171',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'flex-start',
    },
  };

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
                key={category.label}
                label={category.label}
                isActive={
                  category.isActive === false
                    ? selectedCategories.length === 0
                    : selectedCategories.includes(category)
                }
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* 무한 스크롤 vs 페이지네이션 비교 박스 */}
        <div style={styles.comparisonBox}>
          <h2 style={styles.comparisonTitle}>📊 무한 스크롤 vs 페이지네이션 비교</h2>
          <div style={styles.comparisonGrid}>
            <div style={styles.comparisonCard}>
              <h3 style={styles.comparisonCardTitle}>♾️ 무한 스크롤</h3>
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#4ade80', fontSize: '14px' }}>장점:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.prosItem}>✓ 끊김 없는 사용자 경험</li>
                  <li style={styles.prosItem}>✓ 모바일 친화적 (스크롤 제스처)</li>
                  <li style={styles.prosItem}>✓ 콘텐츠 탐색에 적합</li>
                  <li style={styles.prosItem}>✓ 사용자 참여도 증가</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#f87171', fontSize: '14px' }}>단점:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.consItem}>✗ 특정 콘텐츠 재접근 어려움</li>
                  <li style={styles.consItem}>✗ 페이지 footer 접근 불편</li>
                  <li style={styles.consItem}>✗ 메모리 사용량 증가</li>
                  <li style={styles.consItem}>✗ SEO 최적화 어려움</li>
                </ul>
              </div>
            </div>

            <div style={styles.comparisonCard}>
              <h3 style={styles.comparisonCardTitle}>📄 페이지네이션</h3>
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#4ade80', fontSize: '14px' }}>장점:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.prosItem}>✓ 명확한 콘텐츠 구분</li>
                  <li style={styles.prosItem}>✓ 특정 페이지 북마크 가능</li>
                  <li style={styles.prosItem}>✓ 성능 예측 가능</li>
                  <li style={styles.prosItem}>✓ SEO 친화적</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#f87171', fontSize: '14px' }}>단점:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.consItem}>✗ 추가 클릭 필요</li>
                  <li style={styles.consItem}>✗ 페이지 로딩 대기</li>
                  <li style={styles.consItem}>✗ 콘텐츠 흐름 끊김</li>
                  <li style={styles.consItem}>✗ 모바일에서 불편</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: '#ff0558',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <strong>🎬 왓챠 추천:</strong> 영화 탐색 서비스 특성상 <strong>무한 스크롤</strong>이
            적합합니다!
            <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
              콘텐츠를 계속 탐색하며 새로운 작품을 발견하는 경험에 최적화
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.sortSection}>
            <span style={{ color: '#999', fontSize: '14px' }}>정렬:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#1c1c1c',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '4px',
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            >
              <option value="latest">최신순</option>
              <option value="rating">평점순</option>
              <option value="title">제목순</option>
            </select>
          </div>

          <div style={styles.viewModeSection}>
            <Button
              onClick={() => setViewMode('infinite')}
              style={{
                padding: '8px 16px',
                background: viewMode === 'infinite' ? '#ff0558' : 'transparent',
                color: viewMode === 'infinite' ? '#fff' : '#999',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              무한 스크롤
            </Button>
            <Button
              onClick={() => setViewMode('pagination')}
              style={{
                padding: '8px 16px',
                background: viewMode === 'pagination' ? '#ff0558' : 'transparent',
                color: viewMode === 'pagination' ? '#fff' : '#999',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              페이지네이션
            </Button>
          </div>
        </div>

        {/* Movie Grid */}
        <div style={styles.movieGrid}>
          {currentPageMovies.map((movie, index) => {
            const isLastItem = index === currentPageMovies.length - 1;
            return (
              <div key={movie.id} ref={isLastItem && viewMode === 'infinite' ? lastMovieRef : null}>
                <MovieCard {...movie} />
              </div>
            );
          })}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div>로딩 중...</div>
          </div>
        )}

        {/* No More Content */}
        {!hasMore && viewMode === 'infinite' && (
          <div style={styles.loadingContainer}>
            <div>모든 콘텐츠를 불러왔습니다</div>
          </div>
        )}

        {/* Pagination Controls */}
        {viewMode === 'pagination' && (
          <div style={styles.paginationContainer}>
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              style={{
                ...styles.pageButton,
                opacity: page === 1 ? 0.5 : 1,
                cursor: page === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              이전
            </Button>

            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    ...styles.pageButton,
                    ...(page === pageNum ? styles.activePageButton : {}),
                  }}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              style={{
                ...styles.pageButton,
                opacity: page === totalPages ? 0.5 : 1,
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              다음
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <SimpleFooter />
    </div>
  );
}
