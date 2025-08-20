// src/components/common/Footer/Footer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { SimpleFooter } from './Footer';

const meta: Meta<typeof SimpleFooter> = {
  title: 'Common/Footer',
  component: SimpleFooter,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SimpleFooter>;

// 기본 Footer
export const Default: Story = {};

// 커스텀 팀 이름과 GitHub
export const CustomTeam: Story = {
  args: {
    teamName: 'My Awesome Team',
    githubUrl: 'https://github.com/myteam',
    copyrightYear: 2024,
    description: 'Building amazing web experiences with Next.js',
  },
};

// 커스텀 섹션
// export const CustomSections: Story = {
//   args: {
//     sections: [
//       {
//         title: '서비스',
//         links: [
//           { label: '영화', href: '/movies' },
//           { label: 'TV 프로그램', href: '/tv' },
//           { label: '웹툰', href: '/webtoon' },
//           { label: '도서', href: '/books' }
//         ]
//       },
//       {
//         title: '이용 안내',
//         links: [
//           { label: '요금제', href: '/pricing' },
//           { label: '이용 약관', href: '/terms' },
//           { label: '개인정보 처리방침', href: '/privacy' },
//           { label: '청소년 보호정책', href: '/youth' }
//         ]
//       },
//       {
//         title: '고객 지원',
//         links: [
//           { label: '고객센터', href: '/support' },
//           { label: 'FAQ', href: '/faq' },
//           { label: '1:1 문의', href: '/contact' },
//           { label: '공지사항', href: '/notice' }
//         ]
//       },
//       {
//         title: '회사',
//         links: [
//           { label: '회사 소개', href: '/about' },
//           { label: '인재 채용', href: '/careers' },
//           { label: '제휴 제안', href: '/partnership' },
//           { label: '투자 정보', href: '/investors' }
//         ]
//       }
//     ],
//     socialLinks: {
//       github: 'https://github.com/watcha',
//       linkedin: 'https://linkedin.com/company/watcha',
//       twitter: 'https://twitter.com/watcha',
//       instagram: 'https://instagram.com/watcha'
//     }
//   }
// };

// 심플 Footer
export const Simple: Story = {
  render: () => <SimpleFooter />,
};

// 다크 테마
export const DarkTheme: Story = {
  args: {
    style: {
      background: '#0a0a0a',
      borderTopColor: '#1a1a1a',
    },
  },
};

// 모든 변형
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        background: '#000',
        padding: '20px',
      }}
    >
      <div>
        <h3 style={{ color: '#fff', marginBottom: '20px' }}>Simple Footer</h3>
        <SimpleFooter />
      </div>
    </div>
  ),
};
