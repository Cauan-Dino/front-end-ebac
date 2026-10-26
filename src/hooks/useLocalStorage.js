import { useEffect, useState } from 'react';

export function readStoredValue(key, fallback, validate = () => true) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = JSON.parse(raw);
    return validate(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

// Reutilizável com qualquer estado serializável em JSON.
export function useLocalStorage(key, value) {
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [key, value]);
  return { storageError };
}
