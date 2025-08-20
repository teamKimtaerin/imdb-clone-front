export interface Cast {
  name: string;
  role: string;
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
  director: string;
  poster_url?: string;
  age_rating: string; // 시청 등급: ALL, 12, 15, 18 등
  created_at?: string;
  __v?: number;
  rank?: number;
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
