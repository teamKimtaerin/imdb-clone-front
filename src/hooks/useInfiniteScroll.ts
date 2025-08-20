import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions<T> {
  fetchData: (page: number) => Promise<{ data: T[]; hasMore: boolean }>;
  enabled?: boolean;
  threshold?: number;
  resetKey?: string | number;
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  isInitialized: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function useInfiniteScroll<T>({
  fetchData,
  enabled = true,
  threshold = 100,
  resetKey,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // ref로 최신 값들 추적
  const isLoadingRef = useRef(false);
  const fetchDataRef = useRef(fetchData);
  const currentResetKeyRef = useRef(resetKey);

  // fetchData ref 업데이트
  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  // resetKey 변경 감지 및 초기화
  useEffect(() => {
    if (resetKey !== currentResetKeyRef.current) {
      currentResetKeyRef.current = resetKey;
      if (isInitialized) {
        setData([]);
        setCurrentPage(1);
        setHasMore(true);
        setError(null);
        setIsInitialized(false);
        isLoadingRef.current = false;
      }
    }
  }, [resetKey, isInitialized]);

  // 데이터 로드 함수
  const loadData = useCallback(
    async (page: number, isRefresh = false) => {
      if (isLoadingRef.current) {
        console.log('🚫 Already loading, skipping request');
        return;
      }

      if (!isRefresh && !hasMore) {
        console.log('🚫 No more data, skipping request');
        return;
      }

      try {
        console.log('🔄 Starting load data for page:', page);
        isLoadingRef.current = true;
        setLoading(true);
        setError(null);

        const result = await fetchDataRef.current(page);
        console.log('✅ Load data result:', result);

        setData((prevData) => (isRefresh ? result.data : [...prevData, ...result.data]));
        setHasMore(result.hasMore);
        setCurrentPage(page);

        if (!isInitialized) {
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('❌ Load data error:', err);
        setError(err instanceof Error ? err.message : '데이터 로드 중 오류가 발생했습니다.');
        setHasMore(false);
      } finally {
        isLoadingRef.current = false;
        setLoading(false);
        console.log('🏁 Load data finished');
      }
    },
    [hasMore, isInitialized],
  );

  // 더 많은 데이터 로드
  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingRef.current) {
      loadData(currentPage + 1);
    }
  }, [hasMore, currentPage, loadData]);

  // 새로고침
  const refresh = useCallback(() => {
    console.log('🔄 Refresh called');
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    setIsInitialized(false);
    isLoadingRef.current = false;

    // 다음 틱에서 실행
    setTimeout(() => {
      loadData(1, true);
    }, 0);
  }, [loadData]);

  // 초기 로드 - 한 번만 실행되도록 조건 강화
  useEffect(() => {
    console.log('🎯 Initial load effect:', {
      enabled,
      isInitialized,
      dataLength: data.length,
      loading,
    });

    if (enabled && !isInitialized && data.length === 0 && !loading && !isLoadingRef.current) {
      console.log('🚀 Triggering initial load');
      loadData(1, true);
    }
  }, [enabled]); // 최소한의 dependency

  // 스크롤 이벤트
  useEffect(() => {
    if (!enabled || !isInitialized) return;

    const handleScroll = () => {
      if (!hasMore || isLoadingRef.current) return;

      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        loadMore();
      }
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [enabled, isInitialized, hasMore, threshold, loadMore]);

  return {
    data,
    loading,
    error,
    hasMore,
    isInitialized,
    loadMore,
    refresh,
  };
}
