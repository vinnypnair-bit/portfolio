'use client';

import React, { useState, ReactNode } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  icon: LucideIcon;
  badge?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function AccordionSection({
  title,
  icon: Icon,
  badge,
  defaultOpen = true,
  children,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = React.useId();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-1 min-h-[48px]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60 shrink-0">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">{title}</h3>
          {badge && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            {isOpen ? 'Collapse' : 'Expand'}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-emerald-600' : ''
            }`}
            aria-hidden="true"
          />
        </div>
      </button>

      {isOpen && (
        <div id={contentId} className="p-5 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
