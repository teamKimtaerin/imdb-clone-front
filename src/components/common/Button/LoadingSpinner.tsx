import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'sm' }) => {
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  };

  const spinnerSize = sizeMap[size];

  return (
    <>
      <svg
        width={spinnerSize}
        height={spinnerSize}
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
      </svg>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
