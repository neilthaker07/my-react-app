import React, { useState, useEffect } from 'react';

export default function DebouncedSearch() {
  // 1. The instant state (what the user sees in the text box)
  const [query, setQuery] = useState('');
  
  // 2. The delayed state (what we actually send to the server)
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // 3. UI states for loading and mock results
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // ==========================================
  // EFFECT 1: The Timer (The Debounce Logic)
  // ==========================================
  useEffect(() => {
    // Start a 500ms timer every time the user hits a key
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    // CLEANUP: If they hit another key before 500ms is up, destroy the old timer
    return () => {
      clearTimeout(timerId);
    };
  }, [query]); 

  // ==========================================
  // EFFECT 2: The API Call 
  // ==========================================
  useEffect(() => {
    // We only want to search if the user actually typed something
    if (debouncedQuery.trim() !== '') {
      setIsSearching(true);
      
      // 👉 PLACE YOUR REAL FETCH() CALL HERE
      console.log(`📡 Sending API request for: "${debouncedQuery}"`);
      
      // Mocking an API response delay of 800ms
      const fakeApiRequest = setTimeout(() => {
        setResults([
          `${debouncedQuery} tutorial`,
          `${debouncedQuery} for beginners`,
          `Advanced ${debouncedQuery} concepts`
        ]);
        setIsSearching(false);
      }, 800);

      return () => clearTimeout(fakeApiRequest);
      
    } else {
      // If the user clears the search bar, instantly clear the results
      setResults([]);
    }
  }, [debouncedQuery]); // THIS effect only runs when the 500ms timer finishes!

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Search Articles</h2>
      
      {/* The Search Input */}
      <input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />

      {/* Loading Indicator */}
      {isSearching && <p style={{ color: '#888', fontSize: '14px' }}>Searching...</p>}

      {/* The Results List */}
      {!isSearching && results.length > 0 && (
        <ul style={{ background: '#f9f9f9', border: '1px solid #eee', padding: '10px', marginTop: '10px', listStyle: 'none' }}>
          {results.map((result, index) => (
            <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
              🔍 {result}
            </li>
          ))}
        </ul>
      )}
      
      {/* Debugger panel to see the states updating */}
      <div style={{ marginTop: '30px', padding: '10px', background: '#222', color: '#0f0', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace' }}>
        <p>Instant query: "{query}"</p>
        <p>Debounced query: "{debouncedQuery}"</p>
      </div>
    </div>
  );
}