import { SourceInfo } from '@/types/component';

export interface ChatHistoryMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TutorRequest {
  query: string;
  componentId?: string;
  history?: ChatHistoryMessage[];
}

export interface TutorResponse {
  reply: string;
  componentId?: string;
  componentName?: string;
  providerUsed: string;
  timestamp: string;
}

export interface StructuredComponentContext {
  id: string;
  name: string;
  symbol: string;
  category: string;
  difficulty: string;
  description: string;
  purpose: string;
  howItWorks: string;
  keyProperties: Record<string, string>;
  applications: string[];
  equations: { title: string; formula: string; description: string }[];
  practicalExamples: string[];
  limitations: string[];
  relatedComponents: string[];
  sources: SourceInfo[];
}

export interface AITutorProvider {
  name: string;
  isConfigured: () => boolean;
  generateCompletion: (
    systemPrompt: string,
    userQuery: string,
    history?: ChatHistoryMessage[]
  ) => Promise<string>;
}
