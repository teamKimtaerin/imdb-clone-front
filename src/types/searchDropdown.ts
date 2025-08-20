export interface SearchItem {
  key: string;
  type: 'movie' | 'actor';
  movieIds: string[];
  score: number;
}

export interface SearchDropdownProps {
  items: SearchItem[];
  isVisible: boolean;
  onItemClick: (item: SearchItem) => void;
  query: string;
}
