import './App.css'
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  // example - control audio video media
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <video 
        ref={videoRef} 
        src="https://www.w3schools.com/html/mov_bbb.mp4" 
        width="400" 
      />
      <button name="click to toggle" onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <Link to="/about">About Us</Link>

      <h2>Parent Component</h2>
      {/* Example of Error boundary usage */}
      <ErrorBoundary fallback={<div>Failed to load widget.</div>}>
        {/* 2. PROPS DOWN: Passing the data AND the function */}
        <Child 
          currentCount={count} 
          onAction={handleIncrement} 
        />
      </ErrorBoundary>
      
    </div>
  )
}

export default VideoPlayer


// Parent-Child components Easy to manage and pass the props down and events up.
// Production level system - this is important
// example - List of transactions. Each trasction has multiple details. Transaction can be Child
function Child({ currentCount, onAction }) {
  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #ccc' }}>
      <h3>Child Component</h3>
      <p>Data from parent: {currentCount}</p>
      
      {/* 4. EVENTS UP: The child has no idea what 'onAction' does. 
          It just knows to shout "I was clicked!" back up the tree. */}
      <button onClick={onAction}>
        Trigger Event
      </button>
    </div>
  );
}