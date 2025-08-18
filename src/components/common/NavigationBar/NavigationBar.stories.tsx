// src/components/common/NavigationBar/NavigationBar.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';

// 임시로 간단한 NavigationBar 컴포넌트 정의
const SimpleNavigationBar = () => {
  return (
    <nav
      style={{
        background: '#000',
        padding: '16px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{ color: '#ff0558', fontSize: '24px', fontWeight: 'bold' }}>WATCHA</div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <span>홈</span>
        <span>탐색</span>
      </div>
      <input
        type="text"
        placeholder="검색..."
        style={{
          marginLeft: 'auto',
          padding: '8px 16px',
          borderRadius: '20px',
          border: 'none',
          background: '#1c1c1c',
          color: '#fff',
        }}
      />
      <button
        style={{
          padding: '8px 16px',
          background: '#ff0558',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
        }}
      >
        로그인
      </button>
    </nav>
  );
};

const meta: Meta = {
  title: 'Navigation/NavigationBar',
  component: SimpleNavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
