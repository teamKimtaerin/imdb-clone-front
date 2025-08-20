'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';

interface FormData {
  email: string;
  verificationCode: string;
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'verify' | 'details'>('email');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    verificationCode: '',
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다.';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return '비밀번호는 소문자를 포함해야 합니다.';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return '비밀번호는 대문자를 포함해야 합니다.';
    }
    if (!/(?=.*\d)/.test(password)) {
      return '비밀번호는 숫자를 포함해야 합니다.';
    }
    return null;
  };

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep('verify');
      } else {
        setError(data.message || '인증 이메일 전송에 실패했습니다.');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          code: formData.verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep('details');
      } else {
        setError(data.message || '인증 코드가 올바르지 않습니다.');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!termsAccepted) {
      setError('이용약관에 동의해주세요.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          nickname: formData.nickname,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === 'email' ? 'bg-pink-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {step === 'email' ? '1' : '✓'}
        </div>
        <div className={`w-16 h-1 ${step !== 'email' ? 'bg-green-500' : 'bg-gray-300'}`} />

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === 'verify'
              ? 'bg-pink-500 text-white'
              : step === 'details'
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-500'
          }`}
        >
          {step === 'details' ? '✓' : '2'}
        </div>
        <div className={`w-16 h-1 ${step === 'details' ? 'bg-green-500' : 'bg-gray-300'}`} />

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === 'details' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-500'
          }`}
        >
          3
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image
              src="/auth/register.png"
              alt="Register"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
          <p className="text-gray-600">
            {step === 'email' && '이메일을 입력하여 시작하세요'}
            {step === 'verify' && '이메일로 전송된 인증 코드를 입력하세요'}
            {step === 'details' && '계정 정보를 입력하세요'}
          </p>
        </div>

        {renderStepIndicator()}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={handleSendVerification} className="space-y-5">
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

            <Button
              type="submit"
              disabled={loading || !formData.email}
              variant="primary"
              size="lg"
              fullWidth
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:ring-pink-500"
            >
              {loading ? '전송 중...' : '인증 이메일 전송'}
            </Button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
              <p className="text-sm">{formData.email}로 인증 코드가 전송되었습니다.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">인증 코드</label>
              <div className="relative">
                <Image
                  src="/auth/lock-icon.png"
                  alt="Code"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  width={20}
                  height={20}
                />
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-center text-lg font-semibold tracking-wider"
                  placeholder="6자리 코드"
                  maxLength={6}
                  required
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                이메일을 받지 못하셨나요?{' '}
                <button
                  type="button"
                  onClick={() =>
                    handleSendVerification({ preventDefault: () => {} } as React.FormEvent)
                  }
                  className="text-pink-600 hover:text-pink-700 font-medium"
                  disabled={loading}
                >
                  재전송
                </button>
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep('email')}
                variant="secondary"
                size="lg"
                fullWidth
              >
                이전
              </Button>
              <Button
                type="submit"
                disabled={loading || formData.verificationCode.length !== 6}
                variant="primary"
                size="lg"
                fullWidth
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:ring-pink-500"
              >
                {loading ? '확인 중...' : '인증 확인'}
              </Button>
            </div>
          </form>
        )}

        {step === 'details' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              <p className="text-sm">이메일 인증이 완료되었습니다!</p>
            </div>

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
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="사용자명 (1-20자)"
                  minLength={1}
                  maxLength={20}
                  required
                  autoFocus
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
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="닉네임 (2-20자)"
                  minLength={2}
                  maxLength={20}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
              <div className="relative">
                <Image
                  src="/auth/lock-icon.png"
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
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="비밀번호 (6자 이상)"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <Image
                    src={showPassword ? '/auth/open-eye-icon.png' : '/auth/close-eye.png'}
                    alt="Toggle"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">대소문자, 숫자를 포함하여 6자 이상</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인</label>
              <div className="relative">
                <Image
                  src="/auth/lock-icon.png"
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
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <Image
                    src={showConfirmPassword ? '/auth/open-eye-icon.png' : '/auth/close-eye.png'}
                    alt="Toggle"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                <Link href="/terms" className="text-pink-600 hover:text-pink-700">
                  이용약관
                </Link>
                과{' '}
                <Link href="/privacy" className="text-pink-600 hover:text-pink-700">
                  개인정보처리방침
                </Link>
                에 동의합니다
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading || !termsAccepted}
              variant="primary"
              size="lg"
              fullWidth
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:ring-pink-500 transform hover:scale-[1.02] shadow-lg"
            >
              {loading ? '가입 중...' : '회원가입 완료'}
            </Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="font-semibold text-pink-600 hover:text-pink-700 transition-colors duration-200"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
