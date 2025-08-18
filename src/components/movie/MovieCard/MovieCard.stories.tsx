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
    title: '쥬라기 월드',
    year: '2024',
    rating: 3.5,
  },
};

export const WithDiscount: Story = {
  args: {
    title: '28일 후',
    hasDiscount: true,
    discountPercent: 30,
  },
};
