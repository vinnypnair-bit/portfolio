import Link from 'next/link';
import { Cpu, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-200/80">
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-slate-900">electronicsAI</span>
          </div>
          <p className="text-slate-500 leading-relaxed text-xs">
            Precision interactive platform for learning electrical engineering, circuit mechanics, and electronic components.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Vercel Serverless Ready
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-slate-600 font-medium">
            <li><Link href="/components" className="hover:text-emerald-600 transition-colors">Full Component Library</Link></li>
            <li><Link href="/components/resistor" className="hover:text-emerald-600 transition-colors">3D Interactive Workbench</Link></li>
            <li><Link href="/components/mosfet" className="hover:text-emerald-600 transition-colors">Power MOSFET (IRLZ44N)</Link></li>
            <li><Link href="/components/opamp" className="hover:text-emerald-600 transition-colors">Operational Amplifier (LM741)</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">Components</h4>
          <ul className="space-y-2 text-slate-600">
            <li><span className="text-slate-700 font-medium">Passives:</span> Resistors, Capacitors, Inductors</li>
            <li><span className="text-slate-700 font-medium">Semiconductors:</span> NPN Transistors, Diodes</li>
            <li><span className="text-slate-700 font-medium">Integrated Circuits:</span> 555 Timer IC</li>
          </ul>
        </div>

        {/* Architecture Specs */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">Tech Stack</h4>
          <div className="space-y-1.5 font-mono text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Next.js App Router</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> TypeScript & Tailwind CSS</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Three.js & WebGL 3D</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
        <div>
          © {new Date().getFullYear()} electronicsAI. All rights reserved. Precision engineering learning environment.
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <span className="hover:text-slate-900 cursor-pointer">Privacy</span>
          <span className="hover:text-slate-900 cursor-pointer">Terms</span>
          <span className="hover:text-slate-900 cursor-pointer">Documentation</span>
        </div>
      </div>
    </footer>
  );
}
