"use client";

import { createContext, useState, ReactNode } from "react";

interface FolderContextType {
  isAddingFolder: boolean;
  setIsAddingFolder: (value: boolean) => void;
  newCounterLoading: boolean;
  setNewCounterLoading: (value: boolean) => void;
}

export const FolderContext = createContext<FolderContextType>({
  isAddingFolder: false,
  setIsAddingFolder: () => {},
  newCounterLoading: false,
  setNewCounterLoading: () => {},
});

export function FolderProvider({ children }: { children: ReactNode }) {
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newCounterLoading, setNewCounterLoading] = useState(false);

  return (
    <FolderContext.Provider value={{ isAddingFolder, setIsAddingFolder, newCounterLoading, setNewCounterLoading }}>
      {children}
    </FolderContext.Provider>
  );
}