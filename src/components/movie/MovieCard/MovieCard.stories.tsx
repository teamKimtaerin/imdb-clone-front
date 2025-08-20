// src/components/movie/MovieCard/MovieCard.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MovieCard } from './MovieCard';

const meta = {
  title: 'Movie/MovieCard',
  component: MovieCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    _id: '1',
    title: '쥬라기 월드',
    categories: ['액션', '어드벤처'],
    running_time: 124,
    release_date: '2024-06-15',
    rating_total: 8610, // 3.5 * 2456 (평균 평점 * 리뷰 수)
    review_count: 2456,
    audience: 850000,
    description: '공룡들이 세상을 지배하는 판타지 어드벤처',
    director: { name: '콜린 트레보로우' },
    is_adult_content: false,
    poster_url: '',
    age_rating: '12',
  },
};

export const HighRated: Story = {
  args: {
    _id: '2',
    title: '기생충',
    categories: ['드라마', '스릴러'],
    running_time: 132,
    release_date: '2019-05-30',
    rating_total: 22500, // 4.5 * 5000
    review_count: 5000,
    audience: 10085374,
    description: '가족의 꿈을 이루기 위한 기생충의 이야기',
    director: { name: '봉준호' },
    is_adult_content: false,
    poster_url: '',
    age_rating: '15',
  },
};

export const AdultContent: Story = {
  args: {
    _id: '3',
    title: '덱스터',
    categories: ['스릴러', '범죄'],
    running_time: 108,
    release_date: '2023-03-15',
    rating_total: 7200, // 4.0 * 1800
    review_count: 1800,
    audience: 450000,
    description: '연쇄살인마의 심리를 다룬 성인 스릴러',
    director: { name: '클라이드 필립스' },
    is_adult_content: true,
    poster_url: '',
    age_rating: '18',
  },
};

export const WithRank: Story = {
  args: {
    _id: '4',
    title: '어벤져스: 엔드게임',
    categories: ['액션', 'SF'],
    running_time: 181,
    release_date: '2019-04-24',
    rating_total: 20000, // 4.0 * 5000
    review_count: 5000,
    audience: 13934592,
    description: '마블 유니버스의 대서사시',
    director: { name: '루소 형제' },
    is_adult_content: false,
    poster_url: '',
    age_rating: '12',
    rank: 1,
  },
};

export const LowRated: Story = {
  args: {
    _id: '5',
    title: '저예산 B급 영화',
    categories: ['코미디'],
    running_time: 85,
    release_date: '2023-01-10',
    rating_total: 1000, // 2.0 * 500
    review_count: 500,
    audience: 15000,
    description: '예산이 부족했지만 정성이 가득한 영화',
    director: { name: '무명 감독' },
    is_adult_content: false,
    poster_url: '',
    age_rating: 'ALL',
  },
};
