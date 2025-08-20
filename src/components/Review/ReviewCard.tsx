import React, { useState } from 'react';
import { StarRating } from '@/components/common/StarRating/StarRating';
import { ReviewCardProps } from '@/types/review';

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  currentUserId,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  const { title, rating, content, user, created_at, is_spoiler } = review;
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <div className="py-4 border-b border-gray-800 last:border-b-0">
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 */}
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {user.nickname.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* 리뷰 내용 */}
        <div className="flex-1 min-w-0">
          {/* 닉네임과 별점 */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white">{user.nickname}</span>
            {/* StarRating 컴포넌트 사용 - 작은 크기, 읽기 전용 */}
            <StarRating value={rating} readonly={true} size="sm" />
          </div>

          {/* 리뷰 제목 (있는 경우) */}
          {title && <h4 className="text-white font-medium mb-1 line-clamp-1">{title}</h4>}

          {/* 스포일러 처리 */}
          {is_spoiler && !showSpoiler ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-sm">⚠️</span>
                <span className="text-gray-300 text-sm">스포일러가 포함된 리뷰입니다</span>
              </div>
              <button
                onClick={() => setShowSpoiler(true)}
                className="text-pink-400 hover:text-pink-300 text-sm transition-colors"
              >
                리뷰 보기
              </button>
            </div>
          ) : (
            <div>
              {is_spoiler && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-400 text-xs">⚠️ 스포일러</span>
                  <button
                    onClick={() => setShowSpoiler(false)}
                    className="text-xs text-gray-400 hover:text-gray-300"
                  >
                    숨기기
                  </button>
                </div>
              )}
              <p className="text-gray-300 leading-relaxed">{content}</p>
            </div>
          )}

          {/* 액션 버튼들 (현재 사용자의 리뷰일 때만 표시) */}
          {currentUserId && (onEdit || onDelete) && (
            <div className="flex gap-3 mt-3 pt-2 border-t border-gray-700">
              {onEdit && (
                <button
                  onClick={() => onEdit(review._id)}
                  className="text-sm text-pink-400 hover:text-pink-300 transition-colors duration-150"
                >
                  수정
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(review._id)}
                  disabled={deleteLoading}
                  className="text-sm text-red-400 hover:text-red-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  {deleteLoading ? '삭제 중...' : '삭제'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
