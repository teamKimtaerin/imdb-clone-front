import { SearchResponse, SearchItem } from '@/types/search';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

// API 응답 타입 (백엔드 형식)
interface ApiSearchItem {
  key: string;
  type: 'movie' | 'director' | 'actor';
  movieIds: string[];
  score: number;
}

interface ApiSearchResponse {
  ok: boolean;
  query: string;
  count: number;
  items: ApiSearchItem[];
}

export async function searchMoviesAndActors(
  query: string,
  limit: number = 10,
): Promise<SearchResponse> {
  if (!query.trim()) {
    return {
      ok: true,
      query: '',
      count: 0,
      items: [],
    };
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `${API_BASE_URL}/api/search?q=${encodedQuery}&limit=${limit}`;

    if (process.env.NODE_ENV === 'development') {
      console.log('Search API URL:', url); // 디버깅용
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiData: ApiSearchResponse = await response.json();

    // 실제 API 응답 구조 확인을 위한 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log('검색 API 응답:', apiData);
      if (apiData.items && apiData.items.length > 0) {
        console.log('첫 번째 아이템 구조:', apiData.items[0]);
      }
    }

    // API 응답을 프론트엔드 형식으로 변환
    const transformedItems: SearchItem[] = apiData.items.map((item) => ({
      key_display: item.key,
      key_type: item.type,
      key_norm: item.key.toLowerCase(), // 임시값
      key_jamo_full: '', // 임시값
      key_initials: '', // 임시값
      movieIds: item.movieIds,
    }));

    const transformedData: SearchResponse = {
      ok: apiData.ok,
      query: apiData.query,
      count: apiData.count,
      items: transformedItems,
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('변환된 데이터:', transformedData);
    }

    return transformedData;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Search API error:', error);
    }
    throw new Error('검색 중 오류가 발생했습니다.');
  }
}
