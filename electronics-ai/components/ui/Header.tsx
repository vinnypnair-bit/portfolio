'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Bot, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenTutor: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function Header({ onOpenTutor, selectedCategory = 'All', onSelectCategory }: HeaderProps) {
  const categories = ['All', 'Passive', 'Semiconductor', 'Integrated Circuit'];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 glass-header transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-2 rounded-xl p-1"
          aria-label="electronicsAI Homepage"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
            <Cpu className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight text-slate-900">
              electronics<span className="text-emerald-600">AI</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
              v1.0 Ready
            </span>
          </div>
        </Link>

        {/* Category Navigation Tabs */}
        {onSelectCategory && (
          <nav aria-label="Component Category Filter" className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl text-xs border border-slate-200/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-1 ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        )}

        {/* Primary Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTutor}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all cursor-pointer border border-emerald-500/30 min-h-[44px] focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-2"
            aria-label="Open AI Tutor Drawer"
          >
            <Bot className="w-4 h-4 text-emerald-100" aria-hidden="true" />
            <span>AI Tutor</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
