// src/components/common/WatchaStorybook/WatchaStorybook.tsx
'use client';

import React, { useState } from 'react';
import { watchaTokens } from '@/styles/tokens';
import { NavigationBar } from '@/components/common/NavigationBar';
import { MovieCard } from '@/components/movie/MovieCard';
import { CategoryTag } from '@/components/common/CategoryTag';
import { HeroBanner } from '@/components/common/HeroBanner';
import { Button } from '@/components/common/Button';

export default function WatchaStorybook() {
  const [selectedComponent, setSelectedComponent] = useState('NavigationBar');
  const [activeCategory, setActiveCategory] = useState('액션');
  const [props, setProps] = useState({
    rating: 3.5,
    hasDiscount: true,
    discountPercent: 30,
  });

  const components = [
    'NavigationBar',
    'MovieCard',
    'CategoryTag',
    'HeroBanner',
    'Button',
    'AllComponents',
  ];

  const categories = ['액션', '로맨스', '코미디', 'SF', '공포', '스릴러', '판타지', '다큐'];

  // TypeScript 타입 수정: React.CSSProperties 추가
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: watchaTokens.colors.background,
    fontFamily: watchaTokens.typography.fontFamily,
  };

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '250px',
    background: watchaTokens.colors.surface,
    borderRight: `1px solid ${watchaTokens.colors.border}`,
    padding: watchaTokens.spacing.lg,
    overflowY: 'auto',
  };

  const mainStyle: React.CSSProperties = {
    marginLeft: '250px',
    padding: watchaTokens.spacing.xl,
  };

  const titleStyle: React.CSSProperties = {
    color: watchaTokens.colors.primary,
    fontSize: watchaTokens.typography.fontSize.xl,
    fontWeight: watchaTokens.typography.fontWeight.bold,
    marginBottom: watchaTokens.spacing.lg,
  };

  // 함수 파라미터 타입 추가
  const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'block',
    padding: watchaTokens.spacing.sm,
    color: isActive ? watchaTokens.colors.primary : watchaTokens.colors.text.secondary,
    background: isActive ? watchaTokens.colors.surfaceHover : 'transparent',
    borderRadius: watchaTokens.borderRadius.md,
    marginBottom: watchaTokens.spacing.xs,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: watchaTokens.typography.fontSize.sm,
  });

  const sectionStyle: React.CSSProperties = {
    marginBottom: watchaTokens.spacing.xl,
    padding: watchaTokens.spacing.lg,
    background: watchaTokens.colors.surface,
    borderRadius: watchaTokens.borderRadius.xl,
    border: `1px solid ${watchaTokens.colors.border}`,
  };

  const sectionTitleStyle: React.CSSProperties = {
    color: watchaTokens.colors.text.primary,
    fontSize: watchaTokens.typography.fontSize.lg,
    fontWeight: watchaTokens.typography.fontWeight.bold,
    marginBottom: watchaTokens.spacing.md,
  };

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: watchaTokens.spacing.md,
    padding: watchaTokens.spacing.md,
    background: watchaTokens.colors.background,
    borderRadius: watchaTokens.borderRadius.lg,
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'NavigationBar':
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>네비게이션 바</h2>
            <div
              style={{ margin: `-${watchaTokens.spacing.lg}`, marginTop: watchaTokens.spacing.md }}
            >
              <NavigationBar />
            </div>
          </div>
        );

      case 'MovieCard':
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>영화 카드</h2>

            <div style={controlsStyle}>
              <label style={{ color: watchaTokens.colors.text.secondary }}>
                평점: {props.rating}
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={props.rating}
                  onChange={(e) => setProps({ ...props, rating: parseFloat(e.target.value) })}
                  style={{ width: '100%', marginLeft: watchaTokens.spacing.sm }}
                />
              </label>

              <label style={{ color: watchaTokens.colors.text.secondary }}>
                <input
                  type="checkbox"
                  checked={props.hasDiscount}
                  onChange={(e) => setProps({ ...props, hasDiscount: e.target.checked })}
                  style={{ marginRight: watchaTokens.spacing.sm }}
                />
                할인 표시
              </label>

              {props.hasDiscount && (
                <label style={{ color: watchaTokens.colors.text.secondary }}>
                  할인율: {props.discountPercent}%
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="10"
                    value={props.discountPercent}
                    onChange={(e) =>
                      setProps({ ...props, discountPercent: parseInt(e.target.value) })
                    }
                    style={{ width: '100%', marginLeft: watchaTokens.spacing.sm }}
                  />
                </label>
              )}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: watchaTokens.spacing.md,
                marginTop: watchaTokens.spacing.lg,
              }}
            >
              <MovieCard {...props} title="쥬라기 월드" year={2010} />
              <MovieCard {...props} title="28일 후" year={2025} />
              <MovieCard {...props} title="아바타 3" year={2012} rating={4.5} />
              <MovieCard {...props} title="듄: 파트3" year={2018} />
            </div>
          </div>
        );

      case 'CategoryTag':
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>카테고리 태그</h2>
            <div style={{ display: 'flex', gap: watchaTokens.spacing.sm, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <CategoryTag
                  key={cat}
                  label={cat}
                  isActive={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>
        );

      case 'HeroBanner':
        return (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>히어로 배너</h2>
            <HeroBanner />
            <div style={{ marginTop: watchaTokens.spacing.md }}>
              <HeroBanner
                title="쥬라기 월드"
                subtitle="지구 최상위 포식자의 대결! 오픈 기념 30% 할인"
                discount="30%"
              />
            </div>
          </div>
        );
      case 'Button':
        return (
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
                <Button loading>Loading</Button>
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
          </div>
        );

      case 'AllComponents':
        return (
          <>
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>전체 컴포넌트 쇼케이스</h2>
            </div>

            <div style={{ margin: `0 -${watchaTokens.spacing.xl}` }}>
              <NavigationBar />
            </div>

            <div style={{ ...sectionStyle, marginTop: watchaTokens.spacing.xl }}>
              <h3 style={sectionTitleStyle}>카테고리</h3>
              <div style={{ display: 'flex', gap: watchaTokens.spacing.sm, flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <CategoryTag
                    key={cat}
                    label={cat}
                    isActive={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  />
                ))}
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>히어로 배너</h3>
              <HeroBanner />
            </div>

            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>영화 목록</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: watchaTokens.spacing.lg,
                }}
              >
                {[
                  { title: '쥬라기 월드: 새로운 시작', year: 2012, rating: 4.0, hasDiscount: true },
                  {
                    title: '28일 후',
                    year: 2012,
                    ating: 4.5,
                    hasDiscount: true,
                    discountPercent: 30,
                  },
                  { title: '아바타: 물의 길', year: 2012, rating: 4.2 },
                  { title: '듄: 파트 2', year: 2012, rating: 4.8 },
                  { title: '오펜하이머', year: 2012, rating: 4.6 },
                  { title: '바비', year: 2012, rating: 3.9 },
                ].map((movie, idx) => (
                  <MovieCard key={idx} {...movie} />
                ))}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      {/* 사이드바 */}
      <div style={sidebarStyle}>
        <h1 style={titleStyle}>🎬 스토리북</h1>
        <div style={{ marginBottom: watchaTokens.spacing.lg }}>
          <div
            style={{
              color: watchaTokens.colors.text.secondary,
              fontSize: watchaTokens.typography.fontSize.xs,
              marginBottom: watchaTokens.spacing.sm,
            }}
          >
            컴포넌트 목록
          </div>
          {components.map((comp) => (
            <div
              key={comp}
              style={menuItemStyle(selectedComponent === comp)}
              onClick={() => setSelectedComponent(comp)}
              onMouseEnter={(e) => {
                if (selectedComponent !== comp) {
                  const target = e.target as HTMLElement;
                  target.style.background = watchaTokens.colors.surfaceHover;
                  target.style.color = watchaTokens.colors.text.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedComponent !== comp) {
                  const target = e.target as HTMLElement;
                  target.style.background = 'transparent';
                  target.style.color = watchaTokens.colors.text.secondary;
                }
              }}
            >
              {comp === 'AllComponents' ? '📋 전체 보기' : comp}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: watchaTokens.spacing.xl,
            paddingTop: watchaTokens.spacing.lg,
            borderTop: `1px solid ${watchaTokens.colors.border}`,
          }}
        >
          <div
            style={{
              color: watchaTokens.colors.text.secondary,
              fontSize: watchaTokens.typography.fontSize.xs,
            }}
          >
            프로젝트에 공통적으로 사용되는 컴포넌트들을 정리해둔 문서입니다.
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={mainStyle}>{renderComponent()}</div>
    </div>
  );
}
