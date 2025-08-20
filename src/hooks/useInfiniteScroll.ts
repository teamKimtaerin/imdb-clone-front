import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions<T> {
  /**
   * 데이터를 가져오는 함수
   * @param page 현재 페이지 번호
   * @returns Promise<{ data: T[], hasMore: boolean }>
   */
  fetchData: (page: number) => Promise<{ data: T[]; hasMore: boolean }>;

  /** 초기 로드 여부 */
  enabled?: boolean;

  /** 스크롤 임계값 (px) - 페이지 하단에서 얼마나 떨어진 지점에서 로드할지 */
  threshold?: number;
}

interface UseInfiniteScrollReturn<T> {
  /** 누적된 모든 데이터 */
  data: T[];

  /** 로딩 상태 */
  loading: boolean;

  /** 에러 상태 */
  error: string | null;

  /** 더 많은 데이터가 있는지 여부 */
  hasMore: boolean;

  /** 수동으로 더 많은 데이터 로드 */
  loadMore: () => void;

  /** 데이터 새로고침 (처음부터 다시 로드) */
  refresh: () => void;
}

export function useInfiniteScroll<T>({
  fetchData,
  enabled = true,
  threshold = 100,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // useRef로 최신 상태값들을 추적 (스크롤 이벤트에서 클로저 문제 해결)
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const currentPageRef = useRef(currentPage);

  // ref 값들을 최신으로 유지
  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    currentPageRef.current = currentPage;
  }, [loading, hasMore, currentPage]);

  /**
   * 데이터 로드 함수 - 의존성 배열에서 loading 제거하여 무한 리렌더링 방지
   */
  const loadData = useCallback(
    async (page: number, isRefresh = false) => {
      // 이미 로딩 중이거나, 더 이상 데이터가 없으면 중단
      if (loadingRef.current || (!isRefresh && !hasMoreRef.current)) return;

      try {
        setLoading(true);
        setError(null);

        const result = await fetchData(page);

        setData((prevData) => {
          // 새로고침인 경우 기존 데이터를 교체, 아니면 추가
          return isRefresh ? result.data : [...prevData, ...result.data];
        });

        setHasMore(result.hasMore);
        setCurrentPage(page);

        if (!isInitialized) {
          setIsInitialized(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로드 중 오류가 발생했습니다.');
        // 에러 발생시 hasMore를 false로 설정하여 추가 로딩 방지
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [fetchData, isInitialized], // loading 제거
  );

  /**
   * 더 많은 데이터 로드
   */
  const loadMore = useCallback(() => {
    if (hasMoreRef.current && !loadingRef.current) {
      loadData(currentPageRef.current + 1);
    }
  }, [loadData]);

  /**
   * 데이터 새로고침
   */
  const refresh = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    setIsInitialized(false);
    loadData(1, true);
  }, [loadData]);

  /**
   * 스크롤 이벤트 핸들러 - 디바운싱 적용
   */
  const handleScroll = useCallback(() => {
    if (!hasMoreRef.current || loadingRef.current) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // 페이지 하단에서 threshold만큼 떨어진 지점에 도달하면 로드
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      loadMore();
    }
  }, [threshold, loadMore]);

  // 디바운싱을 위한 타이머 ref
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 디바운싱된 스크롤 핸들러
   */
  const debouncedHandleScroll = useCallback(() => {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = setTimeout(handleScroll, 100);
  }, [handleScroll]);

  /**
   * 초기 데이터 로드
   */
  useEffect(() => {
    if (enabled && !isInitialized && data.length === 0 && !loading) {
      loadData(1, true);
    }
  }, [enabled, isInitialized, data.length, loading, loadData]);

  /**
   * 스크롤 이벤트 리스너 등록/해제
   */
  useEffect(() => {
    if (!enabled || !isInitialized) return;

    // 스크롤 이벤트 리스너 등록 (디바운싱 적용)
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    // 클린업 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거 및 타이머 정리
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [enabled, isInitialized, debouncedHandleScroll]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
