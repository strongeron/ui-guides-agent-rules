import { useState } from 'react';

function ExpensiveChild({ data }: { data: string }) {
  // Simulate expensive computation
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  // Use void to suppress unused variable warning while keeping the expensive loop
  void sum;

  return <div className="text-sm text-muted-foreground">Child: {data}</div>;
}

export function MinimizeRerendersBad() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Count: {count}
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Type here..."
        />
        <ExpensiveChild data={text} />
      </div>
      <p className="text-xs text-error">
        Expensive child re-renders on every keystroke
      </p>
    </div>
  );
}
