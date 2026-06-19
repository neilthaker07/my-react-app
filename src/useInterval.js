import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 1. Remember the latest callback if it changes.
  // We use a ref so we can update it without triggering a re-render.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 2. Set up the actual interval.
  useEffect(() => {
    // If delay is null, we don't run the interval (useful for pausing)
    if (delay !== null) {
      const id = setInterval(() => {
        // Call the freshest version of the function
        savedCallback.current();
      }, delay);
      
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(id);
    }
  }, [delay]);
}