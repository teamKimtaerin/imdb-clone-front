// src/components/common/Footer/Footer.tsx
'use client';

import React from 'react';
import { watchaTokens } from '@/styles/tokens';
import { FooterProps } from '@/types/footer';

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
