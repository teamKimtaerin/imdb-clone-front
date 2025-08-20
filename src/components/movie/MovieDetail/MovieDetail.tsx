'use client';

import React from 'react';
import Image from 'next/image';
import { CategoryTag } from '@/components/common/CategoryTag/CategoryTag';
import { Movie } from '@/types/index';

interface MovieDetailProps {
  movie: Movie;
}

// 평균 별점을 계산하는 헬퍼 함수
const calculateAverageRating = (total: number, count: number): string => {
  if (count === 0) {
    return '0.0';
  }
  const average = total / count;
  return average.toFixed(1);
};

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const averageRating = calculateAverageRating(movie.rating_total, movie.review_count);
  console.log('@@' + movie.poster_url);

  return (
    <div className="movie-detail-container p-4 border rounded-lg bg-white shadow-lg">
      <div className="flex flex-col items-center">
        {/* 포스터 이미지 */}
        {movie.poster_url && (
          <div className="mb-4">
            <Image
              src={movie.poster_url}
              alt={`${movie.title} 포스터`}
              width={300}
              height={450}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
        )}

        {/* 영화 제목 및 설명 */}
        <div className="w-full p-4 border rounded-md mb-4 text-center">
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p className="text-gray-600 mt-2">{movie.description}</p>
        </div>

        {/* 출연 / 감독 정보 */}
        <div className="w-full p-4 border rounded-md mb-4 text-center">
          <p className="font-semibold">감독: {movie.director}</p>
          <p>출연: {movie.cast.map((c) => c.name).join(', ')}</p>
        </div>

        {/* 영화 정보 (러닝타임, 개봉일, 관객수) */}
        <div className="w-full p-4 border rounded-md mb-4 text-center">
          <p>러닝타임: {movie.running_time}분</p>
          <p>개봉일: {new Date(movie.release_date).toLocaleDateString()}</p>
          <p>관객수: {movie.audience.toLocaleString()}명</p>
        </div>

        {/* 평점 및 리뷰 수 */}
        <div className="flex items-center justify-between w-full p-4 border rounded-md mb-4">
          <div className="flex items-center">
            <span className="text-4xl text-yellow-500 mr-2">★</span>
            <span className="text-3xl font-bold">{averageRating}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">💬</span>
            <span className="text-lg">{movie.review_count}</span>
          </div>
          <button className="flex items-center text-blue-500">
            <span className="mr-1">+</span> Review
          </button>
        </div>

        {/* 카테고리 태그들 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {movie.categories.map((category) => (
            <CategoryTag key={category} label={category} />
          ))}
        </div>

        {/* 리뷰 캐러셀 */}
        <div className="w-full p-4 border rounded-md mb-4 relative">
          <div className="flex justify-between items-center">
            <button className="text-2xl text-gray-400">{'<'}</button>
            <div className="text-center">
              <p className="font-bold">
                별점: <span>{/* TODO: 실제 리뷰 데이터 바인딩 */}</span>
              </p>
              <p className="text-gray-700">
                유저명: <span>{/* TODO: 실제 리뷰 데이터 바인딩 */}</span>
              </p>
              <p className="mt-2">
                리뷰: <span>{/* TODO: 실제 리뷰 데이터 바인딩 */}</span>
              </p>
            </div>
            <button className="text-2xl text-gray-400">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
