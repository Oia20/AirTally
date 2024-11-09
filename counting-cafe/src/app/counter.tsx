// counter.tsx
"use client";

import { useState, useCallback } from "react";
import { CounterProps } from "./types";

const Counter = ({ id, name, incrementBy = 1, initialValue = 0, onDelete }: CounterProps) => {
  const [count, setCount] = useState<number>(initialValue);
  const [step, setStep] = useState<number>(incrementBy);

  const increment = useCallback(() => setCount(prev => prev + step), [step]);
  const decrement = useCallback(() => setCount(prev => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full transition-all hover:shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          aria-label="Delete counter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={decrement}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          disabled={count <= 0}
        >
          <span className="text-xl">−</span>
        </button>
        <div className="text-3xl font-semibold text-gray-900">{count}</div>
        <button
          onClick={increment}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <span className="text-xl">+</span>
        </button>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm">
        <button
          onClick={reset}
          className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
        >
          Reset
        </button>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Step:</span>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
            className="w-16 px-2 py-1 border rounded-md text-center text-gray-900"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default Counter;