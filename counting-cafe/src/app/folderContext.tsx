"use client";

import { createContext, useState, ReactNode } from "react";

interface FolderContextType {
  isAddingFolder: boolean;
  setIsAddingFolder: (value: boolean) => void;
  newCounterLoading: boolean;
  setNewCounterLoading: (value: boolean) => void;
  folderId: string | null;
  setFolderId: (value: string | null) => void;
}

export const FolderContext = createContext<FolderContextType>({
  isAddingFolder: false,
  setIsAddingFolder: () => {},
  newCounterLoading: false,
  setNewCounterLoading: () => {},
  folderId: null,
  setFolderId: () => {},
});

export function FolderProvider({ children }: { children: ReactNode }) {
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newCounterLoading, setNewCounterLoading] = useState(false);
  const [folderId, setFolderId] = useState<string | null>(null);

  return (
    <FolderContext.Provider value={{ isAddingFolder, setIsAddingFolder, newCounterLoading, setNewCounterLoading, folderId, setFolderId }}>
      {children}
    </FolderContext.Provider>
  );
}