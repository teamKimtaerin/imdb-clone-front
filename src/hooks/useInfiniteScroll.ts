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

  // 초기 로드 완료 여부를 추적
  const initialLoadedRef = useRef(false);
  // 현재 로딩 중인지 추적 (중복 요청 방지)
  const loadingRef = useRef(false);

  /**
   * 데이터 로드 함수
   */
  const loadData = useCallback(
    async (page: number, isRefresh = false) => {
      // 이미 로딩 중이면 중복 요청 방지
      if (loadingRef.current) return;

      try {
        loadingRef.current = true;
        setLoading(true);
        setError(null);

        const result = await fetchData(page);

        setData((prevData) => {
          // 새로고침인 경우 기존 데이터를 교체, 아니면 추가
          return isRefresh ? result.data : [...prevData, ...result.data];
        });

        setHasMore(result.hasMore);
        setCurrentPage(page);

        // 초기 로드 완료 표시
        if (!initialLoadedRef.current) {
          initialLoadedRef.current = true;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터 로드 중 오류가 발생했습니다.');
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [fetchData], // loading 제거
  );

  /**
   * 더 많은 데이터 로드
   */
  const loadMore = useCallback(() => {
    if (hasMore && !loadingRef.current) {
      loadData(currentPage + 1);
    }
  }, [hasMore, currentPage, loadData]);

  /**
   * 데이터 새로고침
   */
  const refresh = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    initialLoadedRef.current = false; // 초기 로드 상태 리셋
    loadData(1, true);
  }, [loadData]);

  /**
   * 스크롤 이벤트 핸들러
   */
  const handleScroll = useCallback(() => {
    if (!hasMore || loadingRef.current) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // 페이지 하단에서 threshold만큼 떨어진 지점에 도달하면 로드
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      loadMore();
    }
  }, [hasMore, threshold, loadMore]);

  /**
   * 초기 데이터 로드
   */
  useEffect(() => {
    if (enabled && !initialLoadedRef.current && !loadingRef.current) {
      loadData(1, true);
    }
  }, [enabled, loadData]);

  /**
   * 스크롤 이벤트 리스너 등록/해제
   */
  useEffect(() => {
    if (!enabled) return;

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 클린업 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, handleScroll]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
