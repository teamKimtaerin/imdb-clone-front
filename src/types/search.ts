export interface SearchItem {
  key_display: string;
  key_type: 'movie' | 'director' | 'actor';
  key_norm: string;
  key_jamo_full: string;
  key_initials: string;
  movieIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SearchResponse {
  ok: boolean;
  query: string;
  count: number;
  items: SearchItem[];
}

export interface SearchState {
  query: string;
  results: SearchItem[];
  isLoading: boolean;
  error: string | null;
}
