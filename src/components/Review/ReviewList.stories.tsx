import type { Meta, StoryObj } from '@storybook/react';
import { ReviewList } from './ReviewList';
import { Review } from '@/types/review';

// Mock useReviews hook
const mockUseReviews = {
  reviews: [
    {
      _id: '1',
      title: '최고의 영화!',
      rating: 5,
      content: '정말 재미있었어요. 강력 추천합니다!',
      user: { nickname: '영화매니아' },
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      _id: '2',
      title: '괜찮은 영화',
      rating: 3.5,
      content: '볼만했지만 아쉬운 부분도 있었어요.',
      user: { nickname: '영화평론가' },
      created_at: '2024-01-14T15:30:00Z',
    },
  ],
  loading: false,
  error: null,
  hasMore: true,
  loadMore: () => {},
  createReview: async () => ({}) as Review,
  updateReview: async () => ({}) as Review,
  deleteReview: async () => {},
  mutationLoading: false,
};

const meta: Meta<typeof ReviewList> = {
  title: 'Components/Movie/ReviewList',
  component: ReviewList,
  tags: ['autodocs'],
  parameters: {
    // Mock the useReviews hook for all stories
    mockData: {
      useReviews: mockUseReviews,
    },
  },
  argTypes: {
    movieId: {
      description: '영화 ID',
    },
    currentUserId: {
      description: '현재 로그인한 사용자의 ID',
    },
  },
};

export default meta;

// 기본 리뷰 목록
export const DefaultReviewList: StoryObj<typeof ReviewList> = {
  args: {
    movieId: 'movie123',
  },
};

// 로그인한 사용자 (리뷰 작성 가능)
export const LoggedInUser: StoryObj<typeof ReviewList> = {
  args: {
    movieId: 'movie123',
    currentUserId: 'user123',
  },
};

// 로딩 상태
export const LoadingState: StoryObj<typeof ReviewList> = {
  args: {
    movieId: 'movie123',
  },
  parameters: {
    mockData: {
      useReviews: {
        ...mockUseReviews,
        loading: true,
        reviews: [],
      },
    },
  },
};

// 에러 상태
export const ErrorState: StoryObj<typeof ReviewList> = {
  args: {
    movieId: 'movie123',
  },
  parameters: {
    mockData: {
      useReviews: {
        ...mockUseReviews,
        error: '리뷰를 불러오는 중 오류가 발생했습니다.',
        reviews: [],
      },
    },
  },
};

// 빈 리뷰 목록
export const EmptyReviews: StoryObj<typeof ReviewList> = {
  args: {
    movieId: 'movie123',
    currentUserId: 'user123',
  },
  parameters: {
    mockData: {
      useReviews: {
        ...mockUseReviews,
        reviews: [],
        hasMore: false,
      },
    },
  },
};
