// folders.tsx
"use client";

import { useState } from "react";
import Folder from "./Folder";
import { CounterProps, FolderProps } from "./types";
import { v4 as uuidv4 } from 'uuid';

const initialFolders: FolderProps[] = [
  
];

// Modify the component definition to accept props
const Folders = ({ 
  isAddingFolder, 
  setIsAddingFolder 
}: { 
  isAddingFolder: boolean; 
  setIsAddingFolder: (value: boolean) => void;
}) => {
  const [folders, setFolders] = useState<FolderProps[]>(initialFolders);
  const [newFolderTitle, setNewFolderTitle] = useState("");

  // Rest of the code remains the same...
  const addFolder = () => {
    if (newFolderTitle.trim()) {
      setFolders([
        ...folders,
        {
          id: uuidv4(),
          title: newFolderTitle,
          counters: [],
          onDelete: function (id: string): void {
            throw new Error("Function not implemented.");
          },
          onAddCounter: function (folderId: string, counter: Omit<CounterProps, "onDelete">): void {
            throw new Error("Function not implemented.");
          },
          onDeleteCounter: function (folderId: string, counterId: string): void {
            throw new Error("Function not implemented.");
          }
        },
      ]);
      setNewFolderTitle("");
      setIsAddingFolder(false);
    }
  };

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter((folder) => folder.id !== folderId));
  };

  const addCounter = (folderId: string, counter: Omit<CounterProps, 'onDelete'>) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, counters: [...folder.counters, { ...counter, onDelete: () => {} } as CounterProps] }
          : folder
      )
    );
  };

  const deleteCounter = (folderId: string, counterId: string) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              counters: folder.counters.filter((counter) => counter.id !== counterId),
            }
          : folder
      )
    );
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">Counting Café</h1>
            <p className="text-gray-500">Track and count anything you want</p>
          </header>

          {isAddingFolder && (
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                value={newFolderTitle}
                onChange={(e) => setNewFolderTitle(e.target.value)}
                placeholder="Folder name"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                autoFocus
              />
              <button
                onClick={addFolder}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingFolder(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="space-y-6">
            {folders.map((folder) => (
              <Folder
                key={folder.id}
                {...folder}
                onDelete={deleteFolder}
                onAddCounter={addCounter}
                onDeleteCounter={deleteCounter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Folders;