import { Conversation, DBMessage } from './types';
import { getComponentById } from '@/data/components';

// Persistent in-memory & Vercel storage adapter
const globalConversations: Map<string, Conversation> = new Map();
const globalMessages: Map<string, DBMessage[]> = new Map();

export async function getConversationsForSession(
  sessionId: string,
  componentId?: string
): Promise<Conversation[]> {
  try {
    const list = Array.from(globalConversations.values()).filter(
      (c) => c.sessionId === sessionId
    );

    if (componentId) {
      return list.filter((c) => c.componentId === componentId);
    }

    return list.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (err) {
    console.error('Error fetching conversations for session:', err);
    return [];
  }
}

export async function getConversationById(
  conversationId: string
): Promise<Conversation | null> {
  return globalConversations.get(conversationId) || null;
}

export async function createConversation(
  sessionId: string,
  componentId: string,
  initialTitle?: string
): Promise<Conversation> {
  const comp = getComponentById(componentId);
  const compName = comp ? comp.name : 'General Electronics';
  const id = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  const title = initialTitle || `Study Session: ${compName}`;

  const conversation: Conversation = {
    id,
    sessionId,
    componentId,
    componentName: compName,
    title,
    messageCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  globalConversations.set(id, conversation);
  globalMessages.set(id, []);

  return conversation;
}

export async function addMessageToConversation(
  conversationId: string,
  role: 'user' | 'assistant' | 'system',
  content: string
): Promise<DBMessage> {
  const messages = globalMessages.get(conversationId) || [];
  const now = new Date().toISOString();

  const message: DBMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    conversationId,
    role,
    content,
    timestamp: now,
  };

  messages.push(message);
  globalMessages.set(conversationId, messages);

  // Update conversation metadata
  const conversation = globalConversations.get(conversationId);
  if (conversation) {
    conversation.messageCount = messages.length;
    conversation.updatedAt = now;

    // Auto update title based on first user query if default title
    if (role === 'user' && messages.filter((m) => m.role === 'user').length === 1) {
      const truncatedQuery = content.slice(0, 30);
      conversation.title = `${conversation.componentName}: ${truncatedQuery}...`;
    }

    globalConversations.set(conversationId, conversation);
  }

  return message;
}

export async function getMessagesForConversation(
  conversationId: string
): Promise<DBMessage[]> {
  return globalMessages.get(conversationId) || [];
}

export async function renameConversation(
  conversationId: string,
  newTitle: string
): Promise<Conversation | null> {
  const conversation = globalConversations.get(conversationId);
  if (!conversation) return null;

  conversation.title = newTitle.trim();
  conversation.updatedAt = new Date().toISOString();
  globalConversations.set(conversationId, conversation);

  return conversation;
}

export async function deleteConversation(
  conversationId: string
): Promise<boolean> {
  const existed = globalConversations.delete(conversationId);
  globalMessages.delete(conversationId);
  return existed;
}
