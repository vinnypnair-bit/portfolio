'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Command,
  X,
} from 'lucide-react';
import { ELECTRONIC_COMPONENTS } from '@/data/components';
import { ElectronicComponent } from '@/types/component';

interface ComponentNavHeaderProps {
  currentComponent: ElectronicComponent;
  currentIndex: number;
  totalComponents: number;
  prevComponent?: ElectronicComponent;
  nextComponent?: ElectronicComponent;
}

export function ComponentNavHeader({
  currentComponent,
  currentIndex,
  totalComponents,
  prevComponent,
  nextComponent,
}: ComponentNavHeaderProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Keyboard navigation & search shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea/editable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      if (e.key === 'ArrowLeft' && prevComponent) {
        e.preventDefault();
        router.push(`/components/${prevComponent.id}`);
      } else if (e.key === 'ArrowRight' && nextComponent) {
        e.preventDefault();
        router.push(`/components/${nextComponent.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevComponent, nextComponent, router]);

  const categories = ['All', 'Passive', 'Active', 'Semiconductor', 'Electromechanical', 'Integrated Circuit', 'Equipment'];

  const filteredComponents = ELECTRONIC_COMPONENTS.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const formattedNum = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalComponents).padStart(2, '0');
  const progressPercent = Math.round(((currentIndex + 1) / totalComponents) * 100);

  return (
    <div className="space-y-4">
      {/* Top Bar: Breadcrumbs, Component Counter & Search Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
          <Link href="/" className="hover:text-emerald-600 font-medium transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/components" className="hover:text-emerald-600 font-medium transition-colors">
            Catalogue
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900 truncate max-w-[140px] sm:max-w-none">
            {currentComponent.name}
          </span>
        </nav>

        {/* Center/Right: Progress Counter & Search Quick Action */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          {/* Component Counter Badge (e.g. 01 / 20) */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-mono font-bold text-emerald-600">
              {formattedNum}
            </span>
            <span className="text-slate-300 font-mono text-[11px]">/</span>
            <span className="text-[11px] font-mono text-slate-500">{formattedTotal}</span>
            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden ml-1 hidden sm:block">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Catalogue Search Trigger Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs px-3 py-1.5 rounded-xl border border-slate-200 transition-all shadow-2xs group"
            title="Search Catalogue (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            <span className="hidden md:inline font-medium">Quick Jump...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Navigation Toolbar: Previous / Active Title / Next */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Previous Component Button */}
        {prevComponent ? (
          <Link
            href={`/components/${prevComponent.id}`}
            className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all text-xs font-medium text-slate-700 hover:text-emerald-900 shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:-translate-x-0.5" />
            <div className="text-left hidden sm:block">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-emerald-600 font-mono">
                Prev
              </div>
              <div className="font-bold text-xs truncate max-w-[100px] md:max-w-[140px]">
                {prevComponent.name}
              </div>
            </div>
            <span className="sm:hidden">Prev</span>
          </Link>
        ) : (
          <div className="opacity-40 pointer-events-none flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-400">
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </div>
        )}

        {/* Center Active Component Designation */}
        <div className="text-center space-y-0.5 px-2">
          <div className="flex items-center justify-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono text-[10px] font-bold">
              {currentComponent.symbol}
            </span>
            <span className="text-xs text-slate-500 font-medium">{currentComponent.category}</span>
          </div>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight font-sans truncate max-w-[200px] sm:max-w-md">
            {currentComponent.name}
          </h1>
        </div>

        {/* Next Component Button */}
        {nextComponent ? (
          <Link
            href={`/components/${nextComponent.id}`}
            className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all text-xs font-medium text-slate-700 hover:text-emerald-900 shrink-0"
          >
            <span className="sm:hidden">Next</span>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-emerald-600 font-mono">
                Next
              </div>
              <div className="font-bold text-xs truncate max-w-[100px] md:max-w-[140px]">
                {nextComponent.name}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div className="opacity-40 pointer-events-none flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-400">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Quick Jump Search Drawer Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Modal Search Header */}
              <div className="p-4 border-b border-slate-200 flex items-center gap-3">
                <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search component name, symbol, or category..."
                  className="w-full text-sm font-sans focus:outline-hidden text-slate-900 placeholder:text-slate-400"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
                <SlidersHorizontal className="w-3 h-3 text-slate-400 shrink-0 mr-1" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Component Results List */}
              <div className="p-2 overflow-y-auto divide-y divide-slate-100 max-h-[360px]">
                {filteredComponents.length > 0 ? (
                  filteredComponents.map((item) => {
                    const isCurrent = item.id === currentComponent.id;
                    const itemIndexNum = ELECTRONIC_COMPONENTS.findIndex((c) => c.id === item.id) + 1;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          router.push(`/components/${item.id}`);
                        }}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-emerald-50 border border-emerald-200/80 text-emerald-950'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 font-mono text-xs font-bold flex items-center justify-center text-slate-600 shrink-0">
                            {item.symbol}
                          </span>
                          <div>
                            <div className="font-bold text-xs flex items-center gap-2">
                              {item.name}
                              {isCurrent && (
                                <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-md font-mono">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {item.tagline || item.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono text-slate-400">
                            #{String(itemIndexNum).padStart(2, '0')}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No components found matching &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>

              {/* Modal Footer Keyboard Tip */}
              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Tip: Use <kbd className="px-1 py-0.5 bg-white border rounded font-mono text-[10px]">←</kbd> / <kbd className="px-1 py-0.5 bg-white border rounded font-mono text-[10px]">→</kbd> arrow keys anytime to switch components</span>
                <span className="font-mono text-[10px]">electronicsAI Catalogue</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
