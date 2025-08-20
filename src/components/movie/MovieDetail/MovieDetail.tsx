'use client';

import React from 'react';
import { CategoryTag } from '@/components/common/CategoryTag/CategoryTag';
import { Button } from '@/components/common/Button/Button';
import { Movie } from '@/types/index';

interface MovieDetailProps {
  movie: Movie;
}

// 평균 별점을 계산하는 헬퍼 함수
const calculateAverageRating = (total: number, count: number): number => {
  if (count === 0) return 0;
  return Number((total / count).toFixed(1));
};

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const averageRating = calculateAverageRating(movie.rating_total, movie.review_count);

  return (
    <div className="text-white">
      {/* 히어로 섹션 */}
      <div className="relative">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 w-full h-[70vh]">
          <div className="relative w-full h-full">
            {movie.poster_url ? (
              <img
                src={movie.poster_url}
                alt={`${movie.title} 배경`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-red-900" />
            )}
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl">
            {/* 포스터 */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-2xl">
                {movie.poster_url ? (
                  <img
                    src={movie.poster_url}
                    alt={`${movie.title} 포스터`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">🎬</span>
                  </div>
                )}
              </div>
            </div>

            {/* 영화 정보 */}
            <div className="flex-1 mt-8 lg:mt-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{movie.title}</h1>

              {/* 연도와 기본 정보 */}
              <div className="text-gray-300 mb-4">
                {new Date(movie.release_date).getFullYear()} · {movie.running_time}분 ·{' '}
                {movie.categories.join(', ')}
              </div>

              {/* 설명 */}
              <p className="text-gray-200 text-lg leading-relaxed mb-6 max-w-2xl">
                {movie.description}
              </p>

              {/* 평점과 관객수 */}
              <div className="flex items-center gap-8 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-2xl font-bold">{averageRating}</span>
                </div>
                <div className="text-gray-300">관객 {movie.audience.toLocaleString()}명</div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex gap-4 mb-8">
                <Button
                  variant="primary"
                  className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full"
                >
                  ♡ 보고싶어요
                </Button>
                <Button
                  variant="secondary"
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full"
                >
                  ★ 평가하기
                </Button>
              </div>

              {/* 하단 액션 바 */}
              <div className="flex items-center gap-6 text-sm">
                <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    +
                  </div>
                  <span>보고싶어요</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    ★
                  </div>
                  <span>평가하기</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    💬
                  </div>
                  <span>코멘트</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    📤
                  </div>
                  <span>공유</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 섹션 */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 왼쪽 컬럼 - 감독/출연 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">감독/출연</h2>

            {/* 감독 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">감독</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-gray-400">👤</span>
                </div>
                <div>
                  <div className="font-medium">{movie.director}</div>
                  <div className="text-gray-400 text-sm">감독</div>
                </div>
              </div>
            </div>

            {/* 출연진 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-300">출연</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movie.cast.slice(0, 6).map((actor, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400">👤</span>
                    </div>
                    <div>
                      <div className="font-medium">{actor.name}</div>
                      <div className="text-gray-400 text-sm">출연</div>
                    </div>
                  </div>
                ))}
              </div>
              {movie.cast.length > 6 && (
                <button className="mt-4 text-pink-400 hover:text-pink-300 text-sm">더보기</button>
              )}
            </div>
          </div>

          {/* 오른쪽 컬럼 - 기본 정보 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">기본 정보</h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 block text-sm mb-1">개봉</span>
                <span>{new Date(movie.release_date).toLocaleDateString('ko-KR')}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-sm mb-1">장르</span>
                <div className="flex flex-wrap gap-2">
                  {movie.categories.map((category, index) => (
                    <CategoryTag key={index} label={category} isActive={false} />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-400 block text-sm mb-1">국가</span>
                <span>한국</span>
              </div>
              <div>
                <span className="text-gray-400 block text-sm mb-1">러닝타임</span>
                <span>{movie.running_time}분</span>
              </div>
              <div>
                <span className="text-gray-400 block text-sm mb-1">관객수</span>
                <span>{movie.audience.toLocaleString()}명</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 왓챠피디어 사용자 평점 섹션 */}
      <div className="container mx-auto px-6 py-12 max-w-6xl border-t border-gray-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">왓챠피디아 사용자 평</h2>
          <span className="text-gray-400">{movie.review_count.toLocaleString()}+</span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-4xl">★</span>
            <span className="text-4xl font-bold">{averageRating}</span>
          </div>
          <div className="text-gray-400">{movie.review_count}명이 평가</div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full"
          >
            ♡ 코멘트 남기기
          </Button>
          <Button
            variant="secondary"
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full"
          >
            ★ 별점 평가하기
          </Button>
          <button className="text-pink-400 hover:text-pink-300 px-4 py-2">← 보고싶어요</button>
          <button className="text-pink-400 hover:text-pink-300 px-4 py-2">⭐ 평가하기</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
