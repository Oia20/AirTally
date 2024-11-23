'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import jwt from 'jsonwebtoken';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('AT_JWT');
    if (storedToken) {
      const decoded = jwt.decode(storedToken);
      if (
        decoded && 
        typeof decoded === 'object' && 
        'userId' in decoded && 
        'exp' in decoded && 
        decoded.exp! * 1000 > Date.now()
      ) {
        setUserId(decoded.userId);
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('AT_JWT');
      }
    }
  }, []);

  const login = (newToken: string) => {
    const decoded = jwt.decode(newToken) as { userId: string; exp?: number };
    
    if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
      localStorage.setItem('AT_JWT', newToken);
      setUserId(decoded.userId);
      setToken(newToken);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid or expired token');
    }
  };

  const logout = () => {
    localStorage.removeItem('AT_JWT');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, setUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}