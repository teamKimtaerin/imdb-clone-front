import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard } from './ReviewCard';

// ReviewCard 컴포넌트의 메타데이터 정의
const meta: Meta<typeof ReviewCard> = {
  title: 'Components/Movie/ReviewCard', // 스토리북 내 메뉴 경로
  component: ReviewCard,
  tags: ['autodocs'],
  argTypes: {
    // Storybook UI에서 제어할 수 있는 props 설정
    review: {
      description: '리뷰 데이터 객체',
    },
    currentUserId: {
      description: '현재 로그인한 사용자의 ID',
    },
    onEdit: {
      description: '수정 버튼 클릭 시 호출되는 함수',
    },
    onDelete: {
      description: '삭제 버튼 클릭 시 호출되는 함수',
    },
    deleteLoading: {
      description: '삭제 요청 중인지 여부',
    },
  },
};

export default meta;

// Storybook에서 사용할 가짜(mock) 리뷰 데이터
const mockReview = {
  _id: '65f6f3b0e3b9c7b9c7b9c7b9',
  title: '인상적인 연출과 스토리!',
  rating: 4.5,
  content:
    '기대 이상으로 재미있었습니다. 특히 주인공의 심리를 섬세하게 묘사하는 연출이 뛰어났고, 반전이 흥미로웠습니다. 다른 사람들에게도 추천하고 싶은 영화입니다.',
  is_spoiler: false,
  user: {
    user_id: 'user123',
    nickname: '영화보는펭귄',
    profile_img_url: 'https://placehold.co/100x100',
  },
  movie: {
    movie_id: 'movie123',
    title: '인터스텔라',
    release_date: '2014-10-26',
    running_time: 169,
    poster_url: 'https://placehold.co/300x450',
  },
  created_at: '2023-08-15T10:00:00Z', // createdAt -> created_at로 수정
};

// 기본 ReviewCard 스토리
export const DefaultReviewCard: StoryObj<typeof ReviewCard> = {
  args: {
    review: mockReview,
  },
};

// 현재 사용자가 작성한 리뷰 스토리
// 수정/삭제 버튼이 표시됨
export const MyReview: StoryObj<typeof ReviewCard> = {
  args: {
    ...DefaultReviewCard.args,
    // 현재 사용자가 이 리뷰를 작성했다고 가정
    currentUserId: 'user123',
    onEdit: (id) => alert(`수정 버튼 클릭: ${id}`),
    onDelete: (id) => alert(`삭제 버튼 클릭: ${id}`),
  },
};

// 다른 사용자가 작성한 리뷰 스토리
// 수정/삭제 버튼이 표시되지 않음
export const OtherUserReview: StoryObj<typeof ReviewCard> = {
  args: {
    ...DefaultReviewCard.args,
    // 현재 사용자가 다른 사용자라고 가정
    currentUserId: 'user999',
    onEdit: undefined, // undefined를 명시적으로 전달
    onDelete: undefined,
  },
};

// 삭제 로딩 상태 스토리
// 삭제 버튼에 로딩 상태가 표시됨
export const DeletingReview: StoryObj<typeof ReviewCard> = {
  args: {
    ...MyReview.args,
    deleteLoading: true,
  },
};
