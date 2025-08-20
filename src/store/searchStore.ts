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

    set({
      query: trimmedQuery,
      isLoading: true,
      error: null,
    });

    if (!trimmedQuery) {
      set({
        results: [],
        isLoading: false,
      });
      return;
    }

    try {
      const response = await searchMoviesAndActors(trimmedQuery);

      if (response.ok) {
        set({
          results: response.items,
          isLoading: false,
        });
      } else {
        set({
          error: '검색 결과를 가져올 수 없습니다.',
          isLoading: false,
        });
      }
    } catch (error) {
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
