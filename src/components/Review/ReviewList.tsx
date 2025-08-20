import React, { useState } from 'react';
import { ReviewCard } from './ReviewCard';
import ReviewForm from './ReviewForm';
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
    is_spoiler: boolean;
  }) => {
    try {
      await createReview(reviewData);
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
    is_spoiler: boolean;
  }) => {
    if (!editingReview) return;

    try {
      await updateReview(editingReview._id, reviewData);
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

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-red-900 border border-red-700 text-red-200 px-6 py-4 rounded-lg text-center">
          리뷰를 불러오는 중 오류가 발생했습니다: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">리뷰</h2>
            <span className="text-gray-400">({reviews.length})</span>
          </div>

          {currentUserId && !isWriting && !editingReview && (
            <button
              onClick={() => setIsWriting(true)}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors font-medium"
            >
              ✏️ 리뷰 작성
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
              is_spoiler: editingReview.is_spoiler,
            }}
            onSubmit={handleUpdateReview}
            onCancel={() => setEditingReview(null)}
          />
        )}

        {/* 리뷰 목록 */}
        <div className="space-y-4">
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
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <div className="text-gray-400">리뷰를 불러오는 중...</div>
          </div>
        )}

        {/* 더보기 버튼 - 데이터가 충분히 많고 더 불러올 데이터가 있을 때만 표시 */}
        {!loading && hasMore && reviews.length >= 10 && (
          <div className="text-center pt-8">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
            >
              더보기
            </button>
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <div className="text-xl text-gray-400 mb-2">아직 작성된 리뷰가 없습니다</div>
            <div className="text-gray-500">이 작품의 첫 번째 리뷰어가 되어보세요!</div>
            {currentUserId && (
              <button
                onClick={() => setIsWriting(true)}
                className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors"
              >
                첫 리뷰 작성하기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
