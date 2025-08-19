export interface CastMember {
  name: string;
  role: string;
}

export interface Movie {
  _id?: string;
  title: string;
  categories: string[];
  running_time: number;
  release_date: Date;
  rating_total: number;
  review_count: number;
  audience: number;
  trailer_url: string;
  description: string;
  cast: CastMember[];
  director: string;
  poster_url: string;
}

// export interface Review {
//   id: string;
//   rating: number;
//   user: string;
//   comment: string;
// }
