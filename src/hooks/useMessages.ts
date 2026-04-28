import { useState, useEffect } from 'react';

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('decaptcha_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved messages", e);
      }
    }
  }, []);

  const sendMessage = (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newMessage: Message = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false
    };
    const newMessages = [newMessage, ...messages];
    setMessages(newMessages);
    localStorage.setItem('decaptcha_messages', JSON.stringify(newMessages));
  };

  const markAsRead = (id: string) => {
    const newMessages = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(newMessages);
    localStorage.setItem('decaptcha_messages', JSON.stringify(newMessages));
  };

  const deleteMessage = (id: string) => {
    const newMessages = messages.filter(m => m.id !== id);
    setMessages(newMessages);
    localStorage.setItem('decaptcha_messages', JSON.stringify(newMessages));
  };

  return { messages, sendMessage, markAsRead, deleteMessage };
}
