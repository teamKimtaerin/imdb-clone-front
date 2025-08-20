'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
      const response = await fetch('/api/auth/verify-code', {
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

  const handleGithubLogin = () => {
    signIn('github');
  };

  const handleGoogleLogin = () => {
    signIn('google');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full ${step === 'email' ? 'bg-[#FF0558]' : 'bg-gray-700'} transition-colors`}
        />
        <div
          className={`w-2 h-2 rounded-full ${step === 'verify' ? 'bg-[#FF0558]' : 'bg-gray-700'} transition-colors`}
        />
        <div
          className={`w-2 h-2 rounded-full ${step === 'details' ? 'bg-[#FF0558]' : 'bg-gray-700'} transition-colors`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#141517] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FF0558] mb-2">ATCHA</h1>
          <p className="text-gray-500 text-sm">
            {step === 'email' && '회원가입을 시작하세요'}
            {step === 'verify' && '이메일 인증'}
            {step === 'details' && '계정 정보 입력'}
          </p>
        </div>

        {renderStepIndicator()}

        <div className="space-y-4">
          {error && (
            <div className="bg-red-950/30 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 'email' && (
            <>
              <form onSubmit={handleSendVerification} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500"
                    placeholder="이메일"
                    required
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.email}
                  className="w-full py-4 bg-[#FF0558] hover:bg-[#E6004C] disabled:bg-[#2A2B2E] disabled:text-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  {loading ? '전송 중...' : '이메일로 계속하기'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2A2B2E]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#141517] text-gray-600">또는</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button
                  onClick={() => handleGoogleLogin()}
                  className="w-full py-4 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition-colors flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google로 시작하기</span>
                </button>

                <button
                  onClick={() => handleGithubLogin()}
                  className="w-full py-4 bg-[#1C1D1F] hover:bg-[#25262B] border border-[#2A2B2E] text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub로 시작하기</span>
                </button>
              </div>
            </>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm">{formData.email}로</p>
                <p className="text-gray-400 text-sm">인증 코드를 전송했습니다.</p>
              </div>

              <div>
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500 text-center text-xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || formData.verificationCode.length !== 6}
                className="w-full py-4 bg-[#FF0558] hover:bg-[#E6004C] disabled:bg-[#2A2B2E] disabled:text-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? '확인 중...' : '인증 확인'}
              </button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full py-4 bg-transparent hover:bg-[#1C1D1F] border border-[#2A2B2E] text-gray-500 hover:text-white font-medium rounded-lg transition-colors"
              >
                이전으로
              </button>

              <p className="text-center text-gray-500 text-sm">
                이메일을 받지 못하셨나요?{' '}
                <button
                  type="button"
                  onClick={() =>
                    handleSendVerification({ preventDefault: () => {} } as React.FormEvent)
                  }
                  className="text-[#FF0558] hover:text-[#E6004C] font-medium transition-colors"
                  disabled={loading}
                >
                  재전송
                </button>
              </p>
            </form>
          )}

          {step === 'details' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-3 mb-4">
                <p className="text-green-400 text-sm">✓ 이메일 인증이 완료되었습니다</p>
              </div>

              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500"
                  placeholder="사용자명"
                  minLength={1}
                  maxLength={20}
                  required
                  autoFocus
                />
              </div>

              <div>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500"
                  placeholder="닉네임"
                  minLength={2}
                  maxLength={20}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500"
                  placeholder="비밀번호 (6자 이상)"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 -mt-2 ml-1">대소문자, 숫자를 포함하여 6자 이상</p>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500"
                  placeholder="비밀번호 확인"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-[#1C1D1F] border-gray-700 rounded focus:ring-[#FF0558] focus:ring-2 text-[#FF0558]"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  <Link href="/terms" className="text-[#FF0558] hover:text-[#E6004C]">
                    이용약관
                  </Link>
                  과{' '}
                  <Link href="/privacy" className="text-[#FF0558] hover:text-[#E6004C]">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !termsAccepted}
                className="w-full py-4 bg-[#FF0558] hover:bg-[#E6004C] disabled:bg-[#2A2B2E] disabled:text-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? '가입 중...' : '회원가입 완료'}
              </button>
            </form>
          )}

          {/* Login link */}
          <div className="text-center pt-6">
            <p className="text-gray-500">
              이미 계정이 있으신가요?{' '}
              <Link
                href="/login"
                className="text-[#FF0558] hover:text-[#E6004C] font-medium transition-colors"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
