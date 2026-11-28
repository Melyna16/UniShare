import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MOCK_RESSOURCES, Specialty } from '../data/mockData';

export interface Resource {
  id: string;
  titre: string;
  module: string;
  type: string;
  taille: string;
  specialty: Specialty;
}

interface ResourceContextType {
  resources: Resource[];
  addResource: (titre: string, module: string, specialty: Specialty) => void;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
  // We cast MOCK_RESSOURCES to Resource[] to include the new specialty field
  const [resources, setResources] = useState<Resource[]>(MOCK_RESSOURCES as Resource[]);

  const addResource = (titre: string, module: string, specialty: Specialty) => {
    const newResource: Resource = {
      id: Date.now().toString(),
      titre,
      module,
      type: 'PDF', // Default for mock
      taille: '1.0 MB', // Default for mock
      specialty,
    };
    setResources((prev) => [newResource, ...prev]);
  };

  return (
    <ResourceContext.Provider value={{ resources, addResource }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourceContext);
  if (!context) throw new Error('useResources doit être utilisé dans un ResourceProvider');
  return context;
};