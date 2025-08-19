export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: string;
  genre: string;
  imageUrl: string | null;
  rank?: number;
}
