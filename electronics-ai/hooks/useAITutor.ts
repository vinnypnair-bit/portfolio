import { useState, useCallback } from 'react';
import { ChatMessage } from '@/types/tutor';

export function useAITutor(initialComponentId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to **electronicsAI Tutor**! Ask me anything about components, pinouts, circuit physics, or formulas.',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<string | undefined>(initialComponentId);

  const sendMessage = useCallback(
    async (userText: string, componentIdOverride?: string) => {
      if (!userText.trim()) return;

      const targetComponentId = componentIdOverride || activeComponentId;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: userText,
        timestamp: new Date(),
        componentId: targetComponentId,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: userText,
            componentId: targetComponentId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to reach AI Tutor server');
        }

        const data = await response.json();

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.reply || 'No response generated.',
          timestamp: new Date(),
          componentId: targetComponentId,
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (error) {
        console.error('Error communicating with AI Tutor:', error);
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: 'Sorry, I ran into an issue retrieving the response. Please check your server connection.',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeComponentId]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'assistant',
        content: 'Chat cleared. How can I help with your electrical engineering questions?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    activeComponentId,
    setActiveComponentId,
    sendMessage,
    clearChat,
  };
}
