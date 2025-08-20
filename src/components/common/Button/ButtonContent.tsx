import { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ButtonSize } from '@/types/button';

export interface ButtonContentProps {
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
  size?: ButtonSize;
}

export const ButtonContent = ({
  loading,
  startIcon,
  endIcon,
  children,
  size = 'md',
}: ButtonContentProps) => {
  return (
    <>
      {loading && <LoadingSpinner size={size} />}
      {!loading && startIcon && <span style={{ display: 'flex' }}>{startIcon}</span>}
      {children && <span>{children}</span>}
      {!loading && endIcon && <span style={{ display: 'flex' }}>{endIcon}</span>}
    </>
  );
};
