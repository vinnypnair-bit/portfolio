'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import AITutorDrawer from '@/components/tutor/AITutorDrawer';
import AITutorPanel from '@/components/tutor/AITutorPanel';
import InteractivePhysicsPanel from '@/components/3d/InteractivePhysicsPanel';
import AccordionSection from '@/components/ui/AccordionSection';
import { ComponentNavHeader } from '@/components/navigation/ComponentNavHeader';
import { CatalogueFooterNav } from '@/components/navigation/CatalogueFooterNav';
import { PageTransition } from '@/components/ui/PageTransition';
import { getComponentById, getRelatedComponents, getAdjacentComponents } from '@/data/components';
import { useAITutor } from '@/hooks/useAITutor';
import { ComponentPhysicsState, INITIAL_PHYSICS_STATE } from '@/types/interaction';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  HelpCircle,
  Link as LinkIcon,
  ChevronRight,
  Layers,
  Activity,
  Box,
  Cpu,
  FileText,
  Bookmark,
  ExternalLink,
  Shield,
  Bot,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';

const Interactive3DViewer = dynamic(() => import('@/components/3d/Interactive3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400">
      <Cpu className="w-8 h-8 animate-pulse text-emerald-600" />
      <span className="text-xs font-mono">Loading 3D WebGL Engine...</span>
    </div>
  ),
});

