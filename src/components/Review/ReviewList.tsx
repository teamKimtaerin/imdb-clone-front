import React, { useState } from 'react';
import { ReviewCard } from './ReviewCard';
import ReviewForm from './ReviewForm'; // default import로 변경
import { useReviews } from '@/features/review/hooks/useReviews';
import { Review } from '@/types/review';

interface ReviewListProps {
  movieId: string;
  currentUserId?: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({ movieId, currentUserId }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const {
    reviews,
    loading,
    error,
    hasMore,
    loadMore,
    createReview,
    updateReview,
    deleteReview,
    mutationLoading,
  } = useReviews({ movieId });

  /**
   * 새 리뷰 작성 핸들러
   */
  const handleCreateReview = async (reviewData: {
    title: string;
    rating: number;
    content: string;
  }) => {
    try {
      await createReview({
        ...reviewData,
        is_spoiler: false, // 기본값으로 설정
      });
      setIsWriting(false);
    } catch (err) {
      console.error('리뷰 작성 실패:', err);
      alert('리뷰 작성에 실패했습니다.');
    }
  };

  /**
   * 리뷰 수정 핸들러
   */
  const handleUpdateReview = async (reviewData: {
    title: string;
    rating: number;
    content: string;
  }) => {
    if (!editingReview) return;

    try {
      await updateReview(editingReview._id, {
        ...reviewData,
        is_spoiler: false,
      });
      setEditingReview(null);
    } catch (err) {
      console.error('리뷰 수정 실패:', err);
      alert('리뷰 수정에 실패했습니다.');
    }
  };

  /**
   * 리뷰 삭제 핸들러
   */
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('정말로 이 리뷰를 삭제하시겠습니까?')) return;

    try {
      await deleteReview(reviewId);
    } catch (err) {
      console.error('리뷰 삭제 실패:', err);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  /**
   * 리뷰 수정 시작
   */
  const handleEditStart = (reviewId: string) => {
    const review = reviews.find((r) => r._id === reviewId);
    if (review) {
      setEditingReview(review);
    }
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const writeButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const loadMoreButtonStyle: React.CSSProperties = {
    display: 'block',
    margin: '20px auto',
    padding: '10px 30px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    padding: '20px',
    color: '#666',
  };

  const errorStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    padding: '20px',
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '6px',
    margin: '20px 0',
  };

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>{error}</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>리뷰 ({reviews.length})</h2>
        {currentUserId && !isWriting && !editingReview && (
          <button style={writeButtonStyle} onClick={() => setIsWriting(true)}>
            리뷰 작성
          </button>
        )}
      </div>

      {/* 리뷰 작성 폼 */}
      {isWriting && (
        <ReviewForm onSubmit={handleCreateReview} onCancel={() => setIsWriting(false)} />
      )}

      {/* 리뷰 수정 폼 */}
      {editingReview && (
        <ReviewForm
          isEditing
          initialData={{
            title: editingReview.title,
            rating: editingReview.rating,
            content: editingReview.content,
          }}
          onSubmit={handleUpdateReview}
          onCancel={() => setEditingReview(null)}
        />
      )}

      {/* 리뷰 목록 */}
      <div>
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            currentUserId={currentUserId}
            onEdit={handleEditStart}
            onDelete={handleDeleteReview}
            deleteLoading={mutationLoading}
          />
        ))}
      </div>

      {/* 로딩 상태 */}
      {loading && <div style={loadingStyle}>리뷰를 불러오는 중...</div>}

      {/* 더보기 버튼 */}
      {!loading && hasMore && (
        <button style={loadMoreButtonStyle} onClick={loadMore}>
          더보기
        </button>
      )}

      {/* 리뷰가 없을 때 */}
      {!loading && reviews.length === 0 && (
        <div style={loadingStyle}>아직 작성된 리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default ReviewList;
