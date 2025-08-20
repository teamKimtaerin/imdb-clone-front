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
    rating_total: 3.5,
    review_count: 2456,
    audience: 850000,
    description: '공룡들이 세상을 지배하는 판타지 어드벤처',
    director: '콜린 트레보로우',
    poster_url: '',
    age_rating: '12',
  },
};
