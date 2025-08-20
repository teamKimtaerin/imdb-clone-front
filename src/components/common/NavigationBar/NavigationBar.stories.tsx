// src/components/common/NavigationBar/NavigationBar.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavigationBar } from './NavigationBar';

const meta = {
  title: 'Common/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
  argTypes: {
    activeMenu: {
      control: 'select',
      options: ['홈', '탐색', '평가', '보고싶어요', '프로필'],
      description: '현재 활성화된 메뉴',
    },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeMenu: '홈',
    onSearch: (query) => {
      console.log('Search:', query);
    },
    onMenuClick: (menu) => {
      console.log('Menu clicked:', menu);
    },
  },
};

export const SearchFocused: Story = {
  args: {
    activeMenu: '홈',
    onSearch: (query) => {
      console.log('Search:', query);
    },
    onMenuClick: (menu) => {
      console.log('Menu clicked:', menu);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const searchInput = canvas.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  },
};

export const WithSearchResults: Story = {
  args: {
    activeMenu: '탐색',
    onSearch: (query) => {
      console.log('Search:', query);
    },
    onMenuClick: (menu) => {
      console.log('Menu clicked:', menu);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const searchInput = canvas.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.value = '인터';
      // 입력 이벤트 발생시키기
      const event = new Event('input', { bubbles: true });
      searchInput.dispatchEvent(event);
    }
  },
};

export const Mobile: Story = {
  args: {
    activeMenu: '홈',
    onSearch: (query) => {
      console.log('Search:', query);
    },
    onMenuClick: (menu) => {
      console.log('Menu clicked:', menu);
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
