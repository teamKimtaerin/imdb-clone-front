'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/common/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const response = await axios.post('/api/auth/login', formData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        // 로그인 성공 처리 (예: 페이지 리다이렉트 등)
        console.log('로그인 성공:', response.data.data);
        // router.push('/dashboard'); // next/navigation 사용 시
      }
    } catch (error: any) {
      setError(error.response?.data?.message || '네트워크 오류가 발생했습니다.');
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
            <Image src="/auth/exit.png" alt="Login" className="w-8 h-8" width={32} height={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-gray-600 mt-2">계정에 로그인하세요</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <div className="relative">
              <Image
                src="/auth/mail.png"
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
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <Image
                src="/auth/lock.png"
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
                  src={showPassword ? '/auth/open-eye.png' : '/auth/close-eye.png'}
                  alt="Toggle Password"
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            fullWidth
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:ring-pink-500 transform hover:scale-[1.02] shadow-lg"
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500">또는</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleOAuthLogin('google')}
              variant="secondary"
              size="md"
              className="justify-center items-center bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-pink-500 hover:text-pink-600"
            >
              <Image
                src="/auth/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
            </Button>
            <Button
              onClick={() => handleOAuthLogin('github')}
              variant="secondary"
              size="md"
              className="justify-center items-center bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Image
                src="/auth/github.png"
                alt="GitHub"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
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
