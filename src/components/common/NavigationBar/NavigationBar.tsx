// src/components/common/NavigationBar/NavigationBar.tsx
'use client';

import React, { useState } from 'react';
import { watchaTokens } from '@/styles/tokens';
import { NavigationBarProps } from '@/types/navigationBar';

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeMenu = '홈',
  onSearch,
  onMenuClick,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const menuItems = ['홈', '탐색', '평가', '보고싶어요', '프로필'];

  const navStyle: React.CSSProperties = {
    background: watchaTokens.colors.background,
    borderBottom: `1px solid ${watchaTokens.colors.border}`,
    padding: `${watchaTokens.spacing.md} ${watchaTokens.spacing.xl}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1320px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: watchaTokens.spacing.xl,
  };

  const logoStyle: React.CSSProperties = {
    color: watchaTokens.colors.primary,
    fontSize: watchaTokens.typography.fontSize['2xl'],
    fontWeight: watchaTokens.typography.fontWeight.bold,
    letterSpacing: '-1px',
    cursor: 'pointer',
    userSelect: 'none',
  };

  const menuStyle: React.CSSProperties = {
    display: 'flex',
    gap: watchaTokens.spacing.lg,
    marginLeft: watchaTokens.spacing.xl,
  };

  const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? watchaTokens.colors.text.primary : watchaTokens.colors.text.secondary,
    fontSize: watchaTokens.typography.fontSize.base,
    fontWeight: isActive
      ? watchaTokens.typography.fontWeight.medium
      : watchaTokens.typography.fontWeight.normal,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    userSelect: 'none',
  });

  const searchContainerStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: '400px',
    marginLeft: 'auto',
    position: 'relative',
  };

  const searchStyle: React.CSSProperties = {
    width: '100%',
    padding: `${watchaTokens.spacing.sm} ${watchaTokens.spacing.md}`,
    paddingRight: '40px',
    background: watchaTokens.colors.surface,
    border: `1px solid ${isSearchFocused ? watchaTokens.colors.primary : watchaTokens.colors.border}`,
    borderRadius: watchaTokens.borderRadius.pill,
    color: watchaTokens.colors.text.primary,
    fontSize: watchaTokens.typography.fontSize.sm,
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: watchaTokens.colors.text.secondary,
    cursor: 'pointer',
    fontSize: '18px',
  };

  const profileBtnStyle: React.CSSProperties = {
    padding: `${watchaTokens.spacing.sm} ${watchaTokens.spacing.md}`,
    background: watchaTokens.colors.primary,
    color: watchaTokens.colors.text.primary,
    border: 'none',
    borderRadius: watchaTokens.borderRadius.pill,
    fontSize: watchaTokens.typography.fontSize.sm,
    fontWeight: watchaTokens.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>WATCHA</div>

        <div style={menuStyle}>
          {menuItems.slice(0, 2).map((item) => (
            <span
              key={item}
              style={menuItemStyle(activeMenu === item)}
              onClick={() => onMenuClick?.(item)}
              onMouseEnter={(e) => {
                if (activeMenu !== item) {
                  (e.target as HTMLElement).style.color = watchaTokens.colors.text.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item) {
                  (e.target as HTMLElement).style.color = watchaTokens.colors.text.secondary;
                }
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="작품 제목, 배우, 감독을 검색해보세요"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={searchStyle}
          />
          <span style={searchIconStyle} onClick={handleSearch}>
            🔍
          </span>
        </div>

        <button
          style={profileBtnStyle}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = watchaTokens.colors.primaryDark;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = watchaTokens.colors.primary;
          }}
        >
          회원가입/로그인
        </button>
      </div>
    </nav>
  );
};
