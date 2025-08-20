'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
            <Button
              onClick={logout}
              variant="secondary"
              size="md"
              className="bg-red-500 text-white hover:bg-red-600"
            >
              로그아웃
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">사용자 정보</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-32">이름:</span>
                <span className="text-gray-900">{user.username}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-32">닉네임:</span>
                <span className="text-gray-900">{user.nickname}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-32">이메일:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-32">이메일 인증:</span>
                <span
                  className={`font-medium ${user.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}
                >
                  {user.isEmailVerified ? '인증 완료' : '미인증'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-32">계정 상태:</span>
                <span
                  className={`font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}
                >
                  {user.isActive ? '활성' : '비활성'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-32">가입일:</span>
                <span className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">선호 장르</h2>
            <div className="flex flex-wrap gap-2">
              {user.preferences && user.preferences.length > 0 ? (
                user.preferences.map((pref, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">아직 선호 장르가 설정되지 않았습니다.</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">최근 검색어</h2>
            <div className="space-y-2">
              {user.recentSearches && user.recentSearches.length > 0 ? (
                user.recentSearches.map((search, index) => (
                  <div key={index} className="text-gray-700">
                    • {search}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">최근 검색 기록이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
