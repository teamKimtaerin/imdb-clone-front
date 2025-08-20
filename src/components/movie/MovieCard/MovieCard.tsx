// src/components/movie/MovieCard/MovieCard.tsx
'use client';

import React, { useState, forwardRef } from 'react';
import { watchaTokens } from '@/styles/tokens';
import { MovieCardProps } from '@/types/movieCardProps';

export const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  (
    {
      _id: _movieId,
      title = '제목 없음',
      categories: _categories = [],
      running_time: _runningTime = 0,
      release_date,
      rating_total = 0,
      review_count = 0,
      audience: _audience = 0,
      trailer_url: _trailerUrl,
      description: _description = '',
      director = { name: '', profile_image: '' },
      is_adult_content = false,
      poster_url,
      age_rating = 'ALL',
      created_at: _createdAt,
      __v: _version,
      rank,
      onClick,
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle: React.CSSProperties = {
      position: 'relative',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    };

    // 포스터 이미지 사용
    const displayImageUrl = poster_url;

    const imageContainerStyle: React.CSSProperties = {
      position: 'relative',
      paddingBottom: '145%',
      background: displayImageUrl
        ? `url(${displayImageUrl})`
        : `linear-gradient(135deg, ${watchaTokens.colors.surface}, ${watchaTokens.colors.border})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: watchaTokens.borderRadius.lg,
      overflow: 'hidden',
    };

    const blurOverlayStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: is_adult_content ? 'blur(8px)' : 'none',
      zIndex: 1,
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
      zIndex: 2,
    };

    const adultBadgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: watchaTokens.spacing.sm,
      right: watchaTokens.spacing.sm,
      background: '#ff4757',
      color: 'white',
      padding: `${watchaTokens.spacing.xs} ${watchaTokens.spacing.sm}`,
      borderRadius: watchaTokens.borderRadius.sm,
      fontSize: watchaTokens.typography.fontSize.xs,
      fontWeight: watchaTokens.typography.fontWeight.bold,
      zIndex: 3,
      backdropFilter: 'blur(4px)',
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

    // 평균 별점 계산: rating_total / review_count
    const averageRating = review_count > 0 ? rating_total / review_count : 0;
    // 0.5 단위로 반올림
    const calculatedRating = Math.round(averageRating * 2) / 2;

    const renderStars = (ratingValue: number) => {
      const stars = [];
      const fullStars = Math.floor(ratingValue);
      const hasHalfStar = ratingValue % 1 === 0.5;

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          // 완전한 별
          stars.push('★');
        } else if (i === fullStars && hasHalfStar) {
          // 반 별 (유니코드 반별 문자 사용)
          stars.push('⭐');
        } else {
          // 빈 별
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
        ref={ref}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div style={imageContainerStyle}>
          {is_adult_content && <div style={blurOverlayStyle}></div>}
          {rank && (
            <div
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                backdropFilter: 'blur(4px)',
                zIndex: 2,
              }}
            >
              #{rank}
            </div>
          )}
          {age_rating === '19+' && <div style={adultBadgeStyle}>19+</div>}
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
                {director?.name && (
                  <div
                    style={{
                      fontSize: watchaTokens.typography.fontSize.xs,
                      color: watchaTokens.colors.text.secondary,
                      marginTop: '2px',
                    }}
                  >
                    감독: {director.name}
                  </div>
                )}
                <div
                  style={{
                    fontSize: watchaTokens.typography.fontSize.xs,
                    color: watchaTokens.colors.text.secondary,
                    marginTop: '4px',
                  }}
                >
                  평점 ★ {averageRating.toFixed(1)} ({review_count}명)
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={titleStyle}>{title}</div>
        <div style={infoStyle}>
          <span style={yearStyle}>{new Date(release_date).getFullYear()}</span>
          <span style={ratingStyle}>{renderStars(calculatedRating)}</span>
        </div>
      </div>
    );
  },
);

MovieCard.displayName = 'MovieCard';
