import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MOCK_ANNONCES } from '../data/mockData';

export interface Annonce {
  id: string;
  titre: string;
  contenu?: string; // <-- AJOUTÉ
  auteur: string;
  role: string;
  date: string;
  type: 'urgent' | 'info' | 'entraide';
  riskScore: number | null;
  isSuspect: boolean;
  likes: number;
  comments: number;
}

interface AnnouncementContextType {
  annonces: Annonce[];
  addAnnonce: (titre: string, type: 'urgent' | 'info' | 'entraide', contenu: string) => void;
  deleteAnnonce: (id: string) => void; // <-- AJOUTÉ
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const AnnouncementProvider = ({ children }: { children: ReactNode }) => {
  const [annonces, setAnnonces] = useState<Annonce[]>(MOCK_ANNONCES as Annonce[]);

  const addAnnonce = (titre: string, type: 'urgent' | 'info' | 'entraide', contenu: string) => {
    const nouvelleAnnonce: Annonce = {
      id: Date.now().toString(),
      titre: titre,
      contenu: contenu, // <-- AJOUTÉ
      auteur: 'Melyna Doe',
      role: 'Étudiant',
      date: "À l'instant",
      type: type,
      riskScore: null,
      isSuspect: false,
      likes: 0,
      comments: 0,
    };

    setAnnonces((prev) => [nouvelleAnnonce, ...prev]);
  };

  // Fonction pour supprimer une annonce
  const deleteAnnonce = (id: string) => {
    setAnnonces((prev) => prev.filter((annonce) => annonce.id !== id));
  };

  return (
    <AnnouncementContext.Provider value={{ annonces, addAnnonce, deleteAnnonce }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncements = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncements doit être utilisé dans un AnnouncementProvider');
  }
  return context;
};
