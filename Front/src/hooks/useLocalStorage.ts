import { useState } from 'react';

function getInitialLocalStorageValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  const item = window.localStorage.getItem(key);
  if (!item) {
    return initialValue;
  }

  try {
    return JSON.parse(item) as T;
  } catch {
    return initialValue;
  }
}

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => getInitialLocalStorageValue(key, initialValue));

  const setValue = (value: T | ((prevValue: T) => T)) => {
    const nextValue = value instanceof Function ? value(storedValue) : value;
    setStoredValue(nextValue);
    window.localStorage.setItem(key, JSON.stringify(nextValue));
  };

  return [storedValue, setValue] as const;
}
