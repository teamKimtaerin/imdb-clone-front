import { useState, useCallback } from 'react';
import { Review, ReviewFormData } from '@/types/review';
import { ReviewApiService } from '../services/reviewApi';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface UseReviewsOptions {
  /** 영화 ID */
  movieId: string;

  /** 자동 로드 여부 */
  enabled?: boolean;
}

interface UseReviewsReturn {
  /** 리뷰 목록 (무한 스크롤) */
  reviews: Review[];

  /** 로딩 상태 */
  loading: boolean;

  /** 에러 상태 */
  error: string | null;

  /** 더 많은 리뷰가 있는지 여부 */
  hasMore: boolean;

  /** 수동으로 더 많은 리뷰 로드 */
  loadMore: () => void;

  /** 리뷰 목록 새로고침 */
  refresh: () => void;

  /** 새 리뷰 작성 */
  createReview: (reviewData: ReviewFormData) => Promise<Review>;

  /** 리뷰 수정 */
  updateReview: (reviewId: string, reviewData: Partial<ReviewFormData>) => Promise<Review>;

  /** 리뷰 삭제 */
  deleteReview: (reviewId: string) => Promise<void>;

  /** 리뷰 작성/수정/삭제 로딩 상태 */
  mutationLoading: boolean;
}

export function useReviews({ movieId, enabled = true }: UseReviewsOptions): UseReviewsReturn {
  const [mutationLoading, setMutationLoading] = useState(false);

  /**
   * 무한 스크롤을 위한 데이터 fetch 함수
   */
  const fetchReviews = useCallback(
    async (page: number) => {
      const response = await ReviewApiService.getMovieReviews(movieId, page, 10);
      return {
        data: response.reviews,
        hasMore: response.hasMore,
      };
    },
    [movieId],
  );

  // 무한 스크롤 훅 사용
  const {
    data: reviews,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  } = useInfiniteScroll({
    fetchData: fetchReviews,
    enabled,
    threshold: 200, // 페이지 하단 200px 지점에서 로드
  });

  /**
   * 새 리뷰 작성
   */
  const createReview = useCallback(
    async (reviewData: ReviewFormData): Promise<Review> => {
      setMutationLoading(true);
      try {
        const newReview = await ReviewApiService.createReview(movieId, reviewData);
        refresh();
        return newReview;
      } finally {
        setMutationLoading(false);
      }
    },
    [movieId, refresh],
  );

  /**
   * 리뷰 수정
   */
  const updateReview = useCallback(
    async (reviewId: string, reviewData: Partial<ReviewFormData>): Promise<Review> => {
      setMutationLoading(true);
      try {
        const updatedReview = await ReviewApiService.updateReview(reviewId, reviewData);
        refresh();
        return updatedReview;
      } finally {
        setMutationLoading(false);
      }
    },
    [refresh],
  );

  /**
   * 리뷰 삭제
   */
  const deleteReview = useCallback(
    async (reviewId: string): Promise<void> => {
      setMutationLoading(true);
      try {
        await ReviewApiService.deleteReview(reviewId);
        refresh();
      } finally {
        setMutationLoading(false);
      }
    },
    [refresh],
  );

  return {
    reviews,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    createReview,
    updateReview,
    deleteReview,
    mutationLoading,
  };
}
