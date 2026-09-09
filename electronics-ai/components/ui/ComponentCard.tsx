'use client';

import React from 'react';
import Link from 'next/link';
import { ElectronicComponent } from '@/types/component';
import { Box, ChevronRight } from 'lucide-react';

interface ComponentCardProps {
  component: ElectronicComponent;
  isSelected: boolean;
  onSelect: (comp: ElectronicComponent) => void;
  onAskTutor: (comp: ElectronicComponent) => void;
}

export default function ComponentCard({
  component,
  isSelected,
  onSelect,
  onAskTutor,
}: ComponentCardProps) {
  return (
    <div
      onClick={() => onSelect(component)}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all cursor-pointer bg-white focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-2 ${
        isSelected
          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-slate-200 hover:border-emerald-400 hover:shadow-sm'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
            {component.symbol} • {component.category}
          </span>
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {component.difficulty}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-base mb-1">
          {component.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {component.tagline}
        </p>
      </div>

      {/* Properties Preview */}
      <div className="space-y-1.5 my-2 pt-3 border-t border-slate-100 text-xs">
        {Object.entries(component.keyProperties).slice(0, 2).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between text-slate-500">
            <span className="truncate pr-2">{key}:</span>
            <span className="font-mono text-slate-900 font-medium truncate max-w-[140px]">{val}</span>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          href={`/components/${component.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <Box className="w-3.5 h-3.5" />
          <span>Full Specs</span>
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAskTutor(component);
          }}
          className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          <span>Ask AI</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
