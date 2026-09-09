'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { ElectronicComponent } from '@/types/component';

interface CatalogueFooterNavProps {
  prevComponent?: ElectronicComponent;
  nextComponent?: ElectronicComponent;
  currentIndex: number;
  totalComponents: number;
}

export function CatalogueFooterNav({
  prevComponent,
  nextComponent,
  currentIndex,
  totalComponents,
}: CatalogueFooterNavProps) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 my-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-xs text-slate-900 uppercase tracking-wider font-mono">
            Catalogue Sequential Guide
          </span>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Item {currentIndex + 1} of {totalComponents}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Component Card */}
        {prevComponent ? (
          <Link
            href={`/components/${prevComponent.id}`}
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/40 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 group-hover:text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  Previous Component
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700">
                  {prevComponent.name} ({prevComponent.symbol})
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-slate-200 opacity-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-400 font-medium">Start of Catalogue</div>
          </div>
        )}

        {/* Next Component Card */}
        {nextComponent ? (
          <Link
            href={`/components/${nextComponent.id}`}
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/40 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-right ml-auto sm:ml-0 w-full sm:w-auto justify-end sm:justify-start">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  Next Component
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700">
                  {nextComponent.name} ({nextComponent.symbol})
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 group-hover:text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-slate-200 opacity-50 flex items-center justify-end gap-3">
            <div className="text-xs text-slate-400 font-medium">End of Catalogue</div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
