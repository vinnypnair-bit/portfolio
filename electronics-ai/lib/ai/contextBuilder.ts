import { getComponentById, getRelatedComponents } from '@/data/components';
import { StructuredComponentContext } from './types';

export function buildComponentContext(componentId: string): StructuredComponentContext | null {
  const comp = getComponentById(componentId);
  if (!comp) return null;

  const relatedComps = getRelatedComponents(comp.id);

  return {
    id: comp.id,
    name: comp.name,
    symbol: comp.symbol,
    category: comp.category,
    difficulty: comp.difficulty,
    description: comp.description,
    purpose: comp.purpose,
    howItWorks: comp.howItWorks,
    keyProperties: comp.keyProperties,
    applications: comp.applications,
    equations: comp.equations,
    practicalExamples: comp.practicalExamples,
    limitations: comp.limitations,
    relatedComponents: relatedComps.map((r) => `${r.name} (${r.id})`),
    sources: comp.sources,
  };
}

export function formatComponentContextPrompt(context: StructuredComponentContext): string {
  const propertiesFormatted = Object.entries(context.keyProperties)
    .map(([k, v]) => `  - ${k}: ${v}`)
    .join('\n');

  const equationsFormatted = context.equations
    .map((e) => `  - ${e.title}: formula "${e.formula}" -> ${e.description}`)
    .join('\n');

  const applicationsFormatted = context.applications.map((a) => `  - ${a}`).join('\n');
  const examplesFormatted = context.practicalExamples.map((ex) => `  - ${ex}`).join('\n');
  const limitationsFormatted = context.limitations.map((l) => `  - ${l}`).join('\n');
  const relatedFormatted = context.relatedComponents.map((r) => `  - ${r}`).join('\n');
  const sourcesFormatted = context.sources
    .map(
      (s, i) =>
        `  - [Source ${i + 1}] [${s.citationTag || s.type}] "${s.title}"${s.author ? ` by ${s.author}` : ''}${s.publisher ? ` (${s.publisher})` : ''}${s.url ? ` - Link: ${s.url}` : ''}`
    )
    .join('\n');

  return `
=== ACTIVE COMPONENT CONTEXT ===
Component Name: ${context.name} (${context.symbol})
Category: ${context.category} | Difficulty: ${context.difficulty}
Description: ${context.description}

Primary Engineering Purpose:
${context.purpose}

How It Works (Physical Mechanism):
${context.howItWorks}

Key Properties & Specs:
${propertiesFormatted}

Governing Equations:
${equationsFormatted}

Practical Applications:
${applicationsFormatted}

Practical Engineering Examples:
${examplesFormatted}

Limitations & Design Gotchas:
${limitationsFormatted}

Related Components in Library:
${relatedFormatted}

Trusted Literature Sources & Datasheets:
${sourcesFormatted}
=== END ACTIVE COMPONENT CONTEXT ===
`;
}

