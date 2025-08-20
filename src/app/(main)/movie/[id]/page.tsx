'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { ReviewList } from '@/components/Review/ReviewList';

const MovieDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  // TODO: 실제 구현에서는 useAuth 훅이나 context에서 가져오기
  const currentUserId = 'user123'; // 임시로 하드코딩

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 테스트용 영화 정보 헤더 */}
      <div
        style={{
          marginBottom: '40px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>
          영화 상세 페이지 (테스트)
        </h1>
        <p style={{ margin: '0', color: '#666' }}>
          영화 ID: {id} | 현재 사용자: {currentUserId}
        </p>
      </div>

      {/* 리뷰 섹션 */}
      <ReviewList movieId={id} currentUserId={currentUserId} />
    </div>
  );
};

export default MovieDetailPage;
