'use client';

import React, { useState, useEffect } from 'react';
import { StarRating } from '@/components/common/StarRating/StarRating';
import { ReviewFormData } from '@/types/review';

interface ReviewFormProps {
  // 폼이 수정 모드인지 확인하는 플래그
  isEditing?: boolean;
  // 초기 값 (수정 모드일 때 사용)
  initialData?: ReviewFormData & { is_spoiler?: boolean };
  // 폼 제출 시 호출될 함수
  onSubmit: (data: ReviewFormData & { is_spoiler: boolean }) => void;
  // 취소 버튼 클릭 시 호출될 함수
  onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  isEditing = false,
  initialData,
  onSubmit,
  onCancel,
}) => {
  // 폼 필드 상태 관리
  const [title, setTitle] = useState(initialData?.title || '');
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [content, setContent] = useState(initialData?.content || '');
  const [isSpoiler, setIsSpoiler] = useState(initialData?.is_spoiler || false);

  // 초기 데이터가 변경될 때마다 폼 상태를 업데이트
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setRating(initialData.rating);
      setContent(initialData.content);
      setIsSpoiler(initialData.is_spoiler || false);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && content) {
      onSubmit({ title, rating, content, is_spoiler: isSpoiler });
    } else {
      alert('제목, 평점, 내용을 모두 입력해주세요!');
    }
  };

  return (
    <div className="bg-black-800 border border-black rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        {isEditing ? '리뷰 수정' : '리뷰 작성'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 평점 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">평점</label>
          <div className="flex items-center gap-3">
            <StarRating value={rating} onChange={setRating} size="lg" />
            <span className="text-yellow-400 font-medium text-lg">
              {rating > 0 ? rating : '평점을 선택하세요'}
            </span>
          </div>
        </div>

        {/* 스포일러 옵션 */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
              className="w-4 h-4 text-pink-600 bg-black-700 border-gray-600 rounded focus:ring-pink-500 focus:ring-2"
            />
            <span className="text-sm text-gray-300">
              ⚠️ 이 리뷰에는 스포일러가 포함되어 있습니다
            </span>
          </label>
          {isSpoiler && (
            <p className="text-xs text-yellow-400 mt-2 ml-7">
              스포일러 리뷰는 다른 사용자에게 가려져서 표시됩니다.
            </p>
          )}
        </div>

        {/* 내용 입력 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            내용
          </label>
          <textarea
            id="content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-black-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors resize-none"
            placeholder="이 작품에 대한 생각을 자유롭게 표현해보세요.&#10;&#10;• 작품의 어떤 부분이 좋았나요?&#10;• 아쉬웠던 점이 있다면?&#10;• 다른 사람들에게 추천하고 싶나요?"
            required
          />
          <div className="text-xs text-gray-400 mt-2">
            최소 10자 이상 작성해주세요. ({content.length}/500)
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-sm font-medium text-gray-300 bg-black-700 hover:bg-black-600 rounded-full transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-full transition-colors"
          >
            {isEditing ? '수정 완료' : '리뷰 등록'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
