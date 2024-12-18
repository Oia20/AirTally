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

const Folders = () => {
  const { isAuthenticated, userId } = useAuth();
  const { isAddingFolder, setIsAddingFolder } = useContext(FolderContext);
  const { isDarkMode } = useTheme();
  const [folders, setFolders] = useState<FolderProps[]>(initialFolders);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const {isLoading, setIsLoading} = useAuth();
  const [showFolderLoading, setShowFolderLoading] = useState<boolean>(false);
  const { setNewCounterLoading } = useContext(FolderContext);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFolders();
    } else {
      setFolders(initialFolders);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
    }
  }, [ isAuthenticated ]);

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
            ? { ...folder, counters: [...folder.counters, { ...counter, id: uuidv4(), onDelete: () => {} } as CounterProps] }
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