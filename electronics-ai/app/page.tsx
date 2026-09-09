'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ComponentCard from '@/components/ui/ComponentCard';
import FeatureSection from '@/components/ui/FeatureSection';
import AITutorDrawer from '@/components/tutor/AITutorDrawer';
import { ELECTRONIC_COMPONENTS } from '@/data/components';
import { useComponent3D } from '@/hooks/useComponent3D';
import { useAITutor } from '@/hooks/useAITutor';
import { ElectronicComponent } from '@/types/component';
import {
  RotateCw,
  Eye,
  Search,
  Cpu,
  Zap,
  Sparkles,
  Sliders,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import Link from 'next/link';

// Dynamic WebGL 3D Canvas
const ComponentCanvas = dynamic(() => import('@/components/3d/ComponentCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400">
      <Cpu className="w-8 h-8 animate-pulse text-emerald-600" />
      <span className="text-xs font-mono">Initializing 3D Graphics Engine...</span>
    </div>
  ),
});

export default function Home() {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    selectedComponent,
    setSelectedComponent,
    autoRotate,
    toggleAutoRotate,
    showPinoutOverlay,
    togglePinoutOverlay,
    wireframeMode,
    toggleWireframe,
  } = useComponent3D();

  const {
    messages,
    isLoading: isTutorLoading,
    sendMessage,
    setActiveComponentId,
    clearChat,
  } = useAITutor(selectedComponent.id);

  const handleSelectComponent = (comp: ElectronicComponent) => {
    setSelectedComponent(comp);
    setActiveComponentId(comp.id);
  };

  const handleAskTutorAboutComponent = (comp: ElectronicComponent) => {
    handleSelectComponent(comp);
    setIsTutorOpen(true);
    sendMessage(`Explain the core working principle and applications of ${comp.name}`, comp.id);
  };

  const filteredComponents = ELECTRONIC_COMPONENTS.filter((comp) => {
    const matchesCat = selectedCategory === 'All' || comp.category === selectedCategory;
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Header
        onOpenTutor={() => setIsTutorOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Hero Section */}
        <section className="relative rounded-3xl bg-slate-50 border border-slate-200/90 p-8 sm:p-12 overflow-hidden shadow-xs bg-radial-gradient">
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Interactive Electrical Engineering Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Learn Electrical Components with{' '}
                <span className="text-emerald-600">3D Models & AI Tutor</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                An interactive engineering platform to explore electronic components in 3D, inspect pinouts, master formulas, and get instant explanations from an AI tutor.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/components"
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-2"
                >
                  <span>Explore Component Library</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsTutorOpen(true)}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/90 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Talk to AI Tutor</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 3D WebGL Engine
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Vercel Serverless Ready
                </span>
              </div>
            </div>

            {/* Right Hero Live Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-xs text-slate-900">Live 3D Hero Preview</span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedComponent.name}
                  </span>
                </div>

                <div className="h-[220px] w-full rounded-xl overflow-hidden">
                  <ComponentCanvas
                    component={selectedComponent}
                    wireframe={wireframeMode}
                    showPinout={showPinoutOverlay}
                    autoRotate={autoRotate}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Category: <strong className="text-slate-800">{selectedComponent.category}</strong></span>
                  <span className="font-mono text-emerald-600">{selectedComponent.symbol}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Laboratory Workbench Section */}
        <section id="workbench" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 mb-1">
                <Zap className="w-3.5 h-3.5" /> INTERACTIVE WORKBENCH
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Inspect 3D Component: {selectedComponent.name}
              </h2>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAutoRotate}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  autoRotate
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                <span>Rotate</span>
              </button>

              <button
                onClick={togglePinoutOverlay}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  showPinoutOverlay
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Pinout Overlay</span>
              </button>

              <button
                onClick={toggleWireframe}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  wireframeMode
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* 3D Canvas Box */}
            <div className="lg:col-span-7 h-[420px] w-full">
              <ComponentCanvas
                component={selectedComponent}
                wireframe={wireframeMode}
                showPinout={showPinoutOverlay}
                autoRotate={autoRotate}
              />
            </div>

            {/* Specs & Principles Sidebar */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {selectedComponent.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {selectedComponent.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedComponent.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{selectedComponent.tagline}</p>
              </div>

              {/* Working Principle */}
              <div className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="font-semibold text-slate-900 mb-1">Working Principle</div>
                {selectedComponent.howItWorks}
              </div>

              {/* Specs Table */}
              <div>
                <div className="text-xs font-bold text-slate-900 mb-2">Technical Specifications</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(selectedComponent.keyProperties).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-white p-2.5 rounded-lg border border-slate-200/80"
                    >
                      <div className="text-[10px] text-slate-400">{key}</div>
                      <div className="font-mono text-slate-900 text-xs font-semibold">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulations */}
              {selectedComponent.equations.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-2">Core Equations</div>
                  <div className="space-y-2 text-xs">
                    {selectedComponent.equations.map((f, i) => (
                      <div
                        key={i}
                        className="bg-white p-3 rounded-xl border border-slate-200/80 font-mono"
                      >
                        <div className="text-emerald-700 font-semibold">{f.title}:</div>
                        <div className="text-slate-900 font-bold my-1 text-sm">{f.formula}</div>
                        <div className="text-[11px] text-slate-500 font-sans">{f.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <button
                onClick={() => handleAskTutorAboutComponent(selectedComponent)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-emerald-100" />
                Ask AI Tutor About {selectedComponent.name}
              </button>
            </div>
          </div>
        </section>

        {/* Feature Highlights: 3D Experience & AI Tutor */}
        <FeatureSection onOpenTutor={() => setIsTutorOpen(true)} />

        {/* Component Catalog Explorer Grid */}
        <section id="explorer" className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Component Library Catalog
              </h2>
              <p className="text-xs text-slate-500">
                Select any component to inspect its 3D model, formulas, and pin map
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components (e.g. 555, Diode)..."
                className="w-full bg-white border border-slate-300 focus:border-emerald-500 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Component Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredComponents.map((comp) => (
              <ComponentCard
                key={comp.id}
                component={comp}
                isSelected={selectedComponent.id === comp.id}
                onSelect={handleSelectComponent}
                onAskTutor={handleAskTutorAboutComponent}
              />
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200">
              No components match your search filter.
            </div>
          )}
        </section>

        {/* Engineering Architecture & Technology System Showcase (Portfolio Readiness) */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl relative overflow-hidden">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full-Stack Engineering & System Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Built with Next.js 16, Three.js WebGL, and AI Tutor Context
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              electronicsAI combines modern WebGL 3D graphics, real-time parametric physics simulation, structured manufacturer datasheet literature, and contextual LLM prompting to create a production-grade educational platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 3D WebGL Studio Engine
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                React Three Fiber & Three.js parametric models with on-demand IntersectionObserver frameloop auto-pausing for 0% GPU waste when idle.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Contextual AI Tutor API
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Serverless API routes with automated 11-field component context injection, rate limiting, and datasheet literature citation tags.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Production Data Integrity
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Audited datasheets (TI, Vishay, ON Semi, Infineon, Omron), clear distinction of physical laws vs device-specific parameters, and persistent session storage.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Startup Footer */}
      <Footer />

      {/* AI Tutor Slide-Over Drawer */}
      <AITutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        messages={messages}
        isLoading={isTutorLoading}
        onSendMessage={sendMessage}
        activeComponentId={selectedComponent.id}
        onClearChat={clearChat}
      />
    </div>
  );
}
