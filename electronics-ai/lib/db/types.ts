export interface UserSession {
  sessionId: string;
  createdAt: string;
  lastActive: string;
}

export interface DBMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  sessionId: string;
  componentId: string;
  componentName: string;
  title: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}
