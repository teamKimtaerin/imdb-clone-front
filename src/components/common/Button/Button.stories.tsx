// src/components/common/Button/Button.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button, IconButton } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'text', 'danger'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    rounded: {
      control: 'boolean',
      description: '원형 버튼 (아이콘 전용)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '시청하기',
  },
};

// Primary 버튼
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '지금 시청하기',
  },
};

// Secondary 버튼
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '예고편 보기',
  },
};

// Ghost 버튼
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '더 보기',
  },
};

// Text 버튼
export const Text: Story = {
  args: {
    variant: 'text',
    children: '건너뛰기',
  },
};

// Danger 버튼
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '삭제',
  },
};

// 크기 변형
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="xs">XS 크기</Button>
      <Button size="sm">SM 크기</Button>
      <Button size="md">MD 크기</Button>
      <Button size="lg">LG 크기</Button>
      <Button size="xl">XL 크기</Button>
    </div>
  ),
};

// 로딩 상태
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button loading>로딩 중...</Button>
      <Button variant="secondary" loading>
        처리 중...
      </Button>
    </div>
  ),
};

// 아이콘 포함
export const WithIcons: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <Button startIcon="▶">재생</Button>
      <Button endIcon="→">다음 에피소드</Button>
      <Button startIcon="+" endIcon="→">
        내 리스트에 추가
      </Button>
    </div>
  ),
};

// 아이콘 버튼
export const IconButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton size="sm" variant="primary">
        ♥
      </IconButton>
      <IconButton size="md" variant="secondary">
        ⭐
      </IconButton>
      <IconButton size="lg" variant="ghost">
        ⚙
      </IconButton>
    </div>
  ),
};

// 전체 너비
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Button fullWidth variant="primary" style={{ marginBottom: '8px' }}>
        지금 시청하기
      </Button>
      <Button fullWidth variant="secondary">
        나중에 보기
      </Button>
    </div>
  ),
};

// 모든 변형 쇼케이스
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 변형별 */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '12px' }}>Variants</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="text">Text</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* 상태별 */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '12px' }}>States</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>

      {/* 크기별 */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '12px' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>
    </div>
  ),
};
