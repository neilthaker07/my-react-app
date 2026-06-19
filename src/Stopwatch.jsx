import { useState } from 'react';
import { useInterval } from './useInterval';

export default function Stopwatch() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Use the custom hook!
  // If isRunning is true, delay is 1000ms. If false, delay is null (which pauses it).
  useInterval(() => {
    // This now works perfectly and has access to the freshest state
    setCount(count + 1);
  }, isRunning ? 1000 : null);

  return (
    <div>
      <h1>{count} seconds</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}