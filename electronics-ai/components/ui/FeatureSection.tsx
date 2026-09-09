'use client';

import React from 'react';
import { Bot, Box, Sparkles, Layers, CheckCircle2, Zap } from 'lucide-react';

interface FeatureSectionProps {
  onOpenTutor: () => void;
}

export default function FeatureSection({ onOpenTutor }: FeatureSectionProps) {
  return (
    <section className="py-12 space-y-12">
      {/* 3D Interactive Visual Learning Showcase */}
      <div id="interactive-3d" className="grid lg:grid-cols-2 gap-8 items-center bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <Box className="w-3.5 h-3.5 text-emerald-600" />
            <span>WebGL 3D Physics Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Realtime 3D Components with Pinout Overlays
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Inspect real electronic component geometries in full 360-degree rotation. Toggle wireframe mesh modes, pin maps, and thermal specs to understand how components are constructed and wired.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2 font-medium text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full 360° Free Camera Orbit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Wireframe Internal Inspection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Live Pinout Mapping</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Real-world Physics & Formulas</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-900 font-bold border-b border-slate-100 pb-3">
            <span className="flex items-center gap-2 text-emerald-700">
              <Layers className="w-4 h-4 text-emerald-600" /> Parametric Render Engine
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold border border-emerald-200">
              WebGL 2.0
            </span>
          </div>

          <div className="space-y-2 text-slate-600 text-[11px]">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Model Geometries:</span>
              <span className="font-semibold text-slate-900">High Poly Parametric Mesh</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>PBR Lighting:</span>
              <span className="font-semibold text-slate-900">Studio Soft Ambient</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Interactive Controls:</span>
              <span className="font-semibold text-emerald-700">Rotate, Zoom, Pan</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Framerate:</span>
              <span className="font-semibold text-emerald-600">60 FPS Smooth</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tutor Feature Spotlight */}
      <div id="ai-tutor-feature" className="grid lg:grid-cols-2 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="order-2 lg:order-1 bg-slate-900 text-white rounded-2xl p-6 space-y-4 font-sans shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <span className="font-bold text-xs text-white">electronicsAI Assistant</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Online
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-slate-200">
              <span className="font-semibold text-emerald-400">User:</span> How does an NPN Transistor amplify current?
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400">Tutor:</span> In an NPN BJT, a small current entering the Base ($I_B$) allows a much larger Collector current ($I_C = \beta \times I_B$) to flow to the Emitter.
            </div>
          </div>

          <button
            onClick={onOpenTutor}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" /> Try Live AI Tutor Now
          </button>
        </div>

        <div className="order-1 lg:order-2 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Intelligent Circuit Companion</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Conversational AI Tutor for Electrical Engineering
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Stuck on Ohm&apos;s Law, RC timing constants, or transistor biasing? Ask the AI Tutor questions in plain language and get instant mathematical breakdowns, schematics advice, and pinout explanations.
          </p>

          <div className="space-y-2 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Instant explanations for 50+ electronic engineering concepts</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Component-aware context for active 3D models</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
