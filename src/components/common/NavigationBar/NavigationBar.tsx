// src/components/common/NavigationBar/NavigationBar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { watchaTokens } from '@/styles/tokens';
import { NavigationBarProps } from '@/types/navigationBar';
import { SearchDropdown } from '@/components/common/SearchDropdown';
import { SearchItem } from '@/types/search';
import { useSearchStore } from '@/store/searchStore';
import { useDebounce } from '@/hooks/useDebounce';

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onSearch: _onSearch,
  onMenuClick,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 클라이언트에서만 렌더링되도록 보장
  useEffect(() => {
    setMounted(true);
  }, []);

  // Zustand 스토어에서 검색 관련 상태와 액션 가져오기
  const { performSearch, isLoading, results } = useSearchStore();

  // 0.5초 디바운스 적용
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const menuItems: string[] = [];

  // 디바운스된 검색어가 변경될 때마다 API 호출 (드롭다운용)
  useEffect(() => {
    if (!mounted) return;

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
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  }, [debouncedSearchValue, performSearch, mounted]);

  // 검색 결과가 변경될 때 드롭다운 업데이트
  useEffect(() => {
    if (!mounted) return;

    if (results && results.length > 0) {
      // 검색 결과를 SearchItem 형태로 변환
      const searchItems: SearchItem[] = results.flatMap((result) =>
        result.movieIds.map((movieId) => ({
          id: movieId,
          title: result.title || '제목 없음',
          type: 'movie' as const,
          year: result.year,
          poster: result.poster,
        })),
      );

      setSearchResults(searchItems);
      setIsDropdownVisible(searchItems.length > 0 && isSearchFocused);
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  }, [results, isSearchFocused, mounted]);

  // 화면 크기 감지
  useEffect(() => {
    if (!mounted) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mounted]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mounted]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchValue.trim())}`);
      setIsSearchFocused(false);
      setIsDropdownVisible(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchResults.length > 0) {
      setIsDropdownVisible(true);
    }
  };

  const handleItemClick = (item: SearchItem) => {
    if (item.type === 'movie') {
      router.push(`/movie/${item.id}`);
    }
    setIsSearchFocused(false);
    setIsDropdownVisible(false);
    setSearchValue('');
  };

  const handleLogout = async () => {
    try {
      // next-auth signOut 사용
      const { signOut } = await import('next-auth/react');
      await signOut({ redirect: false });
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  // 마운트되지 않았으면 로딩 상태 표시
  if (!mounted) {
    return (
      <div
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${watchaTokens.colors.border}`,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: watchaTokens.colors.primary }}>
          IMDB Clone
        </div>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <nav
      style={{
        padding: '16px 24px',
        borderBottom: `1px solid ${watchaTokens.colors.border}`,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
      }}
    >
      {/* 로고 */}
      <div
        onClick={() => router.push('/')}
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: watchaTokens.colors.primary,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        IMDB Clone
      </div>

      {/* 검색 영역 */}
      <div
        ref={searchContainerRef}
        style={{
          position: 'relative',
          flex: 1,
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="영화, 배우를 검색하세요..."
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: `1px solid ${watchaTokens.colors.border}`,
              background: watchaTokens.colors.surface,
              color: watchaTokens.colors.text.primary,
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
        </form>

        {/* 검색 드롭다운 */}
        {isDropdownVisible && (
          <SearchDropdown
            items={searchResults}
            onItemClick={handleItemClick}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* 사용자 메뉴 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
        {session?.user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: watchaTokens.colors.text.primary, fontSize: '14px' }}>
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: `1px solid ${watchaTokens.colors.border}`,
                background: 'transparent',
                color: watchaTokens.colors.text.primary,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push('/login')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: watchaTokens.colors.primary,
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            로그인
          </button>
        )}
      </div>
    </nav>
  );
};
