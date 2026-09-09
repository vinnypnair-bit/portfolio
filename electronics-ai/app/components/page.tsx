'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import AITutorDrawer from '@/components/tutor/AITutorDrawer';
import { ELECTRONIC_COMPONENTS, filterComponents } from '@/data/components';
import { useAITutor } from '@/hooks/useAITutor';
import {
  Search,
  BookOpen,
  Filter,
  ChevronRight,
  Sliders,
  ArrowUpRight,
  BarChart2,
} from 'lucide-react';

export default function ComponentLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  const {
    messages,
    isLoading: isTutorLoading,
    sendMessage,
    clearChat,
  } = useAITutor();

  const categories = [
    'All',
    'Passive',
    'Semiconductor',
    'Integrated Circuit',
    'Electromechanical',
    'Power',
    'Test Equipment',
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredComponents = filterComponents(
    selectedCategory,
    selectedDifficulty,
    searchQuery
  );

  const difficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header onOpenTutor={() => setIsTutorOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Library Hero Banner */}
        <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs bg-radial-gradient">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Core Electronics Component Database</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Electronics Component & Equipment Library
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore 20 fundamental components and lab instruments, arranged from basic passive elements to advanced digital logic analyzers. Select any component to view its working physics, equations, pinouts, and common mistakes.
            </p>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components (e.g. MOSFET, 555, Multimeter)..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            {/* Results Count Badge */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <BarChart2 className="w-4 h-4 text-emerald-600" />
              <span>
                Showing <strong>{filteredComponents.length}</strong> of{' '}
                <strong>{ELECTRONIC_COMPONENTS.length}</strong> components
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-medium text-slate-400 mr-2 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> Difficulty:
            </span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </section>

        {/* Component Cards Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((comp, idx) => (
            <Link
              key={comp.id}
              href={`/components/${comp.id}`}
              className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-white overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-2"
            >
              {/* Top Badge Row */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {comp.symbol}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${difficultyColor(
                      comp.difficulty
                    )}`}
                  >
                    {comp.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-lg mb-1 flex items-center justify-between">
                  <span>{comp.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {comp.tagline}
                </p>
              </div>

              {/* Key Specs Teaser */}
              <div className="space-y-1 my-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Category:</span>
                  <span className="font-medium text-slate-800">{comp.category}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Primary Equation:</span>
                  <span className="font-mono text-emerald-700 truncate max-w-[150px]">
                    {comp.equations[0]?.formula || 'V = IR'}
                  </span>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                <span>View Full Specifications</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </section>

        {filteredComponents.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200">
            No components match your search and filter criteria.
          </div>
        )}
      </main>

      <Footer />

      <AITutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        messages={messages}
        isLoading={isTutorLoading}
        onSendMessage={sendMessage}
        onClearChat={clearChat}
      />
    </div>
  );
}
