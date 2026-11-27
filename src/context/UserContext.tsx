// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'Étudiant' | 'Délégué' | 'Admin';

interface UserContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  isDelegateMode: boolean; // Derived from userRole for backwards compatibility
  login: (role: UserRole) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const login = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  // We keep this so your existing code doesn't break!
  const isDelegateMode = userRole === 'Délégué' || userRole === 'Admin';

  return (
    <UserContext.Provider value={{ isAuthenticated, userRole, isDelegateMode, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
  }
  return context;
};