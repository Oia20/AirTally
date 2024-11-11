// folders.tsx
"use client";

import { useState, useEffect } from "react";
import Folder from "./Folder";
import { CounterProps, FolderProps } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { FolderContext } from "./folderContext";

const Folders = () => {
  const { isAddingFolder, setIsAddingFolder } = useContext(FolderContext);
  const [folders, setFolders] = useState<FolderProps[]>([]);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  
  interface DatabaseCounter {
    id: number;
    name: string;
    increment: number;
    initial: number;
  }
  interface DatabaseFolder {
    id: number;
    title: string;
    counters: DatabaseCounter[];
  }
  const fetchFolders = async () => {
    const response = await fetch('/api/folders');
    const data: DatabaseFolder[] = await response.json();
    setFolders(data.map(mapDatabaseFolder));
  };

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);



  const mapDatabaseFolder = (dbFolder: any): FolderProps => ({
    id: dbFolder.id.toString(),
    title: dbFolder.title,
    counters: dbFolder.counters.map((counter: any) => ({
      id: counter.id.toString(),
      name: counter.name,
      incrementBy: counter.increment,
      initialValue: counter.initial,
      onDelete: () => {},
    })),
    onDelete: () => {},
    onAddCounter: () => {},
    onDeleteCounter: () => {},
  });

  const addFolder = async () => {
    if (newFolderTitle.trim()) {
      // Optimistic update
      const tempId = uuidv4();
      const newFolder = {
        id: tempId,
        title: newFolderTitle,
        counters: [],
        onDelete: () => {},
        onAddCounter: () => {},
        onDeleteCounter: () => {},
      };
      setFolders([...folders, newFolder]);

      // API call
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newFolderTitle }),
      });

      if (response.ok) {
        fetchFolders(); // Refresh to get the actual database ID
      }

      setNewFolderTitle("");
      setIsAddingFolder(false);
    }
  };

  const deleteFolder = async (folderId: string) => {
    // Optimistic update
    setFolders(folders.filter((folder) => folder.id !== folderId));

    // API call
    await fetch(`/api/folders?id=${folderId}`, {
      method: 'DELETE',
    });
  };

  // ... rest of the component remains similar but with API calls
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
            <p className="text-gray-500">The web app for counting... Anything!</p>
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