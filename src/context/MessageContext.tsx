import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MOCK_CONVERSATIONS, Conversation, ChatMessage } from '../data/mockData';

interface MessageContextType {
  conversations: Conversation[];
  getConversation: (id: string) => Conversation | undefined;
  sendMessage: (conversationId: string, text: string, attachment?: ChatMessage['attachment']) => void;
  createConversation: (conv: Omit<Conversation, 'messages' | 'lastMessage' | 'updatedAt'>) => Conversation;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  const getConversation = (id: string) => conversations.find((c) => c.id === id);

  const sendMessage = (
    conversationId: string,
    text: string,
    attachment?: ChatMessage['attachment']
  ) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      attachment,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: text, updatedAt: "À l'instant" }
          : c
      )
    );
  };

  const createConversation = (conv: Omit<Conversation, 'messages' | 'lastMessage' | 'updatedAt'>) => {
    const newConv: Conversation = {
      ...conv,
      lastMessage: '',
      updatedAt: "À l'instant",
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    return newConv;
  };

  return (
    <MessageContext.Provider value={{ conversations, getConversation, sendMessage, createConversation }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessages doit être utilisé dans un MessageProvider');
  return context;
};