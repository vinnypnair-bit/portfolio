import { ElectronicComponent } from '@/types/component';

export function generateComponentSuggestions(component?: ElectronicComponent): string[] {
  if (!component) {
    return [
      "How does Ohm's Law work?",
      "What is the difference between AC and DC?",
      "How do transistors act as electronic switches?",
      "Why do LEDs need current limiting resistors?",
    ];
  }

  // Specialized suggestions for prominent components
  switch (component.id) {
    case 'capacitor':
      return [
        'How does a capacitor store energy in an electrostatic field?',
        'Why does a capacitor block DC while allowing AC to pass?',
        'What happens when I increase capacitance or plate voltage?',
        'Where would I use this capacitor in a power supply circuit?',
      ];

    case 'mosfet':
      return [
        'How does a MOSFET work as an electronic switch?',
        'What is the difference between a MOSFET and a BJT transistor?',
        'What does gate threshold voltage (Vgs_th) mean?',
        'Why are MOSFETs preferred for high-efficiency power switching?',
      ];

    case 'resistor':
      return [
        'How do I calculate Ohm’s Law for a resistor circuit?',
        'What is the difference between series and parallel resistance?',
        'How do I calculate power dissipation to avoid burning a resistor?',
        'Why are pull-up resistors used on microcontroller IO pins?',
      ];

    case 'opamp':
      return [
        'How does negative feedback stabilize an op-amp amplifier?',
        'What is the difference between inverting and non-inverting gain?',
        'Why does an op-amp have infinite open-loop gain?',
        'What is the gain bandwidth product (GBW)?',
      ];

    case 'oscilloscope':
      return [
        'How do I measure signal frequency and peak-to-peak voltage on a DSO?',
        'What is the difference between an oscilloscope and a multimeter?',
        'Why should I use a 10x attenuation probe?',
        'How do oscilloscope trigger modes capture fast transients?',
      ];

    default:
      return [
        `How does a ${component.name} work?`,
        `What are the primary applications of a ${component.name}?`,
        `Explain the governing equation (${component.equations[0]?.title || 'formula'}) for ${component.name}`,
        `What common circuit mistakes should I avoid with a ${component.name}?`,
      ];
  }
}
