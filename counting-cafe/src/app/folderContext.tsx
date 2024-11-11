"use client";

import { createContext, useState, ReactNode } from "react";

interface FolderContextType {
  isAddingFolder: boolean;
  setIsAddingFolder: (value: boolean) => void;
}

export const FolderContext = createContext<FolderContextType>({
  isAddingFolder: false,
  setIsAddingFolder: () => {},
});

export function FolderProvider({ children }: { children: ReactNode }) {
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  return (
    <FolderContext.Provider value={{ isAddingFolder, setIsAddingFolder }}>
      {children}
    </FolderContext.Provider>
  );
}