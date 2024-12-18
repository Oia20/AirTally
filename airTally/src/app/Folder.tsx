// folder.tsx
import { useState, useContext, useEffect, useRef } from "react";
import Counter from "./counter";
import { FolderProps } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { FolderContext } from "./folderContext";
import { useTheme } from "./themeContext";
import { useAuth } from "./authContext";
import { 
  CircularProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button,
  IconButton, 
  Menu, 
  MenuItem,
  Tooltip
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

const Folder = ({ id, title, counters, onDelete, onAddCounter, onDeleteCounter }: FolderProps) => {
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isAddingCounter, setIsAddingCounter] = useState(false);
  const [newCounterName, setNewCounterName] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { newCounterLoading, folderId, setFolderId } = useContext(FolderContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { viewMode, setViewMode } = useContext(FolderContext);
  const [folderViewMode, setFolderViewMode] = useState<'card' | 'compact'>('card');
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => setAnchorEl(null);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  useEffect(() => {
    const fetchFolderViewMode = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(`/api/folders/getViewMode?folderId=${id}`);
          const data = await response.json();
          setFolderViewMode(data.viewMode || 'card');
        } catch (error) {
          console.error('Error fetching folder view mode:', error);
        }
      }
    };
    fetchFolderViewMode();
  }, [id, isAuthenticated]);

  const handleViewModeChange = async (mode: 'card' | 'compact') => {
    setFolderViewMode(mode);
    if (isAuthenticated) {
      try {
        await fetch('/api/folders/updateViewMode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ viewMode: mode, folderId: id })
        });
      } catch (error) {
        console.error('Error updating view mode:', error);
      }
    }
  };

  const handleViewModeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMode = folderViewMode === 'card' ? 'compact' : 'card';
    handleViewModeChange(newMode);
  };

  function GradientCircularProgress() {
    return (
      <CircularProgress 
        sx={{ 
          color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(192, 38, 211)',
          transition: 'color 0.2s'
        }} 
      />
    );
  }
  
  const handleAddCounter = () => {
    if (newCounterName.trim()) {
      setFolderId(id);
      onAddCounter(id, {
        id: uuidv4(),
        name: newCounterName,
        incrementBy: 1,
        count: 0,
        initialValue: 0,
        step: 1,
      });
      setNewCounterName("");
    }
    setIsAddingCounter(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddingCounter && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingCounter]);

  return (
    <div className={`${
      isDarkMode 
        ? 'bg-gray-800/90 border-gray-700' 
        : 'bg-gray-100/90 border-gray-200'
    } p-4 sm:p-6 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md`}>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className={`text-xl font-medium ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          } transition-colors duration-200`}>
            {title}
          </h2>
          <KeyboardArrowDownIcon 
            className={`ml-2 ${
              isDarkMode ? 'text-violet-400' : 'text-violet-500'
            } transition-all duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } opacity-50 group-hover:opacity-100`}
          />
        </div>
        <div className="flex gap-2">
          {isOpen && (
            <Tooltip title={folderViewMode === 'card' ? 'Compact View' : 'Card View'}>
              <IconButton
                onClick={handleViewModeClick}
              size="small"
              sx={{
                color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
                }
              }}
            >
              {folderViewMode === 'card' ? <ViewListIcon /> : <ViewModuleIcon />}
              </IconButton>
            </Tooltip>
          )}
          {isOpen && (
            <Tooltip title="Add Counter">
              <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsAddingCounter(true);
              }}
              size="small"
              sx={{
                color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
                }
              }}
            >
              <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
              }
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="folder-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDeleteDialog();
                handleClose();
              }}
              sx={{ 
                color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(248, 113, 113, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                }
              }}
            >
              Delete Folder
            </MenuItem>
          </Menu>
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 space-y-6">
          {isAddingCounter && (
            <div className="flex gap-2 items-center sm:flex-row flex-col">
              <input
                ref={inputRef}
                type="text"
                value={newCounterName}
                onChange={(e) => setNewCounterName(e.target.value)}
                placeholder="Counter name"
                className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-violet-400/20' 
                    : 'bg-white border-gray-200 text-gray-900 focus:ring-violet-500/20'
                  } transition-colors duration-200`}
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleAddCounter}
                  variant="contained"
                sx={{
                  backgroundColor: isDarkMode ? 'rgb(232, 121, 249)' : 'rgb(192, 38, 211)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgb(217, 70, 239)' : 'rgb(134, 25, 143)'
                  }
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => setIsAddingCounter(false)}
                variant="text"
                sx={{
                  color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
                  }
                }}
              >
                Cancel
                </Button>
              </div>  
            </div>
          )}
          <div className={`${
            folderViewMode === 'card' 
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6' 
              : 'space-y-2'
          }`}>
            {counters.map((counter) => (
              <Counter
                key={counter.id}
                {...counter}
                initialValue={counter.count}
                incrementBy={counter.step}
                onDelete={() => onDeleteCounter(id, counter.id)}
                viewMode={folderViewMode}
              />
            ))}
            {newCounterLoading && folderId === id && (
              <div className={`flex justify-center items-center p-6 rounded-xl shadow-sm w-full transition-all hover:shadow-md border
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
                }`}>
                <GradientCircularProgress />
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
            color: isDarkMode ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)'
          }
        }}
      >
        <DialogTitle>Delete Folder?</DialogTitle>
        <DialogContent>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Are you sure you want to delete "{title}"? This action cannot be undone and all counters in this folder will be deleted.
          </p>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDeleteDialog}
            sx={{
              color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onDelete(id);
              handleCloseDeleteDialog();
            }}
            sx={{
              color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)'
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Folder;