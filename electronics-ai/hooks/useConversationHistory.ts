import { useState, useEffect, useCallback } from 'react';
import { Conversation, DBMessage } from '@/lib/db/types';

export function useConversationHistory(componentId?: string) {
  const [sessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    let sid = localStorage.getItem('electronicsai_session_id');
    if (!sid) {
      sid = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem('electronicsai_session_id', sid);
    }
    return sid;
  });

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load conversations when sessionId or componentId changes
  const fetchConversations = useCallback(async () => {
    if (!sessionId) return;
    try {
      const url = new URL('/api/conversations', window.location.origin);
      url.searchParams.set('sessionId', sessionId);
      if (componentId) {
        url.searchParams.set('componentId', componentId);
      }

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch (err) {
      console.error('Error fetching conversation history:', err);
    }
  }, [sessionId, componentId]);

  useEffect(() => {
    let isMounted = true;
    if (sessionId) {
      fetch('/api/conversations?sessionId=' + sessionId + (componentId ? '&componentId=' + componentId : ''))
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setConversations(data.conversations || []);
          }
        })
        .catch((err) => console.error('Error fetching conversations:', err));
    }
    return () => {
      isMounted = false;
    };
  }, [sessionId, componentId]);

  // Load messages for active conversation
  const loadConversationMessages = useCallback(async (convId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/conversations/${convId}`);
      if (res.ok) {
        const data = await res.json();
        setActiveConversationId(convId);
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Error loading conversation messages:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new conversation
  const createNewConversation = useCallback(
    async (targetComponentId?: string, title?: string) => {
      if (!sessionId) return null;
      const compId = targetComponentId || componentId || 'resistor';

      try {
        const res = await fetch('/api/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            componentId: compId,
            title,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const newConv: Conversation = data.conversation;
          setConversations((prev) => [newConv, ...prev]);
          setActiveConversationId(newConv.id);
          setMessages([]);
          return newConv;
        }
      } catch (err) {
        console.error('Error creating new conversation:', err);
      }
      return null;
    },
    [sessionId, componentId]
  );

  // Rename conversation
  const renameConversationTitle = useCallback(async (convId: string, newTitle: string) => {
    try {
      const res = await fetch(`/api/conversations/${convId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });

      if (res.ok) {
        const data = await res.json();
        const updated: Conversation = data.conversation;
        setConversations((prev) =>
          prev.map((c) => (c.id === convId ? updated : c))
        );
      }
    } catch (err) {
      console.error('Error renaming conversation:', err);
    }
  }, []);

  // Delete conversation
  const deleteConversationById = useCallback(
    async (convId: string) => {
      try {
        const res = await fetch(`/api/conversations/${convId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setConversations((prev) => prev.filter((c) => c.id !== convId));
          if (activeConversationId === convId) {
            setActiveConversationId(null);
            setMessages([]);
          }
        }
      } catch (err) {
        console.error('Error deleting conversation:', err);
      }
    },
    [activeConversationId]
  );

  return {
    sessionId,
    conversations,
    activeConversationId,
    messages,
    setMessages,
    isLoading,
    fetchConversations,
    loadConversationMessages,
    createNewConversation,
    renameConversationTitle,
    deleteConversationById,
  };
}
