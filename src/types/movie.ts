export interface Cast {
  name: string;
  role: string;
  profile_image?: string | null;
}

export interface Director {
  name: string;
  profile_image?: string | null;
}

export interface Movie {
  _id: string;
  title: string;
  categories: string[];
  running_time: number;
  release_date: string;
  rating_total: number;
  review_count: number;
  audience: number;
  trailer_url?: string;
  description: string;
  cast: Cast[];
  director: Director;
  poster_url?: string;
  age_rating: string;
  is_adult_content?: boolean;
  created_at?: string;
  __v?: number;
  rank?: number;

  // 리뷰 관련 추가 필드들 (백엔드에서 계산해서 전달)
  user_review_count?: number;
  user_rating_total?: number;
  user_avg_rating?: number;
  display_review_count?: number;
  display_avg_rating?: number;

  // 원본 크롤링 데이터 (참고용)
  original_review_count?: number;
  original_rating_total?: number;
  original_avg_rating?: number;
}

// 기존 코드 호환성을 위한 레거시 인터페이스
export interface LegacyMovie {
  id: number;
  title: string;
  year: number;
  rating: string;
  genre: string;
  imageUrl: string | null;
  rank?: number;
}
