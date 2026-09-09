export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  componentId?: string;
}

export interface AITutorState {
  messages: ChatMessage[];
  isLoading: boolean;
  activeComponentId?: string;
}
