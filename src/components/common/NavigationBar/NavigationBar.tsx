// src/components/common/NavigationBar/NavigationBar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { watchaTokens } from '@/styles/tokens';
import { NavigationBarProps } from '@/types/navigationBar';
import { SearchDropdown } from '@/components/common/SearchDropdown';
import { SearchItem } from '@/types/search';
import { useSearchStore } from '@/store/searchStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/contexts/AuthContext';

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onSearch: _onSearch,
  onMenuClick,
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Zustand 스토어에서 검색 관련 상태와 액션 가져오기
  const { performSearch, isLoading, results } = useSearchStore();

  // 0.5초 디바운스 적용
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const menuItems: string[] = [];

  // 디바운스된 검색어가 변경될 때마다 API 호출 (드롭다운용)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Debounced search value:',
        debouncedSearchValue,
        'type:',
        typeof debouncedSearchValue,
      ); // 디버깅용
    }

    if (debouncedSearchValue && debouncedSearchValue.trim()) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Performing search with:', debouncedSearchValue); // 디버깅용
      }
      performSearch(debouncedSearchValue);
    } else if (debouncedSearchValue === '') {
      // 검색어가 비어있으면 결과 초기화
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  }, [debouncedSearchValue, performSearch]);

  // 검색 결과를 드롭다운에 반영
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Search results updated:', results); // 디버깅용
      console.log('Current searchValue:', searchValue); // 디버깅용
      console.log('isLoading:', isLoading); // 디버깅용
    }

    if (results && results.length > 0 && searchValue.trim()) {
      setSearchResults(results);
      setIsDropdownVisible(true);
      if (process.env.NODE_ENV === 'development') {
        console.log('Setting dropdown visible with results:', results.length); // 디버깅용
      }
    } else if (searchValue.trim() && !isLoading && results.length === 0) {
      // 검색어가 있지만 결과가 없는 경우
      setSearchResults([]);
      setIsDropdownVisible(true); // "검색 결과가 없습니다" 메시지를 보여주기 위해
      if (process.env.NODE_ENV === 'development') {
        console.log('No results found, showing empty dropdown'); // 디버깅용
      }
    } else if (!searchValue.trim()) {
      // 검색어가 없는 경우
      setSearchResults([]);
      setIsDropdownVisible(false);
      if (process.env.NODE_ENV === 'development') {
        console.log('Empty search value, hiding dropdown'); // 디버깅용
      }
    }
  }, [results, searchValue, isLoading]);

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
    transition: 'opacity 0.2s ease',
  };

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

  // 검색 API 호출 함수 (데모용) - 제거됨, 이제 Zustand 스토어 사용

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
    if (searchValue.trim()) {
      // URL을 검색 페이지로 변경
      router.push(`/search?search=${encodeURIComponent(searchValue.trim())}`);
      setIsDropdownVisible(false);
    } else {
      // 검색어가 비어있으면 홈으로 이동
      router.push('/');
      setIsDropdownVisible(false);
    }
  };

  const handleSearchItemClick = (item: SearchItem) => {
    setSearchValue(item.key_display);
    setIsDropdownVisible(false);
    // URL을 검색 페이지로 변경
    router.push(`/search?search=${encodeURIComponent(item.key_display)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (process.env.NODE_ENV === 'development') {
      console.log('Search input changed:', value); // 디버깅용
    }
    setSearchValue(value);

    // 검색어가 비어있으면 즉시 드롭다운 숨기기
    if (!value.trim()) {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div
          style={logoStyle}
          onClick={handleLogoClick}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = '1';
          }}
        >
          WATCHA
        </div>

        <div style={searchContainerStyle} ref={searchContainerRef}>
          <input
            type="text"
            placeholder="작품 제목, 배우, 감독을 검색해보세요"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={searchStyle}
          />
          <span style={searchIconStyle} onClick={handleSearch}>
            {isLoading ? '⏳' : '🔍'}
          </span>
          <SearchDropdown
            items={searchResults}
            isVisible={isDropdownVisible}
            onItemClick={handleSearchItemClick}
            query={searchValue}
          />
        </div>

        {user ? (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              style={{
                ...profileBtnStyle,
                background: 'transparent',
                border: `1px solid ${watchaTokens.colors.border}`,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = watchaTokens.colors.primary;
                (e.target as HTMLElement).style.color = watchaTokens.colors.primary;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = watchaTokens.colors.border;
                (e.target as HTMLElement).style.color = watchaTokens.colors.text.primary;
              }}
              onClick={() => router.push('/settings')}
            >
              마이페이지
            </button>
            <button
              style={{
                ...profileBtnStyle,
                background: 'transparent',
                border: `1px solid ${watchaTokens.colors.border}`,
                padding: `${watchaTokens.spacing.sm} ${watchaTokens.spacing.md}`,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = watchaTokens.colors.primary;
                (e.target as HTMLElement).style.color = watchaTokens.colors.primary;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = watchaTokens.colors.border;
                (e.target as HTMLElement).style.color = watchaTokens.colors.text.secondary;
              }}
              onClick={logout}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            style={profileBtnStyle}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = watchaTokens.colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = watchaTokens.colors.primary;
            }}
            onClick={() => router.push('/login')}
          >
            회원가입/로그인
          </button>
        )}
      </div>
    </nav>
  );
};
