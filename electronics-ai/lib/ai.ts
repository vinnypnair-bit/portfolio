import { ELECTRONIC_COMPONENTS } from '@/data/components';

export async function generateAITutorResponse(
  userQuery: string,
  componentId?: string
): Promise<string> {
  const normalizedQuery = userQuery.toLowerCase();
  const component = componentId
    ? ELECTRONIC_COMPONENTS.find((c) => c.id === componentId)
    : null;

  if (process.env.OPENAI_API_KEY) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are electronicsAI Tutor, a world-class electrical engineering professor. Provide clear, accurate, intuitive explanations with formulas, pinout details, practical circuit design tips, and mathematical intuition. Active component context: ${
                component ? JSON.stringify(component) : 'General Electrical Engineering'
              }`,
            },
            { role: 'user', content: userQuery },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices[0]?.message?.content || 'No response from AI service.';
      }
    } catch (e) {
      console.error('Error fetching external AI completion:', e);
    }
  }

  // Fallback tutor synthesizer
  if (component) {
    if (normalizedQuery.includes('formula') || normalizedQuery.includes('calculate') || normalizedQuery.includes('math')) {
      const formulasText = component.equations
        .map((f) => `• **${f.title}**: \`${f.formula}\` — ${f.description}`)
        .join('\n');
      return `### Key Formulas for ${component.name}\n\n${formulasText}\n\n**Engineering Tip:** When applying these formulas in real circuit designs, always account for component tolerances and thermal derating!`;
    }

    if (normalizedQuery.includes('pinout') || normalizedQuery.includes('pin') || normalizedQuery.includes('connection')) {
      const pinoutText = component.modelInformation.pinout
        .map((p) => `• **Pin ${p.pinNumber} (${p.name})**: ${p.function}`)
        .join('\n');
      return `### Pinout Configuration for ${component.name}\n\n${pinoutText}\n\n**Wiring Advice:** Double-check polarity and pin order before powering up to prevent accidental thermal breakdown.`;
    }

    if (normalizedQuery.includes('application') || normalizedQuery.includes('used for') || normalizedQuery.includes('where')) {
      const appText = component.applications.map((a) => `• ${a}`).join('\n');
      return `### Common Applications of ${component.name}\n\n${appText}\n\n${component.tagline}.`;
    }

    return `### ${component.name} Overview\n\n${component.description}\n\n**Working Physics:** ${component.howItWorks}\n\n**Key Specification:**\n${Object.entries(
      component.keyProperties
    )
      .map(([k, v]) => `- **${k}**: ${v}`)
      .join('\n')}\n\nFeel free to ask me about its pinout, formulas, or how to use it in your schematic!`;
  }

  if (normalizedQuery.includes('resistor') || normalizedQuery.includes('ohm')) {
    return `**Resistors** limit current and divide voltage according to Ohm's Law ($V = I \\times R$). When choosing a resistor, consider both resistance ($\Omega$) and power rating ($W = I^2 R$) to avoid thermal burnout.`;
  }

  if (normalizedQuery.includes('capacitor') || normalizedQuery.includes('farad')) {
    return `**Capacitors** store energy in electrostatic fields ($Q = C \\times V$). They block DC while passing AC signals, making them essential for power supply decoupling and noise filtering.`;
  }

  if (normalizedQuery.includes('transistor') || normalizedQuery.includes('npn') || normalizedQuery.includes('mosfet')) {
    return `**Transistors & MOSFETs** act as current or voltage-controlled switches and amplifiers. In MOSFETs, applying gate voltage $V_{gs}$ creates a low-resistance conduction channel with near-zero control current.`;
  }

  return `Hello! I am your **electronicsAI Tutor**. You can ask me questions about electrical component physics, Ohm's law, pinouts, op-amp gain equations, or oscilloscope signals. Select any component from the library to analyze its specifications and formulas!`;
}
