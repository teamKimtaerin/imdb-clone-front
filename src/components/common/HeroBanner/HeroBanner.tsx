// src/components/common/HeroBanner/HeroBanner.tsx
'use client';

import React, { useState } from 'react';
import { watchaTokens } from '@/styles/tokens';
import { HeroBannerProps } from '@/types/heroBanner';

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = '28일 후',
  subtitle = '시작된 혼란, 28년 후 되살아난 공포',
  discount = '30%',
  backgroundImage = null,
  onButtonClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const bannerStyle: React.CSSProperties = {
    position: 'relative',
    height: '400px',
    background: backgroundImage
      ? `linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${backgroundImage})`
      : `linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%),
         linear-gradient(135deg, #1a1a1a, #2a2a2a)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: watchaTokens.borderRadius.xl,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${watchaTokens.spacing.xl}`,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '500px',
    zIndex: 2,
    position: 'relative',
  };

  const discountBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: watchaTokens.colors.primary,
    color: watchaTokens.colors.text.primary,
    padding: `${watchaTokens.spacing.xs} ${watchaTokens.spacing.sm}`,
    borderRadius: watchaTokens.borderRadius.md,
    fontSize: watchaTokens.typography.fontSize.sm,
    fontWeight: watchaTokens.typography.fontWeight.bold,
    marginBottom: watchaTokens.spacing.md,
  };

  const titleStyle: React.CSSProperties = {
    color: watchaTokens.colors.text.primary,
    fontSize: '48px',
    fontWeight: watchaTokens.typography.fontWeight.bold,
    marginBottom: watchaTokens.spacing.sm,
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    margin: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    color: watchaTokens.colors.text.secondary,
    fontSize: watchaTokens.typography.fontSize.lg,
    marginBottom: watchaTokens.spacing.lg,
    margin: 0,
  };

  const buttonStyle: React.CSSProperties = {
    padding: `${watchaTokens.spacing.md} ${watchaTokens.spacing.xl}`,
    background: isButtonHovered ? watchaTokens.colors.primaryDark : watchaTokens.colors.primary,
    color: watchaTokens.colors.text.primary,
    border: 'none',
    borderRadius: watchaTokens.borderRadius.pill,
    fontSize: watchaTokens.typography.fontSize.base,
    fontWeight: watchaTokens.typography.fontWeight.bold,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isButtonHovered ? 'scale(1.1)' : 'scale(1)',
  };

  return (
    <div
      style={bannerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={contentStyle}>
        {discount && <div style={discountBadgeStyle}>{discount} 할인</div>}
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
        <button
          style={buttonStyle}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick?.();
          }}
        >
          지금 시청하기 →
        </button>
      </div>
    </div>
  );
};
