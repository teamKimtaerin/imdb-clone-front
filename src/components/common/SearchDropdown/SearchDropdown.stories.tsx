// src/components/common/SearchDropdown/SearchDropdown.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchDropdown } from './SearchDropdown';
import { SearchItem } from '@/types/search';

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
    key_display: '인터스텔라',
    key_type: 'movie',
    key_norm: '인터스텔라',
    key_jamo_full: 'ㅇㅣㄴㅌㅓㅅㅡㅌㅔㄹㄹㅏ',
    key_initials: 'ㅇㅌㅅㅌㄹ',
    movieIds: ['68a5a4026af113a9dd012649'],
  },
  {
    key_display: '이토 미키',
    key_type: 'actor',
    key_norm: '이토미키',
    key_jamo_full: 'ㅇㅣㅌㅗㅁㅣㅋㅣ',
    key_initials: 'ㅇㅌㅁㅋ',
    movieIds: ['68a5a3f56af113a9dd012601'],
  },
  {
    key_display: '옥타비아 스펜서',
    key_type: 'actor',
    key_norm: '옥타비아스펜서',
    key_jamo_full: 'ㅇㅗㄱㅌㅏㅂㅣㅇㅏㅅㅡㅍㅓㄴㅅㅓ',
    key_initials: 'ㅇㅌㅂㅇㅅㅍㅅ',
    movieIds: ['68a5a3d46af113a9dd012553', '68a5a42f6af113a9dd012745'],
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
        key_display: '인터스텔라',
        key_type: 'movie',
        key_norm: '인터스텔라',
        key_jamo_full: 'ㅇㅣㄴㅌㅓㅅㅡㅌㅔㄹㄹㅏ',
        key_initials: 'ㅇㅌㅅㅌㄹ',
        movieIds: ['1'],
      },
      {
        key_display: '인셉션',
        key_type: 'movie',
        key_norm: '인셉션',
        key_jamo_full: 'ㅇㅣㄴㅅㅓㅂㅅㅕㄴ',
        key_initials: 'ㅇㅅㅅ',
        movieIds: ['2'],
      },
      {
        key_display: '인크레더블',
        key_type: 'movie',
        key_norm: '인크레더블',
        key_jamo_full: 'ㅇㅣㄴㅋㅡㄹㅔㄷㅓㅂㅡㄹ',
        key_initials: 'ㅇㅋㄹㄷㅂ',
        movieIds: ['3'],
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
        key_display: '이토 미키',
        key_type: 'actor',
        key_norm: '이토미키',
        key_jamo_full: 'ㅇㅣㅌㅗㅁㅣㅋㅣ',
        key_initials: 'ㅇㅌㅁㅋ',
        movieIds: ['1'],
      },
      {
        key_display: '옥타비아 스펜서',
        key_type: 'actor',
        key_norm: '옥타비아스펜서',
        key_jamo_full: 'ㅇㅗㄱㅌㅏㅂㅣㅇㅏㅅㅡㅍㅓㄴㅅㅓ',
        key_initials: 'ㅇㅌㅂㅇㅅㅍㅅ',
        movieIds: ['2', '3', '4'],
      },
      {
        key_display: '이정재',
        key_type: 'actor',
        key_norm: '이정재',
        key_jamo_full: 'ㅇㅣㅈㅓㅇㅈㅐ',
        key_initials: 'ㅇㅈㅈ',
        movieIds: ['5', '6'],
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
      {
        key_display: '인터스텔라',
        key_type: 'movie',
        key_norm: '인터스텔라',
        key_jamo_full: 'ㅇㅣㄴㅌㅓㅅㅡㅌㅔㄹㄹㅏ',
        key_initials: 'ㅇㅌㅅㅌㄹ',
        movieIds: ['1'],
      },
      {
        key_display: '인셉션',
        key_type: 'movie',
        key_norm: '인셉션',
        key_jamo_full: 'ㅇㅣㄴㅅㅓㅂㅅㅕㄴ',
        key_initials: 'ㅇㅅㅅ',
        movieIds: ['2'],
      },
      {
        key_display: '인크레더블',
        key_type: 'movie',
        key_norm: '인크레더블',
        key_jamo_full: 'ㅇㅣㄴㅋㅡㄹㅔㄷㅓㅂㅡㄹ',
        key_initials: 'ㅇㅋㄹㄷㅂ',
        movieIds: ['3'],
      },
      {
        key_display: '인디아나 존스',
        key_type: 'movie',
        key_norm: '인디아나존스',
        key_jamo_full: 'ㅇㅣㄴㄷㅣㅇㅏㄴㅏㅈㅗㄴㅅㅡ',
        key_initials: 'ㅇㄷㅇㄴㅈㅅ',
        movieIds: ['4'],
      },
      {
        key_display: '인사이드 아웃',
        key_type: 'movie',
        key_norm: '인사이드아웃',
        key_jamo_full: 'ㅇㅣㄴㅅㅏㅇㅣㄷㅡㅇㅏㅇㅜㅅ',
        key_initials: 'ㅇㅅㅇㄷㅇㅇ',
        movieIds: ['5'],
      },
      {
        key_display: '이토 미키',
        key_type: 'actor',
        key_norm: '이토미키',
        key_jamo_full: 'ㅇㅣㅌㅗㅁㅣㅋㅣ',
        key_initials: 'ㅇㅌㅁㅋ',
        movieIds: ['6'],
      },
      {
        key_display: '이정재',
        key_type: 'actor',
        key_norm: '이정재',
        key_jamo_full: 'ㅇㅣㅈㅓㅇㅈㅐ',
        key_initials: 'ㅇㅈㅈ',
        movieIds: ['7', '8'],
      },
      {
        key_display: '이병헌',
        key_type: 'actor',
        key_norm: '이병헌',
        key_jamo_full: 'ㅇㅣㅂㅕㅇㅎㅓㄴ',
        key_initials: 'ㅇㅂㅎ',
        movieIds: ['9', '10', '11'],
      },
      {
        key_display: '이민호',
        key_type: 'actor',
        key_norm: '이민호',
        key_jamo_full: 'ㅇㅣㅁㅣㄴㅎㅗ',
        key_initials: 'ㅇㅁㅎ',
        movieIds: ['12'],
      },
      {
        key_display: '이종석',
        key_type: 'actor',
        key_norm: '이종석',
        key_jamo_full: 'ㅇㅣㅈㅗㅇㅅㅓㄱ',
        key_initials: 'ㅇㅈㅅ',
        movieIds: ['13', '14'],
      },
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
      alert(
        `선택된 항목: ${item.key_display} (${item.key_type === 'movie' ? '영화' : item.key_type === 'actor' ? '배우' : '감독'})`,
      );
    },
  },
  play: async ({ canvasElement: _canvasElement }) => {
    // 실제 사용자 인터랙션 시뮬레이션을 여기에 추가할 수 있습니다
  },
};
