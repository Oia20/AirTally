// folder.tsx
import { useState, useContext } from "react";
import Counter from "./counter";
import { FolderProps } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { FolderContext } from "./folderContext";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const Folder = ({ id, title, counters, onDelete, onAddCounter, onDeleteCounter }: FolderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isAddingCounter, setIsAddingCounter] = useState(false);
  const [newCounterName, setNewCounterName] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { newCounterLoading, folderId, setFolderId } = useContext(FolderContext);

  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  function GradientCircularProgress() {
    return (
      <>
      {/* Adjust colors of counter loading animation here in future. */}
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </>
    );
  }
  
  const handleAddFolder = () => {
    if (newCounterName.trim()) {
      setFolderId(id);
      onAddCounter(id, {
        id: uuidv4(),
        name: newCounterName,
        incrementBy: 1,
        count: 0,
        initialValue: 0,
      });
      setNewCounterName("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-xl font-medium text-gray-900">{title}</h2>
          <span 
            className="ml-2 text-gray-400 transition-transform duration-200" 
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▼
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingCounter(true);
            }}
            className="text-blue-500 hover:text-blue-700 transition-colors px-3 py-1 rounded-md hover:bg-blue-50"
          >
            Add Counter
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDeleteDialog();
            }}
            className="text-red-500 hover:text-red-700 transition-colors px-3 py-1 rounded-md hover:bg-red-50"
          >
            Delete Folder
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 space-y-6">
          {isAddingCounter && (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={newCounterName}
                onChange={(e) => setNewCounterName(e.target.value)}
                placeholder="Counter name"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                autoFocus
              />
              <button
                onClick={handleAddFolder}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingCounter(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {counters.map((counter) => (
              <Counter
                key={counter.id}
                {...counter}
                initialValue={counter.count}
                onDelete={() => onDeleteCounter(id, counter.id)}
              />
            ))}
            {newCounterLoading && folderId === id && (
              <div className="flex justify-center items-center">
                <GradientCircularProgress />
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the folder "{title}"? This action cannot be undone and all counters in this folder will be deleted.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={() => {
              onDelete(id);
              handleCloseDeleteDialog();
            }} 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Folder;