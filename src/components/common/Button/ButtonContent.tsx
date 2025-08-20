import { ReactNode } from 'react';
import Image from 'next/image';
import { LoadingSpinner } from './LoadingSpinner';

// 아이콘 타입 정의
export interface IconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ButtonContentProps {
  loading?: boolean;
  startIcon?: IconProps | ReactNode;
  endIcon?: IconProps | ReactNode;
  children?: ReactNode;
}

// 아이콘이 Image props인지 확인하는 타입 가드
const isImageIcon = (icon: IconProps | ReactNode): icon is IconProps => {
  return typeof icon === 'object' && icon !== null && 'src' in icon;
};

// ButtonContent 컴포넌트
export const ButtonContent = ({ loading, startIcon, endIcon, children }: ButtonContentProps) => (
  <>
    {loading && <LoadingSpinner />}
    {!loading && startIcon && (
      <span className="flex items-center">
        {isImageIcon(startIcon) ? (
          <Image
            src={startIcon.src}
            alt={startIcon.alt}
            width={startIcon.width || 16}
            height={startIcon.height || 16}
            className="w-4 h-4"
          />
        ) : (
          startIcon
        )}
      </span>
    )}
    {children && <span>{children}</span>}
    {!loading && endIcon && (
      <span className="flex items-center">
        {isImageIcon(endIcon) ? (
          <Image
            src={endIcon.src}
            alt={endIcon.alt}
            width={endIcon.width || 16}
            height={endIcon.height || 16}
            className="w-4 h-4"
          />
        ) : (
          endIcon
        )}
      </span>
    )}
  </>
);
