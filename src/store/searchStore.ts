import { create } from 'zustand';
import { SearchState, SearchItem } from '@/types/search';
import { searchMoviesAndActors } from '@/lib/api/search';

interface SearchActions {
  setQuery: (query: string) => void;
  setResults: (results: SearchItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  // State
  query: '',
  results: [],
  isLoading: false,
  error: null,

  // Actions
  setQuery: (query: string) => set({ query }),

  setResults: (results: SearchItem[]) => set({ results }),

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),

  performSearch: async (query: string) => {
    const trimmedQuery = query.trim();

    if (process.env.NODE_ENV === 'development') {
      console.log('performSearch called with:', query, 'trimmed:', trimmedQuery); // 디버깅용
    }

    set({
      query: trimmedQuery,
      isLoading: true,
      error: null,
    });

    if (!trimmedQuery) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Empty query, clearing results'); // 디버깅용
      }
      set({
        results: [],
        isLoading: false,
      });
      return;
    }

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Calling searchMoviesAndActors with:', trimmedQuery); // 디버깅용
      }
      const response = await searchMoviesAndActors(trimmedQuery);

      if (process.env.NODE_ENV === 'development') {
        console.log('Search API response:', response); // 디버깅용
      }

      if (response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Setting search results:', response.items); // 디버깅용
        }
        set({
          results: response.items,
          isLoading: false,
        });
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('Search API returned not ok'); // 디버깅용
        }
        set({
          error: '검색 결과를 가져올 수 없습니다.',
          isLoading: false,
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Search error:', error); // 디버깅용
      }
      set({
        error: error instanceof Error ? error.message : '검색 중 오류가 발생했습니다.',
        isLoading: false,
      });
    }
  },

  clearSearch: () =>
    set({
      query: '',
      results: [],
      isLoading: false,
      error: null,
    }),
}));
