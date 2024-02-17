import { useState, useEffect } from 'react';

// This is a custom hook that allows you to use localStorage as a state in your React components.
const useLocalStorage = (key, initialValue) => {
  // We're using useState here to create a state variable with the initial value from localStorage if it exists, otherwise use the provided initial value.
  const [value, setValue] = useState(() => {
    try {
      // Try to get the value from localStorage.
      const localValue = window.localStorage.getItem(key);
      // If the value exists in localStorage, parse it to JSON and return it. Otherwise, return the initial value.
      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (error) {
      // If there is an error (like if JSON.parse fails), return the initial value.
      return initialValue;
    }
  });

  // This effect runs when the key or value changes.
  useEffect(() => {
    // When the key or value changes, we update localStorage.
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return the value and the function to set the value, so they can be used in the component.
  return [value, setValue];
};

export default useLocalStorage;