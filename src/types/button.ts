import { ButtonHTMLAttributes, ReactNode } from 'react';

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

export interface ButtonState {
  isHovered: boolean;
  isPressed: boolean;
}