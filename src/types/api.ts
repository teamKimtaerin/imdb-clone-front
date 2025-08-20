import { Movie } from './movie';

// API 응답 기본 인터페이스
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 영화 목록 API 응답
export interface MoviesApiResponse {
  movies: Movie[];
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}

// 에러 응답
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}

// API 클라이언트 설정
export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// 영화 검색 파라미터
export interface MoviesQueryParams {
  page?: number;
  limit?: number;
  categories?: string;
  sort?: 'popular' | 'rating' | 'newest' | 'oldest';
  search?: string;
}
