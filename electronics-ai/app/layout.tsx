import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'electronicsAI — 3D Electrical Engineering Platform & AI Tutor',
  description:
    'Interactive 3D electronics component platform with real-time parametric physics simulations, datasheet literature citations, and an AI engineering tutor.',
  keywords: [
    'electronicsAI',
    'electrical engineering',
    '3D electronic components',
    'AI circuit tutor',
    'interactive pinouts',
    'Three.js WebGL studio',
    'MOSFET simulator',
    'engineering component catalog',
  ],
  authors: [{ name: 'Vinayak Nair', url: 'https://github.com/vinnypnair-bit' }],
  openGraph: {
    title: 'electronicsAI — 3D Electrical Engineering Platform & AI Tutor',
    description:
      'Explore 20 fundamental electronic components in interactive 3D WebGL, inspect parametric circuit physics, master governing equations, and learn with an AI Tutor.',
    url: 'https://electronics-ai-six.vercel.app',
    siteName: 'electronicsAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'electronicsAI — 3D Electrical Engineering Platform & AI Tutor',
    description:
      'Interactive 3D electronics component exploration and real-time AI tutor for electrical engineering education.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 min-h-screen selection:bg-emerald-100 selection:text-emerald-900`}
      >
        {children}
      </body>
    </html>
  );
}
