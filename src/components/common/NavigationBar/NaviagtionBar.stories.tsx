// src/components/navigation/NavigationBar/NavigationBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationBar } from './NavigationBar';

const meta = {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeMenu: '홈',
  },
};

export const ExploreActive: Story = {
  args: {
    activeMenu: '탐색',
  },
};
