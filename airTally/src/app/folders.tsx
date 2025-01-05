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
    id: "welcome-folder",
    title: "Welcome!",
    isFolderOpen: true,
    counters: [
      {
        id: "welcome-counter-1",
        name: "Welcome to AirTally",
        incrementBy: 1,
        count: 0,
        initialValue: 0,
        step: 1,
        onDelete: function (): void {
          throw new Error("Function not implemented.");
        }
      },
      {
        id: "welcome-counter-2",
        name: "Sign in to persist your counters",
        incrementBy: 12,
        count: 55,
        initialValue: 0,
        step: 1,
        onDelete: function (): void {
          throw new Error("Function not implemented.");
        }
      }
    ],
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
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const {isLoading, setIsLoading} = useAuth();
  const [showFolderLoading, setShowFolderLoading] = useState<boolean>(false);
  const { setNewCounterLoading } = useContext(FolderContext);

  // Initialize folders from localStorage or initialFolders
  const getInitialFolders = () => {
    if (typeof window === 'undefined') {
      return initialFolders;
    }

    if (!isAuthenticated) {
      const storedFolders = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedFolders) {
        const parsedFolders = JSON.parse(storedFolders);
        return parsedFolders.map((folder: FolderProps) => {
          const savedState = localStorage.getItem(`folder_state_${folder.id}`);
          const isOpen = savedState ? JSON.parse(savedState) : folder.isFolderOpen;
          
          return {
            ...folder,
            isFolderOpen: isOpen
          };
        });
      }
    }
    return initialFolders;
  };

  const [folders, setFolders] = useState<FolderProps[]>(getInitialFolders());

  // Single useEffect for handling authenticated vs non-authenticated state
  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchFolders();
    } else {
      setTimeout(()=> {
        setIsLoading(false);
      }, 2000)
    }

    async function fetchFolders() {
      const response = await fetch(`/api/folders/getFolders/${userId}`);
      const foldersData = await response.json();
      
      const foldersWithCounters = await Promise.all(
        foldersData.map(async (folder: FolderProps) => {
          const countersResponse = await fetch(`/api/counters/getCounters/${folder.id}`);
          const countersData = await countersResponse.json();
          
          const countersWithDelete = countersData.map((counter: CounterProps) => ({
            ...counter,
            onDelete: () => {}
          }));

          return {
            ...folder,
            isFolderOpen: folder.isOpen,
            counters: countersWithDelete,
            onDelete: () => {},
            onAddCounter: () => {},
            onDeleteCounter: () => {}
          };
        })
      ).then((foldersWithCounters) => {
        setIsLoading(false);
        setFolders(foldersWithCounters);
      });
    }
  }, [isAuthenticated, userId]);

  // Modify the localStorage effect to only save when not authenticated AND not transitioning from authenticated
  useEffect(() => {
    if (!isAuthenticated && folders !== initialFolders) {
      // Don't save to localStorage when transitioning from authenticated to unauthenticated
      const wasAuthenticated = localStorage.getItem('was_authenticated');
      if (wasAuthenticated === 'true') {
        localStorage.setItem('was_authenticated', 'false');
        setFolders(getInitialFolders()); // Reset to local storage state
        return;
      }
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(folders));
    }
  }, [folders, isAuthenticated]);

  // Track authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('was_authenticated', 'true');
    }
  }, [isAuthenticated]);

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
        setFolders([...folders, newFolder]);
      }
      setShowFolderLoading(false);
    }
  };

  const deleteFolder = async (folderId: string) => {
    // Remove folder and its counters from localStorage if not authenticated
    if (!isAuthenticated) {
      // Remove folder state
      localStorage.removeItem(`folder_state_${folderId}`);
      
      // Get the folder's counters and remove their data
      const folder = folders.find(f => f.id === folderId);
      if (folder) {
        folder.counters.forEach(counter => {
          localStorage.removeItem(`counter_${counter.id}`);
        });
      }
    }

    // Remove folder from state
    setFolders(folders.filter((folder) => folder.id !== folderId));

    // Handle authenticated deletion
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
    setNewCounterLoading(true);
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
            ? {
                ...folder,
                counters: [
                  ...folder.counters,
                  { ...counter, id: uuidv4(), onDelete: () => {} } as CounterProps
                ]
              }
            : folder
        )
      );
    }
    setNewCounterLoading(false);
  };

  const deleteCounter = (folderId: string, counterId: string) => {
    // Remove counter from localStorage if not authenticated
    if (!isAuthenticated) {
      localStorage.removeItem(`counter_${counterId}`);
    }

    // Update folders state
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200 pb-16`}>
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