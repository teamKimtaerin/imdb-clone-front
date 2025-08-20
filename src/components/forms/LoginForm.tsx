'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setError((error as Error).message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image
              src="/auth/exit-icon.png"
              alt="Login"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-gray-600 mt-2">계정에 로그인하세요</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <div className="relative">
              <Image
                src="/auth/mail-icon.png"
                alt="Mail"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                width={20}
                height={20}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="이메일을 입력하세요"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <Image
                src="/auth/lock-icon.png"
                alt="lock"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                width={20}
                height={20}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Image
                  src={showPassword ? '/auth/open-eye-icon.png' : '/auth/close-eye.png'}
                  alt="Toggle Password"
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                로그인 상태 유지
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
            >
              비밀번호 찾기
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading || !formData.email || !formData.password}
            variant="primary"
            size="lg"
            fullWidth
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:ring-pink-500 transform hover:scale-[1.02] shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                로그인 중...
              </span>
            ) : (
              '로그인'
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleOAuthLogin('google')}
              variant="secondary"
              size="md"
              className="justify-center items-center bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-pink-500 hover:text-pink-600 transition-all"
            >
              <Image
                src="/auth/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              Google
            </Button>
            <Button
              onClick={() => handleOAuthLogin('github')}
              variant="secondary"
              size="md"
              className="justify-center items-center bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900 transition-all"
            >
              <Image
                src="/auth/github.png"
                alt="GitHub"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              GitHub
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link
              href="/register"
              className="font-semibold text-pink-600 hover:text-pink-700 transition-colors duration-200"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
