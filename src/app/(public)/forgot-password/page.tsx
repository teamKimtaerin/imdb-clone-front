'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep('code');
      } else {
        setError(data.message || '인증 코드 전송에 실패했습니다.');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResetToken(data.data.resetToken);
        // 토큰을 localStorage에 저장하고 재설정 페이지로 이동
        localStorage.setItem('resetToken', data.data.resetToken);
        localStorage.setItem('resetEmail', email);
        router.push('/reset-password');
      } else {
        setError(data.message || '인증 코드가 올바르지 않습니다.');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141517] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#FF0558] mb-2">ATCHA</h1>
          <p className="text-gray-500 text-sm">비밀번호 찾기</p>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-950/30 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  가입한 이메일 주소를 입력하세요
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500"
                  placeholder="이메일"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-4 bg-[#FF0558] hover:bg-[#E6004C] disabled:bg-[#2A2B2E] disabled:text-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? '전송 중...' : '인증 코드 전송'}
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm">{email}로</p>
                <p className="text-gray-400 text-sm">인증 코드를 전송했습니다.</p>
                <p className="text-gray-500 text-xs mt-2">코드는 1시간 동안 유효합니다.</p>
              </div>

              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-4 bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg focus:outline-none focus:border-[#FF0558] transition-colors text-white placeholder-gray-500 text-center text-xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 6}
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
                  onClick={() => handleSendCode({ preventDefault: () => {} } as React.FormEvent)}
                  className="text-[#FF0558] hover:text-[#E6004C] font-medium transition-colors"
                  disabled={loading}
                >
                  재전송
                </button>
              </p>
            </form>
          )}

          {/* Back to login */}
          <div className="text-center pt-6">
            <Link href="/login" className="text-gray-500 hover:text-[#FF0558] transition-colors">
              ← 로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
