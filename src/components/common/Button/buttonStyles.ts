import { watchaTokens } from '@/styles/tokens';
import { ButtonVariant, ButtonSize, ButtonState } from '@/types/button';

// 버튼 변형별 스타일
export const getVariantStyles = (variant: ButtonVariant, { isHovered, isPressed }: ButtonState) => {
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

  return variants[variant];
};

// 버튼 크기별 스타일
export const getSizeStyles = (size: ButtonSize, rounded: boolean) => {
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

  return sizes[size];
};

// 버튼 스타일 통합 함수
export const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  state: ButtonState,
  options: {
    rounded: boolean;
    fullWidth: boolean;
    disabled: boolean;
    loading: boolean;
    hasChildren: boolean;
    style?: React.CSSProperties;
  },
): React.CSSProperties => {
  const { rounded, fullWidth, disabled, loading, hasChildren, style = {} } = options;
  const { isHovered, isPressed } = state;

  const variantStyles = getVariantStyles(variant, state);
  const sizeStyles = getSizeStyles(size, rounded);

  return {
    ...variantStyles,
    ...sizeStyles,
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
    gap: hasChildren ? watchaTokens.spacing.sm : 0,
    position: 'relative',
    overflow: 'hidden',
    transform:
      isPressed && !disabled ? 'scale(0.98)' : isHovered && !disabled ? 'translateY(-1px)' : 'none',
    userSelect: 'none',
    ...style,
  };
};
