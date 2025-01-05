'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import jwt from 'jsonwebtoken';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('AT_JWT');
    const storedRefreshToken = localStorage.getItem('RT_JWT');
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
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

  const refreshAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem('RT_JWT');
    if (!storedRefreshToken) {
      logout();
      return;
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        setToken(accessToken);
        localStorage.setItem('AT_JWT', accessToken);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token) as { exp?: number };
      if (decoded.exp) {
        const timeUntilExpiry = decoded.exp * 1000 - Date.now();
        const refreshTime = timeUntilExpiry - 60000;

        const refreshTimer = setTimeout(refreshAccessToken, refreshTime);
        return () => clearTimeout(refreshTimer);
      }
    }
  }, [token]);

  const login = (newToken: string, newRefreshToken: string) => {
    const decoded = jwt.decode(newToken) as { userId: string; exp?: number };
    
    if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
      localStorage.setItem('AT_JWT', newToken);
      localStorage.setItem('RT_JWT', newRefreshToken);
      setUserId(decoded.userId);
      setToken(newToken);
      setRefreshToken(newRefreshToken);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid or expired token');
    }
  };

  const logout = () => {
    localStorage.removeItem('AT_JWT');
    localStorage.removeItem('RT_JWT');
    setRefreshToken(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, setUserId, login, logout, isLoading, setIsLoading }}>
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