import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('useDebounce: value changed to:', value); // 디버깅용
    }

    const handler = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('useDebounce: setting debounced value to:', value); // 디버깅용
      }
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
