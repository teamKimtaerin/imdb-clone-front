// src/components/common/CategoryTag/CategoryTag.tsx
'use client';

import React, { useState } from 'react';
import { watchaTokens } from '@/styles/tokens';

interface CategoryTagProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ 
  label, 
  isActive = false, 
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const tagStyle: React.CSSProperties = {
    padding: `${watchaTokens.spacing.sm} ${watchaTokens.spacing.md}`,
    background: isActive ? watchaTokens.colors.primary : watchaTokens.colors.surface,
    color: isActive ? watchaTokens.colors.text.primary : watchaTokens.colors.text.secondary,
    border: `1px solid ${isActive ? watchaTokens.colors.primary : watchaTokens.colors.border}`,
    borderRadius: watchaTokens.borderRadius.pill,
    fontSize: watchaTokens.typography.fontSize.sm,
    fontWeight: watchaTokens.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 4px 12px rgba(255, 5, 88, 0.2)' : 'none',
    display: 'inline-block',
    userSelect: 'none' as const
  };
  
  return (
    <button
      style={tagStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};