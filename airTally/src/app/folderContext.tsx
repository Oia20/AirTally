"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { useEffect } from "react";
import { useAuth } from "./authContext";

interface FolderContextType {
  isAddingFolder: boolean;
  setIsAddingFolder: (value: boolean) => void;
  newCounterLoading: boolean;
  setNewCounterLoading: (value: boolean) => void;
  folderId: string | null;
  setFolderId: (value: string | null) => void;
  viewMode: 'card' | 'compact';
  setViewMode: (value: 'card' | 'compact') => void;
}

export const FolderContext = createContext<FolderContextType>({
  isAddingFolder: false,
  setIsAddingFolder: () => {},
  newCounterLoading: false,
  setNewCounterLoading: () => {},
  folderId: null,
  setFolderId: () => {},
  viewMode: 'card',
  setViewMode: () => {},
});

export function FolderProvider({ children }: { children: ReactNode }) {
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newCounterLoading, setNewCounterLoading] = useState(false);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'compact'>('card');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchViewMode = async () => {
        try {
          const response = await fetch(`/api/folders/getViewMode?folderId=${folderId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();
          if (data && data.viewMode) {
            setViewMode(data.viewMode);
          }
        } catch (error) {
          console.error('Error fetching view mode:', error);
        }
      };
      fetchViewMode();
    }
  }, [isAuthenticated, folderId]);

  return (
    <FolderContext.Provider value={{ isAddingFolder, setIsAddingFolder, newCounterLoading, setNewCounterLoading, folderId, setFolderId, viewMode, setViewMode }}>
      {children}
    </FolderContext.Provider>
  );
}