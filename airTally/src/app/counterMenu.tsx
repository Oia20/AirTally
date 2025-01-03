import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useTheme } from "./themeContext";

// Define action types
type ActionType = 'delete' | 'reset' | 'viewID' | 'setCounter' | 'setStep';

interface SetCounterValueModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  onSetValue: (id: string, value: number) => void;
}

interface SetStepValueModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  onSetStep: (id: string, step: number | null) => void;
}

interface ResetCounterModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  onReset: (id: string) => void;
}

const ResetCounterModal = ({ open, onClose, id, onReset }: ResetCounterModalProps) => {
  const { isDarkMode } = useTheme();
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
          color: isDarkMode ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)'
        }
      }}
    >
      <DialogTitle>Reset Counter</DialogTitle>
      <DialogContent>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Are you sure you want to reset this counter?
        </p>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => {
            onReset(id);
            onClose();
          }}
          sx={{
            color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)'
          }}
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SetStepValueModal = ({ open, onClose, id, onSetStep }: SetStepValueModalProps) => {
  const { isDarkMode } = useTheme();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    const numValue = Number(value);
    onSetStep(id, numValue);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
          color: isDarkMode ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)'
        }
      }}
    >
      <DialogTitle>Set Step Value</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New Step Value"
          type="number"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{
            '& .MuiInputLabel-root': {
              color: isDarkMode ? 'rgb(156, 163, 175)' : 'inherit'
            },
            '& .MuiInputBase-input': {
              color: isDarkMode ? 'rgb(243, 244, 246)' : 'inherit'
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Set Value</Button>
      </DialogActions>
    </Dialog>
  );
};

const SetCounterValueModal = ({ open, onClose, id, onSetValue }: SetCounterValueModalProps) => {
  const { isDarkMode } = useTheme();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [deletingCounter, setDeletingCounter] = useState<boolean>(false);

  const handleSubmit = () => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }
    onSetValue(id, numValue);
    onClose();
    setValue('');
    setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
          color: isDarkMode ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)'
        }
      }}
    >
      <DialogTitle>Set Counter Value</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New Value"
          type="number"
          fullWidth
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          error={!!error}
          helperText={error}
          sx={{
            '& .MuiInputLabel-root': {
              color: isDarkMode ? 'rgb(156, 163, 175)' : 'inherit'
            },
            '& .MuiInputBase-input': {
              color: isDarkMode ? 'rgb(243, 244, 246)' : 'inherit'
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          sx={{
            color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
          }}
        >
          Set Value
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Add new DeleteConfirmationModal component
interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({ open, onClose, onConfirm }: DeleteConfirmationModalProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
          color: isDarkMode ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)'
        }
      }}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Are you sure you want to delete this counter?
        </p>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          sx={{
            color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)'
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface CounterMenuProps {
  id: string;
  onDelete: (id: string) => void;
  onSetValue: (id: string, value: number) => void;
  onSetStep: (id: string, step: number | null) => void;
  compact?: boolean;
  onReset: (id: string) => void;
}

const CounterMenu = ({ id, onDelete, onSetValue, onSetStep, compact, onReset }: CounterMenuProps) => {
  const { isDarkMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [setValueModalOpen, setSetValueModalOpen] = useState(false);
  const [setStepModalOpen, setSetStepModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Add state for delete modal
  const [resetModalOpen, setResetModalOpen] = useState(false); // Add state for reset modal
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: ActionType) => {
    handleClose();
    switch (action) {
      case 'delete':
        setDeleteModalOpen(true); // Open delete confirmation modal instead of deleting directly
        break;
      case 'viewID':
        navigator.clipboard.writeText(id);
        break;
      case 'setCounter':
        setSetValueModalOpen(true);
        break;
      case 'setStep':
        setSetStepModalOpen(true);
        break;
      case 'reset':
        setResetModalOpen(true);
        break;
      default:
        throw new Error('Unhandled action type');
    }
  };


  return (
    <div>
      <IconButton 
        onClick={handleClick}
        sx={{
          color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
          }
        }}
      >
        <MoreVertSharpIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
              borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
            }
          }
        }}
      >
        <MenuItem 
          onClick={() => handleAction('delete')}
          sx={{ 
            color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(248, 113, 113, 0.1)' : 'rgba(239, 68, 68, 0.1)'
            }
          }}
        >
          Delete
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('viewID')}
          sx={{ 
            color: isDarkMode ? 'rgb(243, 244, 246)' : 'inherit',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
            }
          }}
        >
          Copy ID
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('setCounter')}
          sx={{ 
            color: isDarkMode ? 'rgb(243, 244, 246)' : 'inherit',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
            }
          }}
        >
          Set Counter Value
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('reset')}
          sx={{ 
            color: isDarkMode ? 'rgb(243, 244, 246)' : 'inherit',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
            }
          }}
        >
          Reset Counter
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('setStep')}
          sx={{ 
            color: isDarkMode ? 'rgb(243, 244, 246)' : 'inherit',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
            }
          }}
        >
          Set Step Value
        </MenuItem>
      </Menu>
      <SetCounterValueModal
        open={setValueModalOpen}
        onClose={() => setSetValueModalOpen(false)}
        id={id}
        onSetValue={onSetValue}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => onDelete(id)}
      />
      <SetStepValueModal
        open={setStepModalOpen}
        onClose={() => setSetStepModalOpen(false)}
        id={id}
        onSetStep={onSetStep}
      />
      <ResetCounterModal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        id={id}
        onReset={onReset}
      />
    </div>
  );
};

export default CounterMenu;
