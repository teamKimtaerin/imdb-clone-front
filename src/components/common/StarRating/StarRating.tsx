import React, { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  value: number;
  onChange?: (newValue: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = 'md',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (readonly) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    let newRating = 0;
    if (x < width / 2) {
      newRating = index + 0.5;
    } else {
      newRating = index + 1;
    }
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const handleClick = (ratingValue: number) => {
    if (readonly || !onChange) return;
    onChange(ratingValue);
  };

  const displayedRating = readonly ? value : hoverRating || value;

  // 읽기 전용 별 렌더링
  const renderReadonlyStar = (index: number) => {
    const fullNumber = index + 1;
    let starClass = `star ${size}`;

    if (value >= fullNumber) {
      starClass += ' full readonly';
    } else if (value >= fullNumber - 0.5) {
      starClass += ' half readonly';
    } else {
      starClass += ' empty readonly';
    }

    return <span key={index} className={starClass} />;
  };

  // 인터랙티브 별 렌더링
  const renderInteractiveStar = (index: number) => {
    const fullNumber = index + 1;
    let starClass = `star ${size}`;

    if (displayedRating >= fullNumber) {
      starClass += ' full';
    } else if (displayedRating >= fullNumber - 0.5) {
      starClass += ' half';
    } else {
      starClass += ' empty';
    }

    return (
      <span
        key={index}
        className={starClass}
        style={{ cursor: 'pointer' }}
        onMouseMove={(e) => handleMouseMove(index, e)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(hoverRating || value)}
      />
    );
  };

  return (
    <div className={`star-rating ${size}`}>
      {readonly
        ? Array.from({ length: 5 }, (_, index) => renderReadonlyStar(index))
        : Array.from({ length: 5 }, (_, index) => renderInteractiveStar(index))}
    </div>
  );
};
