import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MOCK_ANNONCES } from '../data/mockData';

export interface CommentItem {
  id: string;
  author: string;
  text: string;
  parentId?: string;
  replyToAuthor?: string;
}

export interface Annonce {
  id: string;
  titre: string;
  contenu?: string;
  auteur: string;
  role: string;
  date: string;
  type: 'urgent' | 'info' | 'entraide';
  riskScore: number | null;
  isSuspect: boolean;
  likes: number;
  comments: number;
  isLiked?: boolean;
  commentsList?: CommentItem[];
}

interface AnnouncementContextType {
  annonces: Annonce[];
  addAnnonce: (titre: string, type: 'urgent' | 'info' | 'entraide', contenu: string) => void;
  deleteAnnonce: (id: string) => void;
  toggleLike: (id: string) => void;
  addComment: (id: string, text: string, parentId?: string, replyToAuthor?: string) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const AnnouncementProvider = ({ children }: { children: ReactNode }) => {
  const [annonces, setAnnonces] = useState<Annonce[]>(MOCK_ANNONCES as Annonce[]);

  const addAnnonce = (titre: string, type: 'urgent' | 'info' | 'entraide', contenu: string) => {
    const nouvelleAnnonce: Annonce = {
      id: Date.now().toString(),
      titre: titre,
      contenu: contenu,
      auteur: 'Melyna Doe',
      role: 'Étudiant',
      date: "À l'instant",
      type: type,
      riskScore: null,
      isSuspect: false,
      likes: 0,
      comments: 0,
      isLiked: false,
      commentsList: [],
    };
    setAnnonces((prev) => [nouvelleAnnonce, ...prev]);
  };

  const deleteAnnonce = (id: string) => {
    setAnnonces((prev) => prev.filter((annonce) => annonce.id !== id));
  };

  const toggleLike = (id: string) => {
    setAnnonces((prev) =>
      prev.map((annonce) =>
        annonce.id === id
          ? {
              ...annonce,
              isLiked: !annonce.isLiked,
              likes: annonce.isLiked ? annonce.likes - 1 : annonce.likes + 1,
            }
          : annonce
      )
    );
  };

  const addComment = (id: string, text: string, parentId?: string, replyToAuthor?: string) => {
    setAnnonces((prev) =>
      prev.map((annonce) => {
        if (annonce.id === id) {
          const newComment: CommentItem = {
            id: Date.now().toString(),
            author: 'Melyna Doe',
            text: text,
            parentId: parentId,
            replyToAuthor: replyToAuthor,
          };

          const currentList = [...(annonce.commentsList || [])];

          // ✅ LOGIQUE D'INSERTION INTELLIGENTE
          if (parentId) {
            const parentIndex = currentList.findIndex((c) => c.id === parentId);
            if (parentIndex !== -1) {
              // On cherche la fin des réponses existantes à ce parent pour les empiler
              let insertIndex = parentIndex + 1;
              while (
                insertIndex < currentList.length &&
                currentList[insertIndex].parentId === parentId
              ) {
                insertIndex++;
              }
              // On insère la nouvelle réponse exactement à cet endroit
              currentList.splice(insertIndex, 0, newComment);
            } else {
              currentList.push(newComment);
            }
          } else {
            currentList.push(newComment);
          }

          return {
            ...annonce,
            comments: annonce.comments + 1,
            commentsList: currentList,
          };
        }
        return annonce;
      })
    );
  };

  return (
    <AnnouncementContext.Provider
      value={{ annonces, addAnnonce, deleteAnnonce, toggleLike, addComment }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncements = () => {
  const context = useContext(AnnouncementContext);
  if (!context) throw new Error('useAnnouncements doit être utilisé dans un AnnouncementProvider');
  return context;
};
