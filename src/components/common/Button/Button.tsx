// src/components/common/Button/Button.tsx
'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { watchaTokens } from '@/styles/tokens';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 스타일 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';
  /** 버튼 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 아이콘 (왼쪽) */
  startIcon?: ReactNode;
  /** 아이콘 (오른쪽) */
  endIcon?: ReactNode;
  /** 둥근 버튼 (아이콘 전용) */
  rounded?: boolean;
  /** 버튼 내용 */
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  rounded = false,
  children,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  // 버튼 변형별 스타일
  const variants = {
    primary: {
      background: isPressed
        ? watchaTokens.colors.primaryDark
        : isHovered
          ? watchaTokens.colors.primaryDark
          : watchaTokens.colors.primary,
      color: watchaTokens.colors.text.primary,
      border: 'none',
      boxShadow: isHovered ? '0 4px 12px rgba(255, 5, 88, 0.3)' : 'none',
    },
    secondary: {
      background: isPressed
        ? watchaTokens.colors.surface
        : isHovered
          ? watchaTokens.colors.surfaceHover
          : 'transparent',
      color: watchaTokens.colors.primary,
      border: `2px solid ${watchaTokens.colors.primary}`,
      boxShadow: 'none',
    },
    ghost: {
      background: isPressed
        ? watchaTokens.colors.surface
        : isHovered
          ? watchaTokens.colors.surfaceHover
          : 'transparent',
      color: watchaTokens.colors.text.primary,
      border: `1px solid ${watchaTokens.colors.border}`,
      boxShadow: 'none',
    },
    text: {
      background: isPressed
        ? watchaTokens.colors.surface
        : isHovered
          ? watchaTokens.colors.surfaceHover
          : 'transparent',
      color: isHovered ? watchaTokens.colors.text.primary : watchaTokens.colors.text.secondary,
      border: 'none',
      boxShadow: 'none',
    },
    danger: {
      background: isPressed ? '#dc2626' : isHovered ? '#dc2626' : '#ef4444',
      color: watchaTokens.colors.text.primary,
      border: 'none',
      boxShadow: isHovered ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none',
    },
  };

  // 버튼 크기별 스타일
  const sizes = {
    xs: {
      padding: rounded ? '6px' : `6px 12px`,
      fontSize: watchaTokens.typography.fontSize.xs,
      height: '28px',
      minWidth: rounded ? '28px' : 'auto',
    },
    sm: {
      padding: rounded ? '8px' : `8px 16px`,
      fontSize: watchaTokens.typography.fontSize.sm,
      height: '32px',
      minWidth: rounded ? '32px' : 'auto',
    },
    md: {
      padding: rounded ? '10px' : `10px 20px`,
      fontSize: watchaTokens.typography.fontSize.base,
      height: '40px',
      minWidth: rounded ? '40px' : 'auto',
    },
    lg: {
      padding: rounded ? '12px' : `12px 24px`,
      fontSize: watchaTokens.typography.fontSize.lg,
      height: '48px',
      minWidth: rounded ? '48px' : 'auto',
    },
    xl: {
      padding: rounded ? '16px' : `16px 32px`,
      fontSize: watchaTokens.typography.fontSize.xl,
      height: '56px',
      minWidth: rounded ? '56px' : 'auto',
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const buttonStyle: React.CSSProperties = {
    ...currentVariant,
    ...currentSize,
    width: fullWidth ? '100%' : 'auto',
    borderRadius: rounded ? '50%' : watchaTokens.borderRadius.pill,
    fontFamily: watchaTokens.typography.fontFamily,
    fontWeight: watchaTokens.typography.fontWeight.medium,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: children ? watchaTokens.spacing.sm : 0,
    position: 'relative',
    overflow: 'hidden',
    transform:
      isPressed && !disabled ? 'scale(0.98)' : isHovered && !disabled ? 'translateY(-1px)' : 'none',
    userSelect: 'none',
    ...style,
  };

  // 로딩 스피너 컴포넌트
  const LoadingSpinner = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        animation: 'spin 1s linear infinite',
      }}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="28"
        strokeDashoffset="10"
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </svg>
  );

  return (
    <button
      style={buttonStyle}
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && !loading && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && startIcon && <span style={{ display: 'flex' }}>{startIcon}</span>}
      {children && <span>{children}</span>}
      {!loading && endIcon && <span style={{ display: 'flex' }}>{endIcon}</span>}
    </button>
  );
};

// 아이콘 버튼 컴포넌트 (편의를 위한 래퍼)
export const IconButton: React.FC<Omit<ButtonProps, 'rounded'>> = (props) => {
  return <Button {...props} rounded />;
};
