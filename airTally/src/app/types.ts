  // types.ts
  export interface CounterProps {
    id: string;
    name: string;
    incrementBy: number;
    count: number;
    initialValue: number;
    step: number;
    onDelete: (id: string) => void;
    viewMode?: 'card' | 'compact';
  }
  
  export interface FolderProps {
    id: string;
    title: string;
    isFolderOpen: boolean;
    isOpen?: boolean;
    counters: CounterProps[];
    onDelete: (id: string) => void;
    onAddCounter: (folderId: string, counter: Omit<CounterProps, 'onDelete'>) => void;
    onDeleteCounter: (folderId: string, counterId: string) => void;
  }
  
  export interface NavbarProps {
    onNewFolder: () => void;
  }