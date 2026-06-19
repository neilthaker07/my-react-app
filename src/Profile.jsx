import React, { useContext } from 'react';
import { GlobalContext } from './App';
import { useLocalStorage } from './useLocalStorage';

export default function Profile() {
  // Acts exactly like useState, but saves to 'user-name' in the browser
  const [name, setName] = useLocalStorage('user-name', 'Guest');
  const { user } = useContext(GlobalContext);
  
  // You can store complex objects or arrays too!
  const [theme, setTheme] = useLocalStorage('app-theme', { mode: 'light' });

  const toggleTheme = () => {
    setTheme(prev => ({ mode: prev.mode === 'light' ? 'dark' : 'light' }));
  };

  return (
    <div style={{ background: theme.mode === 'light' ? '#fff' : '#333', color: theme.mode === 'light' ? '#000' : '#fff', padding: '20px' }}>
      <h2>Profile Settings</h2>
      <h1>Welcome, {user.name}</h1>
      <label>
        Name: 
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </label>

      <div style={{ marginTop: '20px' }}>
        <p>Current Theme: {theme.mode}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>

      <p style={{ marginTop: '30px', fontSize: '0.9em', color: 'gray' }}>
        <em>Refresh the page! Your name and theme will survive the reload.</em>
      </p>
    </div>
  );
}