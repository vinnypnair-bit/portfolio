'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { X, Send, Bot, Sparkles, User, RefreshCw, HelpCircle } from 'lucide-react';
import { ChatMessage } from '@/types/tutor';
import { ELECTRONIC_COMPONENTS } from '@/data/components';
import { generateComponentSuggestions } from '@/lib/ai/suggestionGenerator';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (query: string, componentId?: string) => void;
  activeComponentId?: string;
  onClearChat: () => void;
}

export default function AITutorDrawer({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSendMessage,
  activeComponentId,
  onClearChat,
}: AITutorDrawerProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeComp = ELECTRONIC_COMPONENTS.find((c) => c.id === activeComponentId);
  const suggestions = generateComponentSuggestions(activeComp);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim(), activeComponentId);
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

  const textareaId = 'drawer-tutor-input';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="electronicsAI Tutor Conversation Drawer"
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-fade-in"
    >
      <div className="w-full max-w-lg h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                electronicsAI Tutor
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              </h2>
              <p className="text-[11px] text-slate-500">
                {activeComp ? `Active Context: ${activeComp.name}` : 'General Engineering Context'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onClearChat}
              title="Clear chat"
              aria-label="Clear chat messages"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 min-w-[36px] min-h-[36px]"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close AI Tutor Drawer"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 min-w-[36px] min-h-[36px]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div
          role="log"
          aria-live="polite"
          aria-label="Drawer message history"
          className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs bg-slate-50/40"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-emerald-700" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{m.content}</div>
                <div
                  className={`mt-1.5 text-[10px] ${
                    m.role === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                  }`}
                >
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-slate-700" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 text-slate-500 p-3 rounded-2xl text-xs flex items-center gap-2 shadow-xs">
                <span>Analyzing engineering formulas & component physics...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Suggested Question Chips */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <div className="text-[10px] text-slate-500 mb-1.5 flex items-center gap-1 font-medium">
            <HelpCircle className="w-3 h-3 text-emerald-600" aria-hidden="true" /> Suggested Questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(prompt, activeComponentId)}
                className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 transition-all text-left truncate max-w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Multiline Input Form */}
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <label htmlFor={textareaId} className="sr-only">
            {activeComp ? `Ask anything about the ${activeComp.name}` : 'Ask about component pinouts, math, or circuits'}
          </label>
          <div className="relative flex items-end gap-2">
            <textarea
              id={textareaId}
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                activeComp
                  ? `Ask anything about the ${activeComp.name}...`
                  : 'Ask about component pinouts, math, or circuits...'
              }
              className="w-full bg-white border border-slate-300 focus:border-emerald-500 rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 transition-all resize-none max-h-28"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
