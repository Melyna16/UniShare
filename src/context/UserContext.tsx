import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Specialty } from '../data/mockData';

type UserRole = 'Étudiant' | 'Délégué' | 'Admin';

interface UserContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  specialty: Specialty | null;
  isDelegateMode: boolean;
  login: (role: UserRole, specialty: Specialty | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [specialty, setSpecialty] = useState<Specialty | null>(null);

  const login = (role: UserRole, spec: Specialty | null) => {
    setUserRole(role);
    setSpecialty(role === 'Admin' ? null : spec);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserRole(null);
    setSpecialty(null);
    setIsAuthenticated(false);
  };

  const isDelegateMode = userRole === 'Délégué' || userRole === 'Admin';

  return (
    <UserContext.Provider value={{ isAuthenticated, userRole, specialty, isDelegateMode, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser doit être utilisé dans un UserProvider");
  return context;
};