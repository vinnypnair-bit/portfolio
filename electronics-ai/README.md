# electronicsAI — Precision 3D Electrical Engineering Platform & AI Tutor

**electronicsAI** is a premium, interactive full-stack web application designed for learning electrical and electronic engineering components through interactive 3D WebGL models, real-time parametric circuit physics simulations, structured manufacturer datasheet literature, and an intelligent AI engineering tutor.

🌐 **Live Production Deployment**: [https://electronics-ai-six.vercel.app](https://electronics-ai-six.vercel.app)

---

## 🎯 Problem Solved

Electronic and electrical engineering concepts are inherently multi-dimensional, involving physical geometry, mathematical formulations, non-linear circuit dynamics, and device-specific datasheet limits. Traditional textbooks present static 2D symbols, while basic online calculators lack intuitive 3D visualization or contextual explanations.

**electronicsAI** bridges this gap by providing:
1. **Interactive 3D WebGL Workbenches**: Real-time 360° inspection, wireframe mesh viewing, pinout map overlays, and camera view controls.
2. **Parametric Physics Simulators**: Live sliders for LED forward current calculation, DC Motor RPM rotation, Relay coil state snapping, and Oscilloscope 2D waveform rendering.
3. **Structured Factual Data Architecture**: Clear distinction between general physical laws, typical industry ranges, and exact manufacturer datasheet models (Texas Instruments, Vishay, ON Semiconductor, Infineon, Omron).
4. **Context-Aware AI Tutor Engine**: An engineering tutor API that automatically ingests the active component's specifications, equations, and literature sources to provide cited, accurate answers.

---

## ✨ Key Features

- **20 Structured Components & Lab Equipment**: Sequenced from basic passives (Resistor, Capacitor, Inductor) to semiconductors (NPN BJT, Logic-Level Power MOSFET), ICs (555 Timer, Op-Amps), electromechanical devices (Relay, Servo Motor), and test equipment (Oscilloscope, Logic Analyzer, Power Supply).
- **3D Graphics Studio Engine**: Built with Three.js & React Three Fiber featuring touch rotation and pinch dolly-zoom gestures on mobile, and automatic `frameloop="never"` viewport pausing when idle (0% GPU waste).
- **AI Engineering Tutor**: Provides step-by-step mathematical breakdowns, variable unit definitions, and literature citations (`[Source 1: TI LM7805 Datasheet]`).
- **Persistent Conversation Storage**: Serverless session storage API supporting conversation creation, history browsing, renaming, and deletion.
- **Fluid Catalogue Navigation**: Header breadcrumbs, progress tracking (`01 / 20`), quick-jump search modal (`Cmd+K`), keyboard arrow key bindings (`←` / `→`), and horizontal drag/swipe gestures.
- **WCAG AA Accessibility**: Keyboard focus rings (`focus-visible`), explicit ARIA dialog roles, high contrast ratios, screen-reader text alternatives (`sr-only` 3D state summaries), and `prefers-reduced-motion` compliance.

---

## 🛠️ Technology Stack

| Layer | Technology Used |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router with Turbopack) |
| **Language** | TypeScript (Strict mode) |
| **Styling & Motion** | Tailwind CSS v4 & Framer Motion |
| **3D WebGL Engine** | Three.js & `@react-three/fiber` / `@react-three/drei` |
| **Icons** | Lucide React |
| **AI Integration** | Multi-Provider Architecture (OpenAI, Gemini, Anthropic, Offline Synthesis) |
| **Storage & API** | Next.js Serverless API Routes & Session Storage Adapter |
| **Deployment** | Vercel Cloud Platform with static asset caching |

---

## 🏗️ System Architecture

```
electronics-ai/
├── app/
│   ├── api/
│   │   ├── chat/               # Serverless AI Tutor route with rate limiting & prompt context
│   │   ├── components/         # Component database JSON API
│   │   └── conversations/      # Persistent conversation CRUD endpoints
│   ├── components/             # Catalogue listing & /components/[id] dynamic detail pages
│   ├── globals.css             # Tailwind CSS & design tokens
│   ├── layout.tsx              # Root layout with SEO OpenGraph metadata
│   └── page.tsx                # Homepage hero, WebGL workbench & system showcase
├── components/
│   ├── 3d/                     # Interactive3DViewer, Physics Panel, Model Component Switch
│   ├── navigation/             # ComponentNavHeader, CatalogueFooterNav
│   ├── tutor/                  # AITutorPanel, AITutorDrawer, ConversationHistoryDrawer
│   └── ui/                     # Header, Footer, ComponentCard, AccordionSection
├── data/
│   └── components.ts           # Audited 20-component educational database & datasheets
├── lib/
│   ├── ai/                     # Context Builder, Prompts, Tutor Engine providers
│   ├── db/                     # Session Storage API & Conversation Data Models
│   └── security/               # Rate Limiting & Input Validation logic
└── types/                      # TypeScript schemas (Component, PhysicsState, Tutor)
```

---

## 🔒 Security & Performance Features

- **Zero Secret Exposure**: Server-side execution of all third-party AI keys (`OPENAI_API_KEY`, etc.). Private keys are never exposed to the client.
- **Rate Limiting**: IP-based sliding window rate limiter (30 requests/min per IP) on `/api/chat`.
- **Query Length Sanitization**: 1000-character input limit on AI prompts to prevent token inflation attacks.
- **WebGL Resource Management**: Automatic canvas pausing when scrolled out of view or tab is hidden (`IntersectionObserver` + `visibilitychange`).
- **Accessibility & Motion**: `prefers-reduced-motion` detection and explicit `focus-visible` ring styling across all interactive elements.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/vinnypnair-bit/portfolio.git
cd portfolio/electronics-ai

# 2. Install dependencies
npm install

# 3. Create local environment file (optional for custom AI keys)
cp .env.example .env.local

# 4. Start Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

```bash
# Type check TypeScript files
npx tsc --noEmit

# Run ESLint audit
npm run lint

# Build production bundle
npm run build
```

---

## 🔮 Future Enhancements & Roadmap

1. **Hardware Telemetry Integration**: Web Serial & Web Bluetooth API connectivity to read live voltage and current readings from physical Arduino / ESP32 breadboards directly into the 3D viewer.
2. **SPICE Circuit Simulation Engine**: WebAssembly-compiled Ngspice integration for full circuit node voltage analysis and frequency response plotting.
3. **WebGPU Render Engine**: Migration option to WebGPU for ray-traced component shading and thermal heat dissipation rendering.

---

## 📄 License & Attribution

Designed and developed by **Vinayak Nair** as a portfolio project showcasing electrical engineering intuition, full-stack software architecture, 3D WebGL graphics, and AI integration.
