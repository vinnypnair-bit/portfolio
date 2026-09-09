'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  User,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  CornerDownLeft,
  History,
  Plus,
} from 'lucide-react';
import { ChatMessage } from '@/types/tutor';
import { ElectronicComponent } from '@/types/component';
import { generateComponentSuggestions } from '@/lib/ai/suggestionGenerator';
import { useConversationHistory } from '@/hooks/useConversationHistory';
import ConversationHistoryDrawer from './ConversationHistoryDrawer';

interface AITutorPanelProps {
  component?: ElectronicComponent;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (query: string, componentId?: string, conversationId?: string) => void;
  onClearChat: () => void;
}

function AITutorPanel({
  component,
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
}: AITutorPanelProps) {
  const [input, setInput] = useState('');
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [lastErrorQuery, setLastErrorQuery] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    conversations,
    activeConversationId,
    loadConversationMessages,
    createNewConversation,
    renameConversationTitle,
    deleteConversationById,
  } = useConversationHistory(component?.id);

  const suggestions = generateComponentSuggestions(component);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const currentQuery = input.trim();
    setLastErrorQuery(null);

    let targetConvId = activeConversationId;
    if (!targetConvId) {
      const newConv = await createNewConversation(component?.id);
      if (newConv) targetConvId = newConv.id;
    }

    onSendMessage(currentQuery, component?.id, targetConvId || undefined);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    if (lastErrorQuery) {
      onSendMessage(lastErrorQuery, component?.id, activeConversationId || undefined);
      setLastErrorQuery(null);
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[540px]">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              electronicsAI Tutor
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {component ? `Active Context: ${component.name}` : 'General Electrical Engineering'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => createNewConversation(component?.id)}
            title="Start new conversation"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors text-xs flex items-center gap-1 font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
          </button>

          <button
            onClick={() => setIsHistoryDrawerOpen(true)}
            title="Open History"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors text-xs flex items-center gap-1 font-medium"
          >
            <History className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">History ({conversations.length})</span>
          </button>

          <button
            onClick={onClearChat}
            title="Clear Chat View"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs bg-slate-50/40">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 font-bold ${
                m.role === 'user'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-900 text-emerald-400'
              }`}
            >
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-xs font-sans'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs font-sans space-y-2'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
              <div
                className={`text-[9px] font-mono mt-1 ${
                  m.role === 'user' ? 'text-emerald-100 text-right' : 'text-slate-400'
                }`}
              >
                {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center text-xs shrink-0">
              <Bot className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 text-slate-500 p-3 rounded-2xl text-xs flex items-center gap-2 shadow-xs">
              <span>Analyzing engineering formulas & component physics...</span>
            </div>
          </div>
        )}

        {lastErrorQuery && (
          <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" /> Failed to deliver message.
            </span>
            <button
              onClick={handleRetry}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-500 transition-colors focus-visible:outline-2 focus-visible:outline-rose-600 min-h-[36px]"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Question Chips */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <div className="text-[10px] text-slate-500 mb-1.5 flex items-center gap-1 font-medium">
          <HelpCircle className="w-3 h-3 text-emerald-600" aria-hidden="true" /> Suggested Questions:
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
          {suggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(prompt, component?.id, activeConversationId || undefined)}
              className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 transition-all text-left truncate max-w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <label htmlFor="tutor-chat-input" className="sr-only">
          {component ? `Ask anything about the ${component.name}` : 'Ask about component pinouts, math, or circuits'}
        </label>
        <div className="relative flex items-end gap-2">
          <textarea
            id="tutor-chat-input"
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder={
              component
                ? `Ask anything about the ${component.name}...`
                : 'Ask about component pinouts, math, or circuits...'
            }
            className="w-full bg-white border border-slate-300 focus:border-emerald-500 rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 transition-all resize-none max-h-28"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2.5 min-w-[40px] min-h-[40px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer shadow-xs flex items-center justify-center focus-visible:outline-2 focus-visible:outline-emerald-600"
            title="Send Message (Enter)"
            aria-label="Send Message to AI Tutor"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-1 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span className="flex items-center gap-1 font-mono">
            <CornerDownLeft className="w-2.5 h-2.5" /> Send
          </span>
        </div>
      </div>

      {/* History Drawer */}
      <ConversationHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={loadConversationMessages}
        onNewConversation={() => createNewConversation(component?.id)}
        onRenameConversation={renameConversationTitle}
        onDeleteConversation={deleteConversationById}
      />
    </div>
  );
}

export default React.memo(AITutorPanel);

