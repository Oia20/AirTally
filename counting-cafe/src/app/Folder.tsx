// folder.tsx
import { useState } from "react";
import Counter from "./counter";
import { FolderProps } from "./types";
import { v4 as uuidv4 } from 'uuid';

const Folder = ({ id, title, counters, onDelete, onAddCounter, onDeleteCounter }: FolderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isAddingCounter, setIsAddingCounter] = useState(false);
  const [newCounterName, setNewCounterName] = useState("");

  const handleAddCounter = () => {
    if (newCounterName.trim()) {
      onAddCounter(id, {
        id: uuidv4(),
        name: newCounterName,
        incrementBy: 1,
        initialValue: 0,
      });
      setNewCounterName("");
      setIsAddingCounter(false);
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
              onDelete(id);
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
                onClick={handleAddCounter}
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
                onDelete={() => onDeleteCounter(id, counter.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;