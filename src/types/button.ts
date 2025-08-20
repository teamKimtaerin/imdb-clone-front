import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 스타일 */
  variant?: ButtonVariant; // 직접 타입 참조
  /** 버튼 크기 */
  size?: ButtonSize; // 직접 타입 참조
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

export interface ButtonState {
  isHovered: boolean;
  isPressed: boolean;
}
