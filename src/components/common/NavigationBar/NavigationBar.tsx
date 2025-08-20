// src/components/common/NavigationBar/NavigationBar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { watchaTokens } from '@/styles/tokens';
import { NavigationBarProps } from '@/types/navigationBar';
import { SearchDropdown } from '@/components/common/SearchDropdown';
import { SearchItem } from '@/types/searchDropdown';

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeMenu = '홈',
  onSearch,
  onMenuClick,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
    gap: isMobile ? watchaTokens.spacing.md : watchaTokens.spacing.xl,
    flexWrap: isMobile ? 'wrap' : 'nowrap',
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
    display: isMobile ? 'none' : 'flex',
    gap: watchaTokens.spacing.lg,
    marginLeft: isMobile ? '0' : watchaTokens.spacing.xl,
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
    maxWidth: isMobile ? '100%' : '400px',
    marginLeft: isMobile ? '0' : 'auto',
    position: 'relative',
    order: isMobile ? 3 : 0,
    width: isMobile ? '100%' : 'auto',
  };

  const searchStyle: React.CSSProperties = {
    width: '100%',
    padding: `${watchaTokens.spacing.sm} ${watchaTokens.spacing.md}`,
    paddingRight: '40px',
    background: watchaTokens.colors.surface,
    border: `1px solid ${isSearchFocused ? watchaTokens.colors.primary : watchaTokens.colors.border}`,
    borderRadius: isDropdownVisible
      ? `${watchaTokens.borderRadius.pill} ${watchaTokens.borderRadius.pill} 0 0`
      : watchaTokens.borderRadius.pill,
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

  // 검색 API 호출 함수 (데모용)
  const searchAPI = async (query: string): Promise<SearchItem[]> => {
    if (!query.trim()) return [];

    // 더 많은 데모 데이터
    const allDemoData: SearchItem[] = [
      // 영화 데이터
      { key: '인터스텔라', type: 'movie' as const, movieIds: ['1'], score: 0.95 },
      { key: '인셉션', type: 'movie' as const, movieIds: ['2'], score: 0.92 },
      { key: '인크레더블', type: 'movie' as const, movieIds: ['3'], score: 0.89 },
      { key: '인디아나 존스', type: 'movie' as const, movieIds: ['4'], score: 0.86 },
      { key: '인사이드 아웃', type: 'movie' as const, movieIds: ['5'], score: 0.83 },
      { key: '아바타', type: 'movie' as const, movieIds: ['6'], score: 0.88 },
      { key: '어벤져스', type: 'movie' as const, movieIds: ['7'], score: 0.91 },
      { key: '타이타닉', type: 'movie' as const, movieIds: ['8'], score: 0.87 },
      { key: '기생충', type: 'movie' as const, movieIds: ['9'], score: 0.94 },
      { key: '겨울왕국', type: 'movie' as const, movieIds: ['10'], score: 0.82 },
      { key: '토이 스토리', type: 'movie' as const, movieIds: ['11'], score: 0.85 },
      { key: '스파이더맨', type: 'movie' as const, movieIds: ['12'], score: 0.81 },
      { key: '라라랜드', type: 'movie' as const, movieIds: ['13'], score: 0.84 },
      { key: '조커', type: 'movie' as const, movieIds: ['14'], score: 0.9 },

      // 배우 데이터
      { key: '이토 미키', type: 'actor' as const, movieIds: ['1'], score: 0.78 },
      { key: '옥타비아 스펜서', type: 'actor' as const, movieIds: ['2', '3'], score: 0.65 },
      { key: '이정재', type: 'actor' as const, movieIds: ['4', '5'], score: 0.92 },
      { key: '이병헌', type: 'actor' as const, movieIds: ['6', '7', '8'], score: 0.89 },
      { key: '송강호', type: 'actor' as const, movieIds: ['9', '10'], score: 0.93 },
      { key: '전지현', type: 'actor' as const, movieIds: ['11'], score: 0.87 },
      { key: '박서준', type: 'actor' as const, movieIds: ['12', '13'], score: 0.85 },
      { key: '아이유', type: 'actor' as const, movieIds: ['14'], score: 0.79 },
      { key: '레오나르도 디카프리오', type: 'actor' as const, movieIds: ['15', '16'], score: 0.96 },
      { key: '톰 행크스', type: 'actor' as const, movieIds: ['17', '18', '19'], score: 0.95 },
      { key: '로버트 다우니 주니어', type: 'actor' as const, movieIds: ['20', '21'], score: 0.88 },
      { key: '스칼렛 요한슨', type: 'actor' as const, movieIds: ['22'], score: 0.82 },
      { key: '윌 스미스', type: 'actor' as const, movieIds: ['23', '24'], score: 0.86 },
      { key: '엠마 스톤', type: 'actor' as const, movieIds: ['25'], score: 0.84 },
    ];

    // 검색어와 일치하는 항목 필터링
    const filteredResults = allDemoData.filter((item) =>
      item.key.toLowerCase().includes(query.toLowerCase()),
    );

    // 검색어가 있지만 결과가 없을 때 임시 결과 생성
    if (filteredResults.length === 0 && query.length > 0) {
      return [
        {
          key: `"${query}" 관련 영화`,
          type: 'movie' as const,
          movieIds: ['temp1'],
          score: 0.5,
        },
        {
          key: `"${query}" 관련 배우`,
          type: 'actor' as const,
          movieIds: ['temp2'],
          score: 0.5,
        },
      ];
    }

    // 최대 8개까지만 표시 (너무 많으면 스크롤이 길어짐)
    return filteredResults.slice(0, 8);
  };

  // 검색어 변경시 API 호출
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchValue.trim()) {
        const results = await searchAPI(searchValue);
        setSearchResults(results);
        setIsDropdownVisible(true);
      } else {
        setSearchResults([]);
        setIsDropdownVisible(false);
      }
    }, 300); // 300ms 디바운스

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue);
      setIsDropdownVisible(false);
    }
  };

  const handleSearchItemClick = (item: SearchItem) => {
    setSearchValue(item.key);
    setIsDropdownVisible(false);
    if (onSearch) {
      onSearch(item.key);
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

        <div style={searchContainerStyle} ref={searchContainerRef}>
          <input
            type="text"
            placeholder="작품 제목, 배우, 감독을 검색해보세요"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={searchStyle}
          />
          <span style={searchIconStyle} onClick={handleSearch}>
            🔍
          </span>
          <SearchDropdown
            items={searchResults}
            isVisible={isDropdownVisible && isSearchFocused}
            onItemClick={handleSearchItemClick}
            query={searchValue}
          />
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