export default function ComponentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : '';
  const component = getComponentById(id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [physicsState, setPhysicsState] = useState<ComponentPhysicsState>(INITIAL_PHYSICS_STATE);

  const handleUpdatePhysicsState = (newState: Partial<ComponentPhysicsState>) => {
    setPhysicsState((prev) => ({ ...prev, ...newState }));
  };

  const {
    messages,
    isLoading: isTutorLoading,
    sendMessage,
    clearChat,
  } = useAITutor(component?.id);

  if (!component) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Component Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The requested electronic component does not exist in our database.</p>
        <Link
          href="/components"
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all"
        >
          Return to Component Library
        </Link>
      </div>
    );
  }

  const { currentIndex, total, prevComponent, nextComponent } = getAdjacentComponents(component.id);
  const relatedList = getRelatedComponents(component.id);

  const handleAskTutor = (topic: string) => {
    sendMessage(topic, component.id);
  };


  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header onOpenTutor={() => setIsDrawerOpen(true)} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Top Interactive Catalogue Navigation & Progress Header */}
        <ComponentNavHeader
          currentComponent={component}
          currentIndex={currentIndex}
          totalComponents={total}
          prevComponent={prevComponent}
          nextComponent={nextComponent}
        />

        <PageTransition
          key={component.id}
          onSwipeLeft={nextComponent ? () => router.push(`/components/${nextComponent.id}`) : undefined}
          onSwipeRight={prevComponent ? () => router.push(`/components/${prevComponent.id}`) : undefined}
        >
          <div className="space-y-10">
            {/* Hero Title Banner */}
            <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-white text-slate-800 border border-slate-200 shadow-xs">
                    Symbol: {component.symbol}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {component.category}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-slate-200 text-slate-700">
                    Difficulty: {component.difficulty}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {component.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  {component.tagline}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAskTutor(`Explain the working physics and applications of ${component.name}`)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-100" />
                    Ask AI Tutor About {component.name}
                  </button>
                </div>
              </div>
            </section>


        {/* Section 1: Interactive 3D Model Workbench + Physics Controls */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Box className="w-5 h-5 text-emerald-600" /> Interactive 3D Workbench & Physics Simulation
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* 3D WebGL Canvas (7 cols) */}
            <div className="lg:col-span-7">
              <Interactive3DViewer component={component} physicsState={physicsState} height="h-[440px]" />
            </div>

            {/* Custom Physics Control Panel (5 cols) */}
            <div className="lg:col-span-5">
              <InteractivePhysicsPanel
                component={component}
                state={physicsState}
                onChangeState={handleUpdatePhysicsState}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Embedded AI Engineering Tutor Panel */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-600" />
              electronicsAI Engineering Tutor — Context Active for {component.name}
            </h2>
          </div>

          <AITutorPanel
            component={component}
            messages={messages}
            isLoading={isTutorLoading}
            onSendMessage={sendMessage}
            onClearChat={clearChat}
          />
        </section>

        {/* Section 3: Overview & Engineering Purpose */}
        <AccordionSection title="Overview & Primary Purpose" icon={FileText} defaultOpen={true}>
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {component.description}
            </p>
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 space-y-1">
              <div className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" /> Core Engineering Purpose:
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">{component.purpose}</p>
            </div>
          </div>
        </AccordionSection>

        {/* Section 4: How It Works (Physics Mechanism) */}
        <AccordionSection title="How It Works (Physical Mechanism)" icon={Activity} defaultOpen={true}>
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {component.howItWorks}
            </p>
          </div>
        </AccordionSection>

        {/* Section 5: Key Properties Specifications Grid */}
        <AccordionSection title="Key Specifications & Properties" icon={Layers} badge="Technical Spec Sheet">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(component.keyProperties).map(([prop, val]) => (
              <div key={prop} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="text-[11px] text-slate-500 font-medium">{prop}</div>
                <div className="font-mono font-bold text-slate-900 text-xs mt-1">{val}</div>
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* Section 6: Governing Equations & Variable Breakdown */}
        {component.equations.length > 0 && (
          <AccordionSection title="Governing Equations & Mathematical Models" icon={BookOpen} badge="Mathematical Formulation">
            <div className="grid md:grid-cols-2 gap-4">
              {component.equations.map((eq, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 font-mono space-y-3">
                  <div className="text-xs font-bold text-emerald-700">{eq.title}</div>
                  <div className="text-sm font-bold text-slate-900 bg-white p-3 rounded-lg border border-slate-200 text-center shadow-xs">
                    {eq.formula}
                  </div>
                  <div className="text-[11px] text-slate-600 font-sans leading-relaxed">
                    {eq.description}
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>
        )}

        {/* Section 7: Applications & Schematic Symbol Pinouts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Applications */}
          <AccordionSection title="Practical Applications" icon={CheckCircle2}>
            <ul className="space-y-2 text-xs text-slate-700">
              {component.applications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Symbol & Pinouts */}
          <AccordionSection title="Schematic Symbol & Pinout Map" icon={Box}>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
                <strong>Schematic Symbol:</strong> {component.symbolInformation.schematicSymbol}
              </div>

              <div className="space-y-1 font-mono">
                {component.modelInformation.pinout.map((p) => (
                  <div key={p.pinNumber} className="flex justify-between py-1.5 border-b border-slate-100 text-[11px]">
                    <span className="text-emerald-800 font-bold">Pin {p.pinNumber} ({p.name})</span>
                    <span className="text-slate-500 font-sans">{p.function}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionSection>
        </div>

        {/* Section 8: Advantages vs Limitations */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-emerald-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Engineering Advantages
            </h3>
            <ul className="space-y-2 text-xs text-emerald-800">
              {component.advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/40 border border-rose-200/70 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-rose-900 text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> Limitations & Design Limitations
            </h3>
            <ul className="space-y-2 text-xs text-rose-800">
              {component.limitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 9: Practical Examples & Common Mistakes */}
        <div className="grid md:grid-cols-2 gap-6">
          <AccordionSection title="Real-World Engineering Example" icon={Bookmark}>
            <ul className="space-y-2 text-xs text-slate-700">
              {component.practicalExamples.map((ex, idx) => (
                <li key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {ex}
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title="Common Circuit Mistakes to Avoid" icon={HelpCircle}>
            <ul className="space-y-2 text-xs text-slate-700">
              {component.commonMistakes.map((mis, idx) => (
                <li key={idx} className="bg-amber-50/50 text-amber-900 p-3 rounded-xl border border-amber-200/80 leading-relaxed">
                  {mis}
                </li>
              ))}
            </ul>
          </AccordionSection>
        </div>

        {/* Section 10: Related Components Navigation */}
        {relatedList.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-emerald-600" /> Related Components
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedList.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/components/${rel.id}`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-white shadow-xs hover:shadow-sm transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-600">
                      {rel.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{rel.category}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 11: Reliable Sources & Literature References */}
        {component.sources.length > 0 && (
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" /> Technical Literature & Authoritative References
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">
                {component.sources.length} Verified Sources
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {component.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 space-y-1.5 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-mono">
                      {src.citationTag || src.type.toUpperCase()}
                    </span>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Datasheet <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="font-bold text-slate-900 text-xs leading-snug">
                    {src.title}
                  </div>
                  {(src.author || src.publisher) && (
                    <div className="text-[11px] text-slate-500 font-sans">
                      {src.author && <span>{src.author}</span>}
                      {src.author && src.publisher && <span> · </span>}
                      {src.publisher && <span>{src.publisher}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Sequential Catalogue Navigation */}
        <CatalogueFooterNav
          prevComponent={prevComponent}
          nextComponent={nextComponent}
          currentIndex={currentIndex}
          totalComponents={total}
        />
          </div>
        </PageTransition>
      </main>



      <Footer />

      <AITutorDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        messages={messages}
        isLoading={isTutorLoading}
        onSendMessage={sendMessage}
        activeComponentId={component.id}
        onClearChat={clearChat}
      />
    </div>
  );
}
