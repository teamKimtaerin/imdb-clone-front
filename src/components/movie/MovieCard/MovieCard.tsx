// src/components/movie/MovieCard/MovieCard.tsx
'use client';

import React, { useState } from 'react';
import { watchaTokens } from '@/styles/tokens';

interface MovieCardProps {
  title?: string;
  year?: string;
  rating?: number;
  imageUrl?: string | null;
  hasDiscount?: boolean;
  discountPercent?: number;
  onClick?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title = '쥬라기 월드: 새로운 시작',
  year = '2024',
  rating = 3.5,
  imageUrl = null,
  hasDiscount = false,
  discountPercent = 30,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    paddingBottom: '145%',
    background: imageUrl
      ? `url(${imageUrl})`
      : `linear-gradient(135deg, ${watchaTokens.colors.surface}, ${watchaTokens.colors.border})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: watchaTokens.borderRadius.lg,
    overflow: 'hidden',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isHovered ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: watchaTokens.spacing.md,
    transition: 'background 0.3s ease',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: watchaTokens.spacing.sm,
    left: watchaTokens.spacing.sm,
    background: watchaTokens.colors.primary,
    color: watchaTokens.colors.text.primary,
    padding: `${watchaTokens.spacing.xs} ${watchaTokens.spacing.sm}`,
    borderRadius: watchaTokens.borderRadius.sm,
    fontSize: watchaTokens.typography.fontSize.xs,
    fontWeight: watchaTokens.typography.fontWeight.bold,
  };

  const titleStyle: React.CSSProperties = {
    color: watchaTokens.colors.text.primary,
    fontSize: watchaTokens.typography.fontSize.sm,
    fontWeight: watchaTokens.typography.fontWeight.medium,
    marginTop: watchaTokens.spacing.sm,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const infoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: watchaTokens.spacing.sm,
    marginTop: watchaTokens.spacing.xs,
  };

  const yearStyle: React.CSSProperties = {
    color: watchaTokens.colors.text.secondary,
    fontSize: watchaTokens.typography.fontSize.xs,
  };

  const ratingStyle: React.CSSProperties = {
    color: watchaTokens.colors.rating,
    fontSize: watchaTokens.typography.fontSize.xs,
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('☆');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  const hoverInfoStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.8)',
    padding: watchaTokens.spacing.sm,
    borderRadius: watchaTokens.borderRadius.md,
    backdropFilter: 'blur(10px)',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={imageContainerStyle}>
        {hasDiscount && <div style={badgeStyle}>{discountPercent}%</div>}
        <div style={overlayStyle}>
          {isHovered && (
            <div style={hoverInfoStyle}>
              <div
                style={{
                  fontSize: watchaTokens.typography.fontSize.xs,
                  color: watchaTokens.colors.text.primary,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: watchaTokens.typography.fontSize.xs,
                  color: watchaTokens.colors.text.secondary,
                  marginTop: '4px',
                }}
              >
                예상 ★ {rating}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={titleStyle}>{title}</div>
      <div style={infoStyle}>
        <span style={yearStyle}>{year}</span>
        <span style={ratingStyle}>{renderStars(rating)}</span>
      </div>
    </div>
  );
};
