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
import Button from '@mui/material/Button';
import { useTheme } from "./themeContext";

const initialFolders: FolderProps[] = [
  {
    id: uuidv4(),
    title: "Welcome!",
    isFolderOpen: true,
    counters: [
      {
        id: uuidv4(), name: "Welcome to AirTally", incrementBy: 1, count: 0, initialValue: 0, step: 1,
        onDelete: function (): void {
          throw new Error("Function not implemented.");
        }
      },
      {
        id: uuidv4(), name: "Sign in to persist your counters", incrementBy: 12, count: 55, initialValue: 0, step: 1,
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

const LOCAL_STORAGE_KEY = 'airtally_local_folders';

const Folders = () => {
  const { isAuthenticated, userId } = useAuth();
  const { isAddingFolder, setIsAddingFolder } = useContext(FolderContext);
  const { isDarkMode } = useTheme();
  const [folders, setFolders] = useState<FolderProps[]>([]);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const {isLoading, setIsLoading} = useAuth();
  const [showFolderLoading, setShowFolderLoading] = useState<boolean>(false);
  const { setNewCounterLoading } = useContext(FolderContext);

  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const storedFolders = localStorage.getItem(LOCAL_STORAGE_KEY);
        console.log('Stored folders:', storedFolders);
        if (storedFolders) {
          const parsedFolders = JSON.parse(storedFolders);
          console.log('Parsed folders:', parsedFolders);
          setFolders(parsedFolders);
        } else {
          console.log('No stored folders, using initial folders');
          setFolders(initialFolders);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        setFolders(initialFolders);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && folders.length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(folders));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [folders, isAuthenticated]);

  const addFolder = async () => {
    if (newFolderTitle.trim()) {
      setShowFolderLoading(true);
      setNewFolderTitle("");
      setIsAddingFolder(false);

      const newFolder = {
        id: uuidv4(),
        title: newFolderTitle,
        isFolderOpen: false,
        counters: [],
        onDelete: () => {},
        onAddCounter: () => {},
        onDeleteCounter: () => {}
      };

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
                isFolderOpen: false,
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
        const updatedFolders = [...folders, newFolder];
        setFolders(updatedFolders);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFolders));
        } catch (error) {
          console.error('Error saving new folder to localStorage:', error);
        }
      }
      setShowFolderLoading(false);
    }
  };

  const deleteFolder = async (folderId: string) => {
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);
    setFolders(updatedFolders);
    
    if (isAuthenticated) {
      console.log("Deleting folder:", folderId);
      console.log("User ID:", userId);
      await fetch("/api/folders/deleteFolder", {
        method: "DELETE",
        body: JSON.stringify({ folderId: folderId, userId: userId }),
      });
    } else {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFolders));
        // Also clean up any counter-specific localStorage items
        folders
          .find(f => f.id === folderId)
          ?.counters
          .forEach(counter => {
            localStorage.removeItem(`counter_${counter.id}`);
          });
      } catch (error) {
        console.error('Error updating localStorage after folder deletion:', error);
      }
    }
  };

  const addCounter = async (folderId: string, counter: Omit<CounterProps, 'onDelete'>) => {
    setNewCounterLoading(true);
    const counterId = counter.id;

    if (isAuthenticated) {
      await fetch("/api/counters/addCounter", {
        method: "POST",
        body: JSON.stringify({ folderId: folderId, name: counter.name, increment: counter.incrementBy, initial: counter.initialValue }),
      }).then((response) => {
        response.json().then((data) => {
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
            ? {
                ...folder,
                counters: [
                  ...folder.counters,
                  { ...counter, id: counterId, onDelete: () => {} } as CounterProps
                ]
              }
            : folder
        )
      );
    }
    setNewCounterLoading(false);
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

  const safelyLoadFromLocalStorage = () => {
    try {
      const storedFolders = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedFolders) {
        const parsed = JSON.parse(storedFolders);
        // Load folder states and merge with stored folders
        return parsed.map((folder: FolderProps) => {
          const folderState = localStorage.getItem(`folder_state_${folder.id}`);
          return {
            ...folder,
            isFolderOpen: folderState ? JSON.parse(folderState) : false,
            counters: folder.counters.map(counter => {
              const counterData = localStorage.getItem(`counter_${counter.id}`);
              if (counterData) {
                const parsed = JSON.parse(counterData);
                return {
                  ...counter,
                  count: parsed.count,
                  step: parsed.step
                };
              }
              return counter;
            })
          };
        });
      }
      return initialFolders;
    } catch (error) {
      console.error('Error loading folders from localStorage:', error);
      return initialFolders;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">

          </header>

          {isAddingFolder && (
            <div className="mb-6 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newFolderTitle}
                onChange={(e) => setNewFolderTitle(e.target.value)}
                placeholder="Folder name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                  ${isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-fuchsia-400/20' 
                    : 'bg-white border-blue-200 text-gray-900 focus:ring-fuchsia-500/20'
                  } transition-colors duration-200`}
                autoFocus
              />
              <div className="flex gap-2 sm:w-auto w-full">
                <Button
                  onClick={addFolder}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: isDarkMode ? 'rgb(232, 121, 249)' : 'rgb(192, 38, 211)',
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgb(217, 70, 239)' : 'rgb(134, 25, 143)'
                    },
                    transition: 'background-color 0.2s'
                  }}
                >
                  Add
                </Button>
                <Button
                  onClick={() => setIsAddingFolder(false)}
                  variant="text"
                  fullWidth
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

          {isLoading ? (
            <div className="text-center mt-12">
              <p className={`mb-2 ${
                isDarkMode ? 'text-violet-400' : 'text-violet-500'
              } transition-colors duration-200`}>
                Loading your glorious counters...
              </p>
              <Box sx={{ width: '100%' }}>
                <LinearProgress 
                  sx={{ 
                    height: 5, 
                    borderRadius: 5,
                    backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
                    }
                  }} 
                />
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
                    <LinearProgress 
                      sx={{ 
                        height: 5, 
                        borderRadius: 5,
                        backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
                        }
                      }} 
                    />
                  </Box>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Folders;