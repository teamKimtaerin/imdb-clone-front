import { SearchResponse } from '@/types/search';

const API_BASE_URL = 'http://localhost:4000';

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
    const response = await fetch(`${API_BASE_URL}/api/search?q=${encodedQuery}&limit=${limit}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SearchResponse = await response.json();

    // 실제 API 응답 구조 확인을 위한 로깅
    console.log('검색 API 응답:', data);
    if (data.items && data.items.length > 0) {
      console.log('첫 번째 아이템 구조:', data.items[0]);
    }

    return data;
  } catch (error) {
    console.error('Search API error:', error);
    throw new Error('검색 중 오류가 발생했습니다.');
  }
}
