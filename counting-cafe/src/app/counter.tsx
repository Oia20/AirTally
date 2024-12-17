// counter.tsx
"use client";

import { useState, useCallback } from "react";
import { CounterProps } from "./types";
import { useAuth } from "./authContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CounterMenu from "./counterMenu";

const Counter = ({ id, name, incrementBy , initialValue, onDelete }: CounterProps) => {
  const [count, setCount] = useState<number>(initialValue);
  const [step, setStep] = useState<number>(incrementBy);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleOpenResetDialog = () => setOpenResetDialog(true);
  const handleCloseResetDialog = () => setOpenResetDialog(false);

  // Delete counter, implement into popup like this onClick={() => deleteCounter(id)}
  const deleteCounter = async (id: string) => {
    onDelete(id);
    if (isAuthenticated) {
      const response = await fetch('/api/counters/deleteCounter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
    }
  };

  const updateStep = async (id: string, step: number) => {
    setStep(step);
    if (isAuthenticated) {
      const response = await fetch('/api/counters/updateStep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, step }),
      });
    }
  };

  const setCounterValue = async (id: string, value: number) => {
    setCount(value);
    if (isAuthenticated) {
      const response = await fetch('/api/counters/incrementCounter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, count: value }),
      });
      if (!response.ok) {
        throw new Error('Failed to set counter value');
      }
    }
  };

  const incrementCounter = async (id: string, updatedCount: number) => {
    console.log(id, updatedCount, step, "sassasasasasas");
    const response = await fetch('/api/counters/incrementCounter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, count: updatedCount }),
    });

    if (!response.ok) {
      throw new Error('Failed to increment counter');
    }

    const updatedCounter = await response.json();
    return updatedCounter;
  };

  const increment = useCallback(async (id: string) => {
    const newCount = count + step;
    setCount(newCount);
    if (isAuthenticated) {
      try {
        await incrementCounter(id, newCount);
      } catch (error) {
        console.error(error);
      }
    }
  }, [count, step]);

  const decrement = useCallback(async (id: string) => {
    const newCount = count - step;
    setCount(newCount);
    if (isAuthenticated) {
      try {
        await incrementCounter(id, newCount);
      } catch (error) {
        console.error(error);
      }
    }
  }, [count, step]);

  const reset = async () => {
    if (isAuthenticated) {
      setCount(0);
      const response = await fetch('/api/counters/resetCounter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
    }
  };


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full transition-all hover:shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>

        {/* Delete counter, implement into popup like this onClick={() => deleteCounter(id)} */}
        <CounterMenu id={id} onDelete={deleteCounter} onSetValue={setCounterValue} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button
          onClick={() => decrement(id)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          disabled={count <= 0}
        >
          <span className="text-xl">−</span>
        </Button>
        <div className="text-3xl font-semibold text-gray-900">{count}</div>
        <Button
          onClick={() => increment(id)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <span className="text-xl">+</span>
        </Button>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm">
        <button
          onClick={handleOpenResetDialog}
          className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
        >
          Reset
        </button>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Step:</span>
          <input
            type="number"
            value={step}
            onChange={(e) => updateStep(id, Math.max(1, Number(e.target.value)))}
            className="w-16 px-2 py-1 border rounded-md text-center text-gray-900"
            min="1"
          />
        </div>
      </div>

      <Dialog
        open={openResetDialog}
        onClose={handleCloseResetDialog}
        aria-labelledby="reset-dialog-title"
      >
        <DialogTitle id="reset-dialog-title">Confirm Reset</DialogTitle>
        <DialogContent>
          Are you sure you want to reset the {name} counter?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetDialog}>Cancel</Button>
          <Button 
            onClick={() => {
              reset();
              handleCloseResetDialog();
            }} 
            color="error"
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Counter;