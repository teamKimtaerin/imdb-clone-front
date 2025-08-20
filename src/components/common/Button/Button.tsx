import { ReactNode } from 'react';
import { ButtonContent, IconProps } from './ButtonContent';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: IconProps | ReactNode;
  endIcon?: IconProps | ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  rounded = false,
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    rounded ? 'btn-rounded' : 'btn-pill',
    fullWidth ? 'btn-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading || startIcon || endIcon ? (
        <ButtonContent loading={loading} startIcon={startIcon} endIcon={endIcon}>
          {children}
        </ButtonContent>
      ) : (
        children
      )}
    </button>
  );
};
