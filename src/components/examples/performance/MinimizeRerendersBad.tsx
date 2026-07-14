import { useState, useRef } from 'react';

function ExpensiveChild({ data }: { data: string }) {
  const renders = useRef(0);
  renders.current += 1;

  let sum = 0;
  for (let i = 0; i < 1000000; i++) sum += i;
  void sum;

  return (
    <div className="mt-3 flex items-center justify-between rounded-md bg-muted px-2 py-1.5 text-xs">
      <span className="text-muted-foreground">Child: {data || 'empty'}</span>
      <span className="font-medium tabular-nums text-destructive">renders: {renders.current}</span>
    </div>
  );
}

export function MinimizeRerendersBad() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 mb-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Count: {count}
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Type here..."
        />
        <ExpensiveChild data={text} />
      </div>
      <p className="text-xs text-destructive">
        Click Count and watch the counter climb: the expensive child re-renders every time, even though its
        <code> data</code> never changed
      </p>
    </div>
  );
}
