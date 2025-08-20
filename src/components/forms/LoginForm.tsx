'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { watchaTokens } from '@/styles/tokens';
import { Button } from '@/components/common/Button';

const LoginForm = () => {
  const router = useRouter();
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
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        router.push('/'); // 메인 페이지로 리다이렉트
      }
    } catch (error: any) {
      setError('로그인에 실패했습니다.');
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

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: watchaTokens.colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: watchaTokens.spacing.md,
    fontFamily: watchaTokens.typography.fontFamily,
  };

  const formContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
  };

  const cardStyle: React.CSSProperties = {
    background: watchaTokens.colors.surface,
    borderRadius: watchaTokens.borderRadius.lg,
    padding: watchaTokens.spacing.xl,
    border: `1px solid ${watchaTokens.colors.border}`,
  };

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: watchaTokens.spacing.xl,
  };

  const mainTitleStyle: React.CSSProperties = {
    fontSize: watchaTokens.typography.fontSize['3xl'],
    fontWeight: watchaTokens.typography.fontWeight.bold,
    color: watchaTokens.colors.text.primary,
    marginBottom: watchaTokens.spacing.sm,
  };

  const subtitleStyle: React.CSSProperties = {
    color: watchaTokens.colors.text.secondary,
    fontSize: watchaTokens.typography.fontSize.base,
  };

  const errorStyle: React.CSSProperties = {
    marginBottom: watchaTokens.spacing.md,
    padding: watchaTokens.spacing.sm,
    background: 'rgba(255, 5, 88, 0.1)',
    border: `1px solid rgba(255, 5, 88, 0.2)`,
    borderRadius: watchaTokens.borderRadius.md,
    color: watchaTokens.colors.primary,
    fontSize: watchaTokens.typography.fontSize.sm,
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: watchaTokens.spacing.lg,
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: watchaTokens.typography.fontSize.sm,
    fontWeight: watchaTokens.typography.fontWeight.medium,
    color: watchaTokens.colors.text.primary,
    marginBottom: watchaTokens.spacing.sm,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: `${watchaTokens.spacing.sm} ${watchaTokens.spacing.md}`,
    background: watchaTokens.colors.background,
    border: `1px solid ${watchaTokens.colors.border}`,
    borderRadius: watchaTokens.borderRadius.md,
    color: watchaTokens.colors.text.primary,
    fontSize: watchaTokens.typography.fontSize.base,
    fontFamily: watchaTokens.typography.fontFamily,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const passwordContainerStyle: React.CSSProperties = {
    position: 'relative',
  };

  const passwordToggleStyle: React.CSSProperties = {
    position: 'absolute',
    right: watchaTokens.spacing.sm,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: watchaTokens.colors.text.secondary,
    cursor: 'pointer',
    fontSize: watchaTokens.typography.fontSize.base,
    padding: watchaTokens.spacing.xs,
  };

  const forgotPasswordStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const linkStyle: React.CSSProperties = {
    color: watchaTokens.colors.primary,
    textDecoration: 'none',
    fontSize: watchaTokens.typography.fontSize.sm,
    transition: 'opacity 0.2s ease',
  };

  const dividerStyle: React.CSSProperties = {
    margin: `${watchaTokens.spacing.lg} 0`,
    position: 'relative',
    textAlign: 'center',
  };

  const dividerLineStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '1px',
    background: watchaTokens.colors.border,
  };

  const dividerTextStyle: React.CSSProperties = {
    background: watchaTokens.colors.surface,
    color: watchaTokens.colors.text.secondary,
    padding: `0 ${watchaTokens.spacing.md}`,
    fontSize: watchaTokens.typography.fontSize.sm,
    position: 'relative',
  };

  const socialButtonsStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: watchaTokens.spacing.sm,
  };

  const registerLinkStyle: React.CSSProperties = {
    marginTop: watchaTokens.spacing.lg,
    textAlign: 'center',
    color: watchaTokens.colors.text.secondary,
    fontSize: watchaTokens.typography.fontSize.sm,
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div style={cardStyle}>
          <div style={titleStyle}>
            <h1 style={mainTitleStyle}>로그인</h1>
            <p style={subtitleStyle}>계정에 로그인하세요</p>
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label htmlFor="email" style={labelStyle}>
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div style={fieldStyle}>
              <label htmlFor="password" style={labelStyle}>
                비밀번호
              </label>
              <div style={passwordContainerStyle}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={passwordToggleStyle}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={forgotPasswordStyle}>
              <Link href="/forgot-password" style={linkStyle}>
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div style={dividerStyle}>
            <div style={dividerLineStyle}></div>
            <span style={dividerTextStyle}>또는</span>
          </div>

          <div style={socialButtonsStyle}>
            <Button onClick={handleGithubLogin} variant="secondary" size="md" fullWidth>
              GitHub
            </Button>
            <Button onClick={handleGoogleLogin} variant="secondary" size="md" fullWidth>
              Google
            </Button>
          </div>

          <div style={registerLinkStyle}>
            계정이 없으신가요?{' '}
            <Link href="/register" style={linkStyle}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
