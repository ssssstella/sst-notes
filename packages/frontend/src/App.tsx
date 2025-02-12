import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // for mobile, select, textarea and input need to be font-size 1rem , input width 100%
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10">
      <div className="">
        <h1 className='text-red-500'>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
