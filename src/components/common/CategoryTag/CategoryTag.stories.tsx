// src/components/category/CategoryTag/CategoryTag.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryTag } from './CategoryTag';

const meta = {
  title: 'Category/CategoryTag',
  component: CategoryTag,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof CategoryTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '액션',
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    label: '로맨스',
    isActive: true,
  },
};
