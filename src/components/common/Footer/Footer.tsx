// src/components/common/Footer/Footer.tsx
'use client';

import React from 'react';
import { watchaTokens } from '@/styles/tokens';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  /** 팀/회사 이름 */
  teamName?: string;
  /** GitHub URL */
  githubUrl?: string;
  /** 저작권 연도 */
  copyrightYear?: number;
  /** 추가 설명 텍스트 */
  description?: string;
  /** Footer 섹션 데이터 */
  sections?: FooterSection[];
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
}

// 간단한 Footer 버전
export const SimpleFooter: React.FC<
  Pick<FooterProps, 'teamName' | 'githubUrl' | 'copyrightYear' | 'description' | 'style'>
> = ({
  teamName = 'KIMTAERIN TEAM',
  githubUrl = 'https://github.com/teamKimtaerin',
  copyrightYear = new Date().getFullYear(),
  description = '왓챠 클론 코딩 페이지',
  style,
}) => {
  const styles = {
    footer: {
      background: watchaTokens.colors.surface,
      borderTop: `1px solid ${watchaTokens.colors.border}`,
      padding: `${watchaTokens.spacing.lg} ${watchaTokens.spacing.lg}`,
      textAlign: 'center' as const,
      fontFamily: watchaTokens.typography.fontFamily,
      ...style,
    },
    text: {
      color: watchaTokens.colors.text.secondary,
      fontSize: watchaTokens.typography.fontSize.sm,
      margin: 0,
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {copyrightYear} {teamName}. All rights reserved.
      </p>
      <p style={styles.text}>{description}</p>
      <p style={styles.text}>{githubUrl}</p>
    </footer>
  );
};

// export const Footer: React.FC<FooterProps> = ({
//   teamName = 'KIMTAERIN TEAM',
//   githubUrl = 'https://github.com/kimtaerin',
//   copyrightYear = new Date().getFullYear(),
//   description = '이 프로젝트는 학습 목적으로 제작된 왓챠 클론 프로젝트입니다.',
//   sections,
//   socialLinks,
//   style
// }) => {
//   // 기본 섹션 데이터
//   const defaultSections: FooterSection[] = [
//     {
//       title: teamName,
//       links: [
//         { label: '팀 소개', href: '/about' },
//         { label: '프로젝트 정보', href: '/project' },
//         { label: '문의하기', href: '/contact' },
//         { label: '채용 정보', href: '/careers' }
//       ]
//     },
//     {
//       title: 'GitHub',
//       links: [
//         { label: 'GitHub Profile', href: githubUrl, external: true },
//         { label: '프로젝트 저장소', href: `${githubUrl}/watcha-clone`, external: true },
//         { label: '이슈 트래커', href: `${githubUrl}/watcha-clone/issues`, external: true },
//         { label: '기여 가이드', href: `${githubUrl}/watcha-clone/blob/main/CONTRIBUTING.md`, external: true }
//       ]
//     },
//     {
//       title: '기술 스택',
//       links: [
//         { label: 'Next.js 14', href: 'https://nextjs.org', external: true },
//         { label: 'TypeScript', href: 'https://www.typescriptlang.org', external: true },
//         { label: 'Tailwind CSS', href: 'https://tailwindcss.com', external: true },
//         { label: 'Storybook', href: 'https://storybook.js.org', external: true }
//       ]
//     },
//     {
//       title: '리소스',
//       links: [
//         { label: '개발 블로그', href: '/blog' },
//         { label: 'API 문서', href: '/docs/api' },
//         { label: '디자인 시스템', href: '/design-system' },
//         { label: '릴리즈 노트', href: '/releases' }
//       ]
//     }
//   ];

//   const footerSections = sections || defaultSections;

//   const styles = {
//     footer: {
//       background: watchaTokens.colors.surface,
//       borderTop: `1px solid ${watchaTokens.colors.border}`,
//       padding: `${watchaTokens.spacing.xl} ${watchaTokens.spacing.lg}`,
//       marginTop: 'auto',
//       fontFamily: watchaTokens.typography.fontFamily,
//       ...style
//     } as React.CSSProperties,

//     container: {
//       maxWidth: '1400px',
//       margin: '0 auto'
//     } as React.CSSProperties,

//     content: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: watchaTokens.spacing.xl,
//       marginBottom: watchaTokens.spacing.xl
//     } as React.CSSProperties,

//     section: {
//       display: 'flex',
//       flexDirection: 'column' as const,
//       gap: watchaTokens.spacing.sm
//     } as React.CSSProperties,

//     sectionTitle: {
//       fontSize: watchaTokens.typography.fontSize.base,
//       fontWeight: watchaTokens.typography.fontWeight.bold,
//       color: watchaTokens.colors.text.primary,
//       marginBottom: watchaTokens.spacing.sm
//     } as React.CSSProperties,

//     link: {
//       color: watchaTokens.colors.text.secondary,
//       textDecoration: 'none',
//       fontSize: watchaTokens.typography.fontSize.sm,
//       transition: 'color 0.2s ease',
//       cursor: 'pointer',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: watchaTokens.spacing.xs
//     } as React.CSSProperties,

//     socialContainer: {
//       display: 'flex',
//       gap: watchaTokens.spacing.md,
//       marginTop: watchaTokens.spacing.lg,
//       paddingTop: watchaTokens.spacing.lg,
//       borderTop: `1px solid ${watchaTokens.colors.border}`
//     } as React.CSSProperties,

//     socialLink: {
//       width: '40px',
//       height: '40px',
//       borderRadius: watchaTokens.borderRadius.full,
//       background: watchaTokens.colors.surfaceHover,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: watchaTokens.colors.text.secondary,
//       textDecoration: 'none',
//       transition: 'all 0.2s ease',
//       cursor: 'pointer'
//     } as React.CSSProperties,

//     copyright: {
//       textAlign: 'center' as const,
//       color: watchaTokens.colors.text.tertiary,
//       fontSize: watchaTokens.typography.fontSize.xs,
//       paddingTop: watchaTokens.spacing.xl,
//       marginTop: watchaTokens.spacing.xl,
//       borderTop: `1px solid ${watchaTokens.colors.border}`
//     } as React.CSSProperties,

//     copyrightText: {
//       margin: 0,
//       lineHeight: 1.6
//     } as React.CSSProperties,

//     description: {
//       marginTop: watchaTokens.spacing.sm,
//       opacity: 0.8
//     } as React.CSSProperties
//   };

//   // 소셜 아이콘 컴포넌트
//   const SocialIcon = ({ type }: { type: string }) => {
//     const icons: Record<string, string> = {
//       github: 'G',
//       linkedin: 'in',
//       twitter: 'X',
//       instagram: 'IG',
//       facebook: 'f',
//       youtube: '▶'
//     };

//     return <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{icons[type]}</span>;
//   };

//   return (
//     <footer style={styles.footer}>
//       <div style={styles.container}>
//         {/* Main Footer Content */}
//         <div style={styles.content}>
//           {footerSections.map((section, index) => (
//             <div key={index} style={styles.section}>
//               <h3 style={styles.sectionTitle}>{section.title}</h3>
//               {section.links.map((link, linkIndex) => (

//                   key={linkIndex}
//                   href={link.href}
//                   target={link.external ? '_blank' : undefined}
//                   rel={link.external ? 'noopener noreferrer' : undefined}
//                   style={styles.link}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = watchaTokens.colors.primary;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = watchaTokens.colors.text.secondary;
//                   }}
//                 >
//                   {link.label}
//                   {link.external && (
//                     <span style={{ fontSize: '10px' }}>↗</span>
//                   )}
//                 </a>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Social Links */}
//         {socialLinks && Object.keys(socialLinks).length > 0 && (
//           <div style={styles.socialContainer}>
//             {Object.entries(socialLinks).map(([platform, url]) => (
//               url && (

//                   key={platform}
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={styles.socialLink}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = watchaTokens.colors.primary;
//                     e.currentTarget.style.color = watchaTokens.colors.text.primary;
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = watchaTokens.colors.surfaceHover;
//                     e.currentTarget.style.color = watchaTokens.colors.text.secondary;
//                     e.currentTarget.style.transform = 'translateY(0)';
//                   }}
//                   aria-label={`Visit our ${platform}`}
//                 >
//                   <SocialIcon type={platform} />
//                 </a>
//               )
//             ))}
//           </div>
//         )}

//         {/* Copyright */}
//         <div style={styles.copyright}>
//           <p style={styles.copyrightText}>
//             © {copyrightYear} {teamName}. All rights reserved.
//           </p>
//           {description && (
//             <p style={{ ...styles.copyrightText, ...styles.description }}>
//               {description}
//             </p>
//           )}
//         </div>
//       </div>
//     </footer>
//   );
// };
