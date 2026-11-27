import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. On définit ce que le contexte va contenir
interface UserContextType {
  isDelegateMode: boolean;
  toggleDelegateMode: () => void;
}

// 2. On crée le contexte
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. On crée le Provider (qui va envelopper l'application)
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isDelegateMode, setIsDelegateMode] = useState(false);

  const toggleDelegateMode = () => {
    setIsDelegateMode((prev) => !prev);
  };

  return (
    <UserContext.Provider value={{ isDelegateMode, toggleDelegateMode }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. On crée un hook personnalisé pour l'utiliser facilement
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
  }
  return context;
};
