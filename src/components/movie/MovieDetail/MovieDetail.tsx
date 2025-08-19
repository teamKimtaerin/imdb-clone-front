import React from 'react';
import { Movie } from '@/types';

interface Props {
  movie: Movie;
}

const MovieDetail: React.FC<Props> = ({ movie }) => {
  const averageRating =
    movie.review_count > 0 ? (movie.rating_total / movie.review_count).toFixed(1) : '0';

  return (
    <div className="movie-detail-container">
      {/* 영화 제목 / 설명 */}
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      {/* 출연 / 감독 */}
      <div className="crew">
        <p>감독: {movie.director}</p>
        {/* <p>출연: {movie.cast.map(c => c.name).join(', ')}</p> */}
      </div>

      {/* 평점 / 리뷰 수 */}
      {/* <div className="rating">
        <span>⭐ {averageRating}</span>
        <span>💬 {movie.review_count}</span>
        <button>+ Review</button>
      </div> */}
    </div>
  );
};

export default MovieDetail;
