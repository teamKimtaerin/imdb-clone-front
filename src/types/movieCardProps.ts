import { Director } from './movie';

export interface MovieCardProps {
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
  director: Director;
  poster_url?: string;
  age_rating: string; // 시청 등급: ALL, 12, 15, 18, NR 등
  is_adult_content: boolean; // 18등급 여부 (블러 효과용)
  created_at?: string;
  __v?: number;
  rank?: number;
  onClick?: () => void;
}
