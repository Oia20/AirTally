// folders.tsx
"use client";

import { useState, useEffect } from "react";
import Folder from "./Folder";
import { CounterProps, FolderProps } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { FolderContext } from "./folderContext";
import { useAuth } from "./authContext";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const initialFolders: FolderProps[] = [
  {
    id: uuidv4(),
    title: "Welcome!",
    counters: [
      {
        id: uuidv4(), name: "Welcome to AirTally", incrementBy: 1, count: 0, initialValue: 0,
        onDelete: function (): void {
          throw new Error("Function not implemented.");
        }
      },
      {
        id: uuidv4(), name: "Sign in to persist your counters", incrementBy: 12, count: 55, initialValue: 0,
        onDelete: function (): void {
          throw new Error("Function not implemented.");
        }
      }
    ]
    ,
    onDelete: function (): void {
      throw new Error("Function not implemented.");
    },
    onAddCounter: function (): void {
      throw new Error("Function not implemented.");
    },
    onDeleteCounter: function (): void {
      throw new Error("Function not implemented.");
    }
}
];

const Folders = () => {
  const { isAuthenticated, userId } = useAuth();
  const { isAddingFolder, setIsAddingFolder } = useContext(FolderContext);
  const [folders, setFolders] = useState<FolderProps[]>(initialFolders);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFolderLoading, setShowFolderLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFolders();
    } else {
      setFolders(initialFolders);
      setIsLoading(false);
    }
    async function fetchFolders() {
      const response = await fetch(`/api/folders/getFolders/${userId}`);
      const foldersData = await response.json();
      
      // Fetch counters for each folder
      const foldersWithCounters = await Promise.all(
        foldersData.map(async (folder: FolderProps) => {
          const countersResponse = await fetch(`/api/counters/getCounters/${folder.id}`);
          const countersData = await countersResponse.json();
          
          // Map the counter data to include the onDelete function
          const countersWithDelete = countersData.map((counter: CounterProps) => ({
            ...counter,
            onDelete: () => {} // Initialize with empty function
          }));

          return {
            ...folder,
            counters: countersWithDelete,
            onDelete: () => {},
            onAddCounter: () => {},
            onDeleteCounter: () => {}
          };
        })
      );

      setFolders(foldersWithCounters);
      setIsLoading(false);
    }
  }, [isAuthenticated, userId]);

  const addFolder = async () => {
    if (newFolderTitle.trim()) {
      setShowFolderLoading(true);
      setNewFolderTitle("");
      setIsAddingFolder(false);
      if (isAuthenticated) {
        await fetch("/api/folders/addFolder", {
          method: "POST",
          body: JSON.stringify({ title: newFolderTitle, userId: userId }),
        }).then((response) => {
          response.json().then((data) => {
            setFolders([
              ...folders,
              {
                id: data.id,
                title: newFolderTitle,
                counters: [],
                onDelete: function (): void {
                  throw new Error("Function not implemented.");
                },
                onAddCounter: function (): void {
                  throw new Error("Function not implemented.");
                },
                onDeleteCounter: function (): void {
                  throw new Error("Function not implemented.");
                }
              },
            ]);
            setShowFolderLoading(false);
          });
        });
      } else {
        setFolders([
          ...folders,
          { id: uuidv4(), title: newFolderTitle, counters: [], onDelete: () => {}, onAddCounter: () => {}, onDeleteCounter: () => {} }
        ]);
        setShowFolderLoading(false);
      }
    }
  };

  const deleteFolder = async (folderId: string) => {
    setFolders(folders.filter((folder) => folder.id !== folderId));
    if (isAuthenticated) {
      console.log("Deleting folder:", folderId);
      console.log("User ID:", userId);
      await fetch("/api/folders/deleteFolder", {
        method: "DELETE",
        body: JSON.stringify({ folderId: folderId, userId: userId }),
      });
    }
  };

  const addCounter = async (folderId: string, counter: Omit<CounterProps, 'onDelete'>) => {
    
    if (isAuthenticated) {
      await fetch("/api/counters/addCounter", {
        method: "POST",
        body: JSON.stringify({ folderId: folderId, name: counter.name, increment: counter.incrementBy, initial: counter.initialValue }),
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setFolders(
            folders.map((folder) =>
              folder.id === folderId
                ? { ...folder, counters: [...folder.counters, { ...counter, id: data.id, onDelete: () => {} } as CounterProps] }
                : folder
            )
          );
        });
      });
    } else {
      setFolders(
        folders.map((folder) =>
          folder.id === folderId
            ? { ...folder, counters: [...folder.counters, { ...counter, id: uuidv4(), onDelete: () => {} } as CounterProps] }
            : folder
        )
      );
    }
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
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">AirTally</h1>
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

          {isLoading ? (
            <div className="text-center mt-12">
              <p className="text-gray-500 mb-2">Loading your glorious counters...</p>
              <Box sx={{ width: '100%' }}>
                <LinearProgress sx={{ height: 5, borderRadius: 5 }} color="info"/>
              </Box>
            </div>
          ) : (
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
              {showFolderLoading && (
                <div className="text-center mt-12">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 5, borderRadius: 5 }} color="info"/>
                  </Box>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Folders;