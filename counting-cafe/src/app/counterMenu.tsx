import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';

// Define action types
type ActionType = 'delete' | 'reset' | 'viewID' | 'setCounter';

interface SetCounterValueModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  onSetValue: (id: string, value: number) => void;
}

const SetCounterValueModal = ({ open, onClose, id, onSetValue }: SetCounterValueModalProps) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

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
    <Dialog open={open} onClose={onClose}>
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Set Value</Button>
      </DialogActions>
    </Dialog>
  );
};

const ThreeDotMenu = ({ 
  id, 
  onDelete,
  onSetValue 
}: { 
  id: string, 
  onDelete: (id: string) => void,
  onSetValue: (id: string, value: number) => void 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [setValueModalOpen, setSetValueModalOpen] = useState(false);
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
        onDelete(id);
        break;
      case 'viewID':
        navigator.clipboard.writeText(id);
        break;
      case 'setCounter':
        setSetValueModalOpen(true);
        break;
      default:
        throw new Error('Unhandled action type');
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
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
      >
        <MenuItem onClick={() => handleAction('delete')}>Delete</MenuItem>
        <MenuItem onClick={() => handleAction('viewID')}>Copy ID</MenuItem>
        <MenuItem onClick={() => handleAction('setCounter')}>Set Counter Value</MenuItem>
      </Menu>
      <SetCounterValueModal
        open={setValueModalOpen}
        onClose={() => setSetValueModalOpen(false)}
        id={id}
        onSetValue={onSetValue}
      />
    </div>
  );
};

export default ThreeDotMenu;
