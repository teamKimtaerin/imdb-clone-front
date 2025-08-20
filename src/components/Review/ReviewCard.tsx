import React from 'react';
import { StarRating } from '@/components/common/StarRating/StarRating';

interface ReviewCardProps {
  review: {
    _id: string;
    title: string;
    rating: number;
    content: string;
    user: {
      nickname: string;
    };
    created_at: string;
  };
  currentUserId?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  deleteLoading?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  currentUserId,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  const { title, rating, content, user, created_at } = review;

  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  };

  const nicknameStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const dateStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#666',
  };

  const contentStyle: React.CSSProperties = {
    marginTop: '12px',
    fontSize: '14px',
    lineHeight: '1.5',
  };

  const actionButtonStyle: React.CSSProperties = {
    marginRight: '8px',
    fontSize: '12px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#007bff',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <span style={nicknameStyle}>{user.nickname}</span>
        <span style={dateStyle}>{new Date(created_at).toLocaleDateString()}</span>
      </div>

      <h3>{title}</h3>
      <StarRating value={review.rating} readonly size="md" />

      <p style={contentStyle}>{content}</p>

      {currentUserId && (
        <div>
          {onEdit && (
            <button style={actionButtonStyle} onClick={() => onEdit(review._id)}>
              수정
            </button>
          )}
          {onDelete && (
            <button
              style={actionButtonStyle}
              onClick={() => onDelete(review._id)}
              disabled={deleteLoading}
            >
              {deleteLoading ? '삭제 중...' : '삭제'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
