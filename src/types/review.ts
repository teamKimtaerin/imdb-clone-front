// 사용자 정보 타입
export interface User {
  user_id: string;
  nickname: string;
  profile_img_url?: string;
}

// 영화 정보 타입 (리뷰용)
export interface MovieInfo {
  movie_id: string;
  title: string;
  release_date: string;
  running_time: number;
  poster_url?: string;
}

// 리뷰 타입
export interface Review {
  _id: string;
  title: string;
  rating: number; // 0.5 ~ 5.0
  content: string;
  is_spoiler: boolean;
  user: User;
  movie: MovieInfo;
  created_at: string;
}

// 리뷰 작성/수정용 폼 데이터 타입
export interface ReviewFormData {
  title: string;
  rating: number;
  content: string;
  is_spoiler: boolean;
}

// API 응답 타입 (무한 스크롤용)
export interface ReviewsResponse {
  reviews: Review[];
  hasMore: boolean;
  page: number;
  totalCount: number;
}

// 무한 스크롤 훅 반환 타입
export interface UseInfiniteScrollReturn {
  data: Review[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  deleteLoading?: boolean;
}

export interface ReviewFormProps {
  isEditing?: boolean;
  initialData?: ReviewFormData;
  onSubmit: (data: ReviewFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface ReviewListProps {
  movieId: string;
  currentUserId?: string;
}
