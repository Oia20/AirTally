// counter.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { CounterProps } from "./types";
import { useAuth } from "./authContext";
import { useTheme } from "./themeContext";
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CounterMenu from "./counterMenu";

const Counter = ({ id, name, incrementBy, initialValue, onDelete, viewMode = 'card' }: CounterProps) => {
  const { isDarkMode } = useTheme();
  const [count, setCount] = useState<number>(initialValue);
  const [step, setStep] = useState<number | null>(incrementBy);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const storageKey = `counter_${id}`;
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setCount(parsed.count ?? initialValue);
          setStep(parsed.step ?? incrementBy);
        }
      } catch (error) {
        console.error('Error loading counter data:', error);
        setCount(initialValue);
        setStep(incrementBy);
      }
    }
  }, [id, isAuthenticated, initialValue, incrementBy]);

  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const storageKey = `counter_${id}`;
        localStorage.setItem(storageKey, JSON.stringify({
          id,
          count,
          step,
          name,
          incrementBy
        }));
      } catch (error) {
        console.error('Error saving counter data:', error);
      }
    }
  }, [count, step, id, isAuthenticated, name, incrementBy]);

  useEffect(() => {
    return () => {
      if (!isAuthenticated) {
        localStorage.removeItem(`counter_${id}`);
      }
    };
  }, [id, isAuthenticated]);

  const handleOpenResetDialog = () => setOpenResetDialog(true);
  const handleCloseResetDialog = () => setOpenResetDialog(false);

  const deleteCounter = async (id: string) => {
    onDelete(id);
    if (isAuthenticated) {
      await fetch('/api/counters/deleteCounter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } else {
      localStorage.removeItem(`counter_${id}`);
    }
  };

  const updateStep = async (id: string, step: number | null) => {
    setStep(step);
    if (isAuthenticated && step !== null) {
      await fetch('/api/counters/updateStep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, step }),
      });
    }
  };

  const setStepValue = (id: string, step: number | null) => {
    setStep(step);
    if (isAuthenticated && step !== null) {
      updateStep(id, step);
    }
  };

  const setCounterValue = async (id: string, value: number) => {
    setCount(value);
    if (isAuthenticated) {
      const response = await fetch('/api/counters/incrementCounter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, count: value }),
      });
      if (!response.ok) throw new Error('Failed to set counter value');
    }
  };

  const incrementCounter = async (id: string, updatedCount: number) => {
    const response = await fetch('/api/counters/incrementCounter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, count: updatedCount }),
    });
    if (!response.ok) throw new Error('Failed to increment counter');
    return await response.json();
  };

  const increment = useCallback(async (id: string) => {
    const newCount = count + (step || 1);
    setCount(newCount);
    if (isAuthenticated) {
      try {
        await incrementCounter(id, newCount);
      } catch (error) {
        console.error(error);
      }
    }
  }, [count, step, isAuthenticated]);

  const decrement = useCallback(async (id: string) => {
    const newCount = count - (step || 1);
    setCount(newCount);
    if (isAuthenticated) {
      try {
        await incrementCounter(id, newCount);
      } catch (error) {
        console.error(error);
      }
    }
  }, [count, step, isAuthenticated]);

  const reset = async () => {
    setCount(0);
    if (isAuthenticated) {
      await fetch('/api/counters/resetCounter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    }
  };

  if (viewMode === 'compact') {
    return (
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-gray-100/80 border-gray-200'
      } p-3 rounded-lg shadow-sm w-full transition-all duration-200 hover:shadow-md border backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {name}
          </h3>
          
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => decrement(id)}
              disabled={count <= 0}
              size="small"
              sx={{
                color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
                padding: '4px',
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            
            <span className={`text-lg font-semibold min-w-[3ch] text-center ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {count}
            </span>
            
            <IconButton
              onClick={() => increment(id)}
              size="small"
              sx={{
                color: isDarkMode ? 'rgb(232, 121, 249)' : 'rgb(192, 38, 211)',
                padding: '4px',
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            
            <CounterMenu id={id} onDelete={deleteCounter} onSetValue={setCounterValue} onSetStep={setStepValue} compact onReset={reset} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${
      isDarkMode 
        ? 'bg-gray-800/80 border-gray-700' 
        : 'bg-gray-100/80 border-gray-200'
    } p-4 sm:p-6 rounded-xl shadow-sm w-full transition-all duration-200 hover:shadow-md border backdrop-blur-sm`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-medium ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {name}
        </h3>
        <CounterMenu id={id} onDelete={deleteCounter} onSetValue={setCounterValue} onSetStep={setStepValue} onReset={reset} />
      </div>

      <div className="flex justify-between items-center gap-3 sm:gap-4">
        <IconButton
          onClick={() => decrement(id)}
          disabled={count <= 0}
          sx={{
            color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
            backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.15)' : 'rgba(139, 92, 246, 0.15)'
            },
            '&.Mui-disabled': {
              color: isDarkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(139, 92, 246, 0.3)'
            },
            transition: 'all 0.2s',
            padding: '12px',
          }}
        >
          <RemoveIcon />
        </IconButton>
        
        <div className={`text-3xl sm:text-4xl font-semibold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        } transition-colors duration-200`}>
          {count}
        </div>
        
        <IconButton
          onClick={() => increment(id)}
          sx={{
            color: isDarkMode ? 'rgb(232, 121, 249)' : 'rgb(192, 38, 211)',
            backgroundColor: isDarkMode ? 'rgba(232, 121, 249, 0.1)' : 'rgba(192, 38, 211, 0.1)',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(232, 121, 249, 0.2)' : 'rgba(192, 38, 211, 0.2)'
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Tooltip title="Reset Counter">
          <IconButton
            onClick={handleOpenResetDialog}
            size="small"
            sx={{
              color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
              }
            }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Step:
          </span>
          <input
            type="number"
            value={step === null ? '' : step}
            onChange={(e) => {
              const value = e.target.value === '' ? null : Math.max(1, Number(e.target.value));
              updateStep(id, value);
            }}
            className={`w-16 px-2 py-1 border rounded-md text-center ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                : 'bg-white border-gray-200 text-gray-900'
            } focus:outline-none focus:ring-2 ${
              isDarkMode 
                ? 'focus:ring-violet-400/20' 
                : 'focus:ring-violet-500/20'
            }`}
            min="1"
          />
        </div>
      </div>

      <Dialog
        open={openResetDialog}
        onClose={handleCloseResetDialog}
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
            color: isDarkMode ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)'
          }
        }}
      >
        <DialogTitle>Reset Counter?</DialogTitle>
        <DialogContent>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Are you sure you want to reset the "{name}" counter to zero?
          </p>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseResetDialog}
            sx={{
              color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              reset();
              handleCloseResetDialog();
            }}
            sx={{
              color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)'
            }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Counter;