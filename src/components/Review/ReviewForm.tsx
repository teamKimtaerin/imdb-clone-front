'use client';

import React, { useState, useEffect } from 'react';

import { StarRating } from '@/components/common/StarRating/StarRating';

interface ReviewFormProps {
  // 폼이 수정 모드인지 확인하는 플래그
  isEditing?: boolean;
  // 초기 값 (수정 모드일 때 사용)
  initialData?: {
    title: string;
    rating: number;
    content: string;
  };
  // 폼 제출 시 호출될 함수
  onSubmit: (data: { title: string; rating: number; content: string }) => void;
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

  // 초기 데이터가 변경될 때마다 폼 상태를 업데이트
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setRating(initialData.rating);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && rating > 0 && content) {
      onSubmit({ title, rating, content });
    } else {
      alert('모든 필드를 채워주세요!');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? '리뷰 수정' : '리뷰 작성'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="리뷰 제목을 입력하세요"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">평점</label>
          {/* StarRating 컴포넌트를 사용하여 평점을 선택 */}
          <StarRating value={rating} onChange={setRating} />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="상세한 리뷰 내용을 작성해주세요"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? '수정 완료' : '작성 완료'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
