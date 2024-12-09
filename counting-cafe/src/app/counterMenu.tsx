import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';

// Define action types
type ActionType = 'delete' | 'reset' | 'viewID';

const ThreeDotMenu = ({ id, onDelete }: { id: string, onDelete: (id: string) => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
      default:
        // TypeScript ensures all cases are handled
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
      </Menu>
    </div>
  );
};

export default ThreeDotMenu;
