'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

// Login Form Component
const LoginForm: React.FC<{ onSwitchToRegister: () => void }> = ({ onSwitchToRegister }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image src="/auth/exit.png" alt="Login" className="w-8 h-8" width={32} height={32} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            로그인
          </h2>
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
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
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
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <Image
                src="/auth/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              Google
            </button>
            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <Image
                src="/auth/github.png"
                alt="GitHub"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <button
              onClick={onSwitchToRegister}
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Register Form Component
const RegisterForm: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    // 비밀번호 강도 검사
    if (formData.password.length < 8) {
      setError('비밀번호는 최소 8자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await axios.post('/api/auth/register', registerData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        // 회원가입 성공 처리 (예: 페이지 리다이렉트 등)
        console.log('회원가입 성공:', response.data.data);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || '네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthRegister = (provider: string) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image
              src="/auth/register.png"
              alt="Register"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            회원가입
          </h2>
          <p className="text-gray-600 mt-2">새 계정을 만드세요</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사용자명</label>
            <div className="relative">
              <Image
                src="/auth/user.png"
                alt="User"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                width={20}
                height={20}
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="사용자명을 입력하세요"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
            <div className="relative">
              <Image
                src="/auth/user.png"
                alt="User"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                width={20}
                height={20}
              />
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="닉네임을 입력하세요"
                required
              />
            </div>
          </div>

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
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                alt="Lock"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                width={20}
                height={20}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인</label>
            <div className="relative">
              <Image
                src="/auth/lock.png"
                alt="Lock"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                width={20}
                height={20}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Image
                  src={showConfirmPassword ? '/auth/open-eye.png' : '/auth/close-eye.png'}
                  alt="Toggle Password"
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
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
            <button
              onClick={() => handleOAuthRegister('google')}
              className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <Image
                src="/auth/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              Google
            </button>
            <button
              onClick={() => handleOAuthRegister('github')}
              className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <Image
                src="/auth/github.png"
                alt="GitHub"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginForm, RegisterForm };
