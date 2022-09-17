import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  fallbackValue: T
): [T, (value: T | ((stations: T) => T)) => void] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return fallbackValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if (item === null) {
        // If nothing is set until now, use fallbackValue
        window.localStorage.setItem(key, JSON.stringify(fallbackValue));
      }
      return item ? JSON.parse(item) : fallbackValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return fallbackValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((stations: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
