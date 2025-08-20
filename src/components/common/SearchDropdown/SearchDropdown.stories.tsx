// src/components/common/SearchDropdown/SearchDropdown.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchDropdown } from './SearchDropdown';
import { SearchItem } from '@/types/searchDropdown';

const meta = {
  title: 'Common/SearchDropdown',
  component: SearchDropdown,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: '드롭다운 표시 여부',
    },
    query: {
      control: 'text',
      description: '검색어 (하이라이트용)',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '400px',
          margin: '20px auto',
          background: '#000',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        {/* 검색바 모의 */}
        <div
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px 8px 0 0',
            color: '#fff',
            fontSize: '14px',
            marginBottom: '0',
          }}
        >
          작품 제목, 배우, 감독을 검색해보세요
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 데모 데이터
const sampleItems: SearchItem[] = [
  {
    key: '인터스텔라',
    type: 'movie',
    movieIds: ['68a5a4026af113a9dd012649'],
    score: 0.95,
  },
  {
    key: '이토 미키',
    type: 'actor',
    movieIds: ['68a5a3f56af113a9dd012601'],
    score: 0.78,
  },
  {
    key: '옥타비아 스펜서',
    type: 'actor',
    movieIds: ['68a5a3d46af113a9dd012553', '68a5a42f6af113a9dd012745'],
    score: 0.65,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    isVisible: true,
    query: '',
    onItemClick: (item) => {
      console.log('Selected item:', item);
    },
  },
};

export const WithQuery: Story = {
  args: {
    items: sampleItems,
    isVisible: true,
    query: '인터',
    onItemClick: (item) => {
      console.log('Selected item:', item);
    },
  },
};

export const MoviesOnly: Story = {
  args: {
    items: [
      {
        key: '인터스텔라',
        type: 'movie',
        movieIds: ['1'],
        score: 0.95,
      },
      {
        key: '인셉션',
        type: 'movie',
        movieIds: ['2'],
        score: 0.87,
      },
      {
        key: '인크레더블',
        type: 'movie',
        movieIds: ['3'],
        score: 0.82,
      },
    ],
    isVisible: true,
    query: '인',
    onItemClick: (item) => {
      console.log('Selected item:', item);
    },
  },
};

export const ActorsOnly: Story = {
  args: {
    items: [
      {
        key: '이토 미키',
        type: 'actor',
        movieIds: ['1'],
        score: 0.78,
      },
      {
        key: '옥타비아 스펜서',
        type: 'actor',
        movieIds: ['2', '3', '4'],
        score: 0.65,
      },
      {
        key: '이정재',
        type: 'actor',
        movieIds: ['5', '6'],
        score: 0.92,
      },
    ],
    isVisible: true,
    query: '이',
    onItemClick: (item) => {
      console.log('Selected item:', item);
    },
  },
};

export const Empty: Story = {
  args: {
    items: [],
    isVisible: true,
    query: '검색결과없음',
    onItemClick: (item) => {
      console.log('Selected item:', item);
    },
  },
};

export const Hidden: Story = {
  args: {
    items: sampleItems,
    isVisible: false,
    query: '',
    onItemClick: (item) => {
      console.log('Selected item:', item);
    },
  },
};

export const LongList: Story = {
  args: {
    items: [
      { key: '인터스텔라', type: 'movie', movieIds: ['1'], score: 0.95 },
      { key: '인셉션', type: 'movie', movieIds: ['2'], score: 0.92 },
      { key: '인크레더블', type: 'movie', movieIds: ['3'], score: 0.89 },
      { key: '인디아나 존스', type: 'movie', movieIds: ['4'], score: 0.86 },
      { key: '인사이드 아웃', type: 'movie', movieIds: ['5'], score: 0.83 },
      { key: '이토 미키', type: 'actor', movieIds: ['6'], score: 0.8 },
      { key: '이정재', type: 'actor', movieIds: ['7', '8'], score: 0.77 },
      { key: '이병헌', type: 'actor', movieIds: ['9', '10', '11'], score: 0.74 },
      { key: '이민호', type: 'actor', movieIds: ['12'], score: 0.71 },
      { key: '이종석', type: 'actor', movieIds: ['13', '14'], score: 0.68 },
    ],
    isVisible: true,
    query: '인',
    onItemClick: (item) => {
      console.log('Selected item:', item);
    },
  },
};

export const Interactive: Story = {
  args: {
    items: sampleItems,
    isVisible: true,
    query: '',
    onItemClick: (item) => {
      alert(`선택된 항목: ${item.key} (${item.type === 'movie' ? '영화' : '배우'})`);
    },
  },
  play: async ({ canvasElement }) => {
    // 실제 사용자 인터랙션 시뮬레이션을 여기에 추가할 수 있습니다
  },
};
