import { useEffect, useMemo, useState } from 'react';

const useDebounce = <T extends unknown>(
  delay: number = 500,
  initialValue: T
): {
  debouncedValue: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  isDebouncing: boolean;
} => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const isDebouncing = useMemo<boolean>(
    () => debouncedValue !== value,
    [debouncedValue, value]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, setValue, isDebouncing };
};

export default useDebounce;
