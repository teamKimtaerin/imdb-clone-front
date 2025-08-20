'use client';


import { useState } from 'react';
import { ButtonProps } from '@/types/button';
import { ButtonContent } from './ButtonContent';
import { getButtonStyles } from './buttonStyles';


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
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = getButtonStyles(
    variant,
    size,
    { isHovered, isPressed },
    {
      rounded,
      fullWidth,
      disabled,
      loading,
      hasChildren: !!children,
      style,
    },
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
      <ButtonContent loading={loading} startIcon={startIcon} endIcon={endIcon} size={size}>
        {children}
      </ButtonContent>
    </button>
  );
};
