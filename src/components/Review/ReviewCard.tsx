import React from 'react';
import { StarRating } from '@/components/common/StarRating/StarRating';
import { ReviewCardProps } from '@/types/review';

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  currentUserId,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  const { title, rating, content, user, created_at } = review;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header - 닉네임과 날짜 */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-gray-900">{user.nickname}</span>
        <span className="text-xs text-gray-500">
          {new Date(created_at).toLocaleDateString('ko-KR')}
        </span>
      </div>

      {/* 리뷰 제목 */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

      {/* 별점 */}
      <div className="mb-3">
        <StarRating value={rating} readonly size="md" />
      </div>

      {/* 리뷰 내용 */}
      <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">{content}</p>

      {/* 액션 버튼들 (현재 사용자의 리뷰일 때만 표시) */}
      {currentUserId && (onEdit || onDelete) && (
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          {onEdit && (
            <button
              onClick={() => onEdit(review._id)}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150"
            >
              수정
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(review._id)}
              disabled={deleteLoading}
              className="text-xs text-red-600 hover:text-red-800 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {deleteLoading ? '삭제 중...' : '삭제'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
