import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

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
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    rounded: {
      control: 'boolean',
      description: '원형 버튼 (아이콘 전용)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
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

// 원형 버튼 (아이콘용)
export const RoundedButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm" variant="primary" rounded>
        ♥
      </Button>
      <Button size="md" variant="secondary" rounded>
        ⭐
      </Button>
      <Button size="lg" variant="ghost" rounded>
        ⚙
      </Button>
      <Button size="xl" variant="danger" rounded>
        ×
      </Button>
    </div>
  ),
};

// 전체 너비
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Button fullWidth variant="primary" className="mb-2">
        지금 시청하기
      </Button>
      <Button fullWidth variant="secondary">
        나중에 보기
      </Button>
    </div>
  ),
};

// 커스텀 스타일링
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button
        variant="primary"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        그라데이션 버튼
      </Button>
      <Button variant="secondary" className="border-green-500 text-green-500 hover:bg-green-50">
        커스텀 색상
      </Button>
      <Button variant="ghost" className="shadow-lg hover:shadow-xl transition-shadow">
        그림자 효과
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

      {/* 형태별 */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '12px' }}>Shapes</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary">기본 형태</Button>
          <Button variant="primary" rounded>
            ♥
          </Button>
          <Button variant="primary" fullWidth className="max-w-xs">
            전체 너비
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 실제 사용 예시
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 로그인 폼 예시 */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '12px' }}>Login Form</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
          <Button variant="primary" size="lg" fullWidth>
            로그인
          </Button>
          <Button variant="text" size="sm">
            비밀번호를 잊으셨나요?
          </Button>
        </div>
      </div>

      {/* 카드 액션 예시 */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '12px' }}>Card Actions</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" size="md">
            시청하기
          </Button>
          <Button variant="secondary" size="md">
            내 리스트에 추가
          </Button>
          <Button variant="ghost" size="md" rounded>
            ♥
          </Button>
        </div>
      </div>

      {/* 관리자 액션 예시 */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '12px' }}>Admin Actions</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost" size="sm">
            편집
          </Button>
          <Button variant="secondary" size="sm">
            복사
          </Button>
          <Button variant="danger" size="sm">
            삭제
          </Button>
        </div>
      </div>
    </div>
  ),
};
