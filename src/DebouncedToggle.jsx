import React, { useState, useEffect, useMemo } from 'react';

// Memoization
const sortThousandsOfProducts = (items) => {
  console.log("Sorting massive array... (This takes 500ms)");
  return [...items].sort((a, b) => a.price - b.price);
};

export default function DebouncedToggle() {
  // 1. The instant state for the UI toggle
  const [isOn, setIsOn] = useState(false);
  const products = [];
  
  // 2. The delayed state for side-effects
  const [debouncedState, setDebouncedState] = useState(false);

  // Handle the click instantly for a snappy UI
  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  // Make API call after 1000ms - which can be useful for ex - YouTube search - once user types 
  // something for 300ms then make api call to show suggestions. Not on every character type
  // This reduces unnecessary load by 80%
  // 3. The Debounce Logic
  useEffect(() => {
    // Set a timer to update the debounced state after 1000ms
    const timerId = setTimeout(() => {
      setDebouncedState(isOn);
      
      // 👉 PLACE YOUR API CALL HERE
      console.log(`API Call made: Saving state as ${isOn}`);
      
    }, 1000); // Adjust this delay (in milliseconds) as needed

    // 4. The Cleanup Function
    // If 'isOn' changes AGAIN before the 1000ms timer finishes,
    // this cleanup function runs and destroys the previous timer,
    // preventing the old API call from firing.
    return () => {
      clearTimeout(timerId);
    };
  }, [isOn]); // Re-run this effect every time the UI state changes

  const sortedProducts = useMemo(() => {
    return sortThousandsOfProducts(products);
  }, [products]); // <-- The Dependency Array

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <input 
          type="checkbox" 
          checked={isOn} 
          onChange={handleToggle} 
          style={{ width: '24px', height: '24px', marginRight: '10px' }}
        />
        <span>Feature is: <strong>{isOn ? 'ON' : 'OFF'}</strong></span>
      </label>

      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>

      <div style={{ marginTop: '20px', padding: '10px', background: '#f4f4f4' }}>
        <p><strong>Instant UI State:</strong> {String(isOn)}</p>
        <p><strong>Debounced API State:</strong> {String(debouncedState)}</p>
      </div>
    </div>
  );
}