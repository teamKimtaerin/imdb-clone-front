import { useState, useCallback } from 'react';

export const useButtonState = (disabled?: boolean, loading?: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!disabled && !loading) {
      setIsHovered(true);
    }
  }, [disabled, loading]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  }, [disabled, loading]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    state: { isHovered, isPressed },
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
  };
};
