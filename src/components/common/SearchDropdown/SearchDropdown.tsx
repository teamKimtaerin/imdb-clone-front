// src/components/common/SearchDropdown/SearchDropdown.tsx
'use client';

import React from 'react';
import { watchaTokens } from '@/styles/tokens';
import { SearchDropdownProps } from '@/types/searchDropdown';

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  items,
  isVisible,
  onItemClick,
  query,
}) => {
  if (!isVisible) return null;

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% - 1px)', // 검색바와 연결되도록
    left: 0,
    right: 0,
    background: watchaTokens.colors.surface,
    border: `1px solid ${watchaTokens.colors.border}`,
    borderTop: `1px solid ${watchaTokens.colors.border}`,
    borderRadius: `0 0 ${watchaTokens.borderRadius.lg} ${watchaTokens.borderRadius.lg}`,
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
  };

  const itemStyle: React.CSSProperties = {
    padding: `${watchaTokens.spacing.md} ${watchaTokens.spacing.lg}`,
    cursor: 'pointer',
    borderBottom: `1px solid ${watchaTokens.colors.border}`,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  };

  const itemHoverStyle: React.CSSProperties = {
    ...itemStyle,
    backgroundColor: watchaTokens.colors.surfaceHover,
  };

  const typeTagStyle = (type: string): React.CSSProperties => ({
    padding: `${watchaTokens.spacing.xs} ${watchaTokens.spacing.sm}`,
    borderRadius: watchaTokens.borderRadius.sm,
    fontSize: watchaTokens.typography.fontSize.xs,
    fontWeight: watchaTokens.typography.fontWeight.medium,
    textTransform: 'uppercase',
    backgroundColor: type === 'movie' ? watchaTokens.colors.primary : '#00c896',
    color: 'white',
    lineHeight: 1,
  });

  // 검색어 강조 효과 제거 - 단순히 텍스트만 반환
  const highlightQuery = (text: string, query: string) => {
    return text;
  };

  return (
    <div style={containerStyle}>
      {items.map((item, index) => (
        <div
          key={`${item.key}-${index}`}
          style={itemStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, itemHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, itemStyle);
          }}
          onClick={() => onItemClick(item)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={typeTagStyle(item.type)}>{item.type === 'movie' ? '영화' : '배우'}</span>
            <span style={{ color: watchaTokens.colors.text.primary }}>
              {highlightQuery(item.key, query)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.movieIds.length > 1 && (
              <span
                style={{
                  fontSize: watchaTokens.typography.fontSize.xs,
                  color: watchaTokens.colors.text.secondary,
                }}
              >
                {item.movieIds.length}개 작품
              </span>
            )}
          </div>
        </div>
      ))}
      {items.length === 0 && query && (
        <div
          style={{
            padding: '16px',
            textAlign: 'center',
            color: watchaTokens.colors.text.secondary,
          }}
        >
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
};
