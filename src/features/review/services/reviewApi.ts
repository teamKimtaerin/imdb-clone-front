import axios from 'axios';
import { Review, ReviewFormData, ReviewsResponse } from '@/types/review';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

// axios 인스턴스 생성 (공통 설정)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 디버깅용 로그
if (process.env.NODE_ENV === 'development') {
  console.log('Review API Base URL:', API_BASE_URL);
}

// TODO: 인증 토큰이 필요하면 request interceptor에서 추가
// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export class ReviewApiService {
  /**
   * 특정 영화의 리뷰 목록 조회 (무한 스크롤 지원)
   * GET /api/reviews/movie/:movieId
   */
  static async getMovieReviews(movieId: string, page = 1, limit = 10): Promise<ReviewsResponse> {
    try {
      const url = `/api/reviews/movie/${movieId}`;
      console.log('🔍 Requesting reviews:', { url, movieId, page, limit }); // 디버깅용

      const { data } = await api.get(url, {
        params: { page, limit },
      });
      return data;
    } catch (error) {
      console.error('리뷰 목록 조회 중 오류:', error);
      throw error;
    }
  }

  /**
   * 새 리뷰 작성
   * POST /api/reviews/movie/:movieId
   */
  static async createReview(movieId: string, reviewData: ReviewFormData): Promise<Review> {
    try {
      const { data } = await api.post(`/api/reviews/movie/${movieId}`, reviewData);
      return data;
    } catch (error) {
      console.error('리뷰 작성 중 오류:', error);
      throw error;
    }
  }

  /**
   * 기존 리뷰 수정
   * PUT /api/reviews/:reviewId
   */
  static async updateReview(
    reviewId: string,
    reviewData: Partial<ReviewFormData>,
  ): Promise<Review> {
    try {
      const { data } = await api.put(`/api/reviews/${reviewId}`, reviewData);
      return data;
    } catch (error) {
      console.error('리뷰 수정 중 오류:', error);
      throw error;
    }
  }

  /**
   * 리뷰 삭제
   * DELETE /api/reviews/:reviewId
   */
  static async deleteReview(reviewId: string): Promise<void> {
    try {
      await api.delete(`/api/reviews/${reviewId}`);
    } catch (error) {
      console.error('리뷰 삭제 중 오류:', error);
      throw error;
    }
  }

  /**
   * 특정 사용자의 리뷰 목록 조회
   * GET /api/reviews/user/:userId
   */
  static async getUserReviews(userId: string, page = 1, limit = 10): Promise<ReviewsResponse> {
    try {
      const { data } = await api.get(`/api/reviews/user/${userId}`, {
        params: { page, limit },
      });
      return data;
    } catch (error) {
      console.error('사용자 리뷰 목록 조회 중 오류:', error);
      throw error;
    }
  }
}
