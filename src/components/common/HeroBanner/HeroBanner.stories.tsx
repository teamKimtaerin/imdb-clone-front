// src/components/banner/HeroBanner/HeroBanner.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { HeroBanner } from './HeroBanner';

const meta = {
  title: 'Banner/HeroBanner',
  component: HeroBanner,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '28일 후',
    subtitle: '시작된 혼란, 28년 후 되살아난 공포',
    discount: '30%',
  },
};

export const JurassicWorld: Story = {
  args: {
    title: '쥬라기 월드',
    subtitle: '지구 최상위 포식자의 대결! 오픈 기념 30% 할인',
    discount: '40%',
  },
};
