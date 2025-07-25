'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  isEditMode: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  toggleEditMode: () => void;
  setEditMode: (enabled: boolean) => void;
}

const GlobalAdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple password - in production, you'd want something more secure
const ADMIN_PASSWORD = 'devhakim2025'; // Change this to your preferred password

export function GlobalAdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Check for existing auth on load
  useEffect(() => {
    const authStatus = localStorage.getItem('devhakim-admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('devhakim-admin-auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditMode(false);
    localStorage.removeItem('devhakim-admin-auth');
  };

  const toggleEditMode = () => {
    if (isAuthenticated) {
      setIsEditMode(prev => !prev);
    }
  };

  const setEditModeState = (enabled: boolean) => {
    if (isAuthenticated) {
      setIsEditMode(enabled);
    }
  };

  return (
    <GlobalAdminContext.Provider value={{
      isAuthenticated,
      isEditMode,
      login,
      logout,
      toggleEditMode,
      setEditMode: setEditModeState,
    }}>
      {children}
    </GlobalAdminContext.Provider>
  );
}

export function useGlobalAdmin() {
  const context = useContext(GlobalAdminContext);
  if (context === undefined) {
    throw new Error('useGlobalAdmin must be used within a GlobalAdminProvider');
  }
  return context;
}