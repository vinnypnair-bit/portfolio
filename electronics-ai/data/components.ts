import { ElectronicComponent } from '@/types/component';

export const ELECTRONIC_COMPONENTS: ElectronicComponent[] = [
  // 1. Resistor
  {
    id: 'resistor',
    name: 'Resistor',
    symbol: 'R',
    category: 'Passive',
    difficulty: 'Beginner',
    tagline: 'Limits electric current flow and divides voltage levels',
    description: 'A passive two-terminal electrical component that opposes the flow of electric current according to Ohm’s Law, dissipating excess energy as heat.',
    purpose: 'Used to protect sensitive components from excessive current, set operating bias voltages, pull signals HIGH/LOW, and shape RC/RL timing signals.',
    howItWorks: 'Free electrons flowing through the conductive matrix collide with atoms in the resistive film or carbon wire, creating resistance and converting electrical energy into heat.',
    applications: [
      'LED current limiting',
      'Pull-up and pull-down signal conditioning',
      'Voltage divider networks',
      'RC timing and filter networks',
    ],
    advantages: [
      'Low cost and highly reliable',
      'No external power source required',
      'Available in wide range of tolerances and power ratings',
    ],
    limitations: [
      'Electrical energy is dissipated as thermal heat ($P = I^2 R$)',
      'Resistance value varies slightly with temperature (Tempco)',
      'High power resistors require dedicated heat sinks',
    ],
    keyProperties: {
      'General Behavior': 'Linear current limitation (V = I * R)',
      'Typical Power Rating': '1/4 W (0.25 W) to 5 W+ (Typical Axial)',
      'Standard Tolerances': '±1% (Metal Film), ±5% (Carbon Film)',
      'Temperature Coefficient': '±50 to ±200 ppm/°C',
    },
    equations: [
      {
        title: "Ohm's Law",
        formula: 'V = I \\times R',
        description: 'Voltage (V in Volts) across a resistor equals current (I in Amperes) times resistance (R in Ohms).',
      },
      {
        title: 'Power Dissipation',
        formula: 'P = I^2 \\times R = \\frac{V^2}{R}',
        description: 'Electrical power (P in Watts) converted to heat energy.',
      },
      {
        title: 'Series Resistance',
        formula: 'R_{total} = R_1 + R_2 + \\dots + R_n',
        description: 'Total resistance of resistors connected end-to-end.',
      },
    ],
    practicalExamples: [
      '330 Ω resistor placed in series with a red LED powered by a 5V supply',
      '10 kΩ pull-up resistor keeping a microcontroller input pin HIGH when a button is unpressed',
    ],
    commonMistakes: [
      'Exceeding maximum rated power dissipation (causing burning)',
      'Confusing 4-band and 5-band color code multiplier colors',
    ],
    relatedComponents: ['capacitor', 'led', 'voltageregulator'],
    symbolInformation: {
      schematicSymbol: 'Zig-zag line (US/IEEE) or rectangle (IEC 60062)',
      notes: 'Non-polarized component; can be connected in either direction.',
    },
    modelInformation: {
      modelType: 'resistor',
      pinout: [
        { pinNumber: 1, name: 'Terminal 1', function: 'Lead A (Non-polarized)' },
        { pinNumber: 2, name: 'Terminal 2', function: 'Lead B (Non-polarized)' },
      ],
      renderColor: '#d1b88a',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'The Art of Electronics (3rd Edition)',
        author: 'Paul Horowitz & Winfield Hill',
        publisher: 'Cambridge University Press',
        type: 'textbook',
        url: 'https://artofelectronics.net',
        citationTag: '[Ref 1: Horowitz & Hill]',
      },
      {
        title: 'IEC 60062 Marking Codes for Resistors and Capacitors',
        author: 'International Electrotechnical Commission',
        publisher: 'IEC Standards',
        type: 'standard',
        url: 'https://www.iec.ch',
        citationTag: '[Ref 2: IEC 60062]',
      },
    ],
    isPopular: true,
  },

  // 2. Capacitor
  {
    id: 'capacitor',
    name: 'Capacitor',
    symbol: 'C',
    category: 'Passive',
    difficulty: 'Beginner',
    tagline: 'Stores energy in an electrostatic field and blocks DC while passing AC',
    description: 'A two-terminal passive electrical component consisting of two conducting plates separated by an insulating dielectric material.',
    purpose: 'Used to smooth voltage fluctuations in power supplies, couple AC signals while blocking DC, store temporary energy, and create resonant tuned circuits.',
    howItWorks: 'Applying a voltage across the plates induces an electric field across the dielectric. Positive charge accumulates on one plate and negative on the other without direct charge conduction through the dielectric.',
    applications: [
      'Power supply ripple smoothing & decoupling',
      'Audio signal coupling and DC blocking',
      'RC oscillator and timer networks',
      'Motor start capacitors',
    ],
    advantages: [
      'Rapid charge and discharge cycles',
      'High reliability and long service life',
      'Effective AC coupling and DC filtering',
    ],
    limitations: [
      'Electrolytic types are polarized and explode if reverse-biased',
      'Lower energy density compared to chemical batteries',
      'Dielectric breakdown occurs if maximum voltage is exceeded',
    ],
    keyProperties: {
      'General Behavior': 'Electrostatic energy storage (Q = C * V)',
      'Typical Capacity Range': '1 pF (Ceramic) to 10,000 µF (Electrolytic)',
      'Max Working Voltage': '6.3V to 450V+ DC',
      'ESR (Equivalent Series Resistance)': 'mΩ to Ω range depending on dielectric',
    },
    equations: [
      {
        title: 'Stored Charge',
        formula: 'Q = C \\times V',
        description: 'Charge (Q in Coulombs) equals capacitance (C in Farads) times voltage (V in Volts).',
      },
      {
        title: 'Stored Energy',
        formula: 'E = \\frac{1}{2} C V^2',
        description: 'Electrostatic energy stored in Joules.',
      },
      {
        title: 'Capacitive Reactance',
        formula: 'X_C = \\frac{1}{2 \\pi f C}',
        description: 'AC impedance offered by a capacitor at frequency (f).',
      },
    ],
    practicalExamples: [
      '100 µF electrolytic capacitor connected across DC power rails to prevent voltage drops',
      '0.1 µF ceramic decoupling capacitor placed right next to an IC power pin',
    ],
    commonMistakes: [
      'Connecting electrolytic capacitors with reversed polarity',
      'Ignoring maximum operating voltage rating',
    ],
    relatedComponents: ['resistor', 'inductor', 'voltageregulator'],
    symbolInformation: {
      schematicSymbol: 'Two parallel lines (non-polarized) or one straight line and one curved bar (+ indicator)',
      notes: 'Pay close attention to polarity markings on electrolytic and tantalum caps.',
    },
    modelInformation: {
      modelType: 'capacitor',
      pinout: [
        { pinNumber: 1, name: 'Anode (+)', function: 'Positive terminal (Longer lead)' },
        { pinNumber: 2, name: 'Cathode (-)', function: 'Negative terminal (Shorter lead with stripe)' },
      ],
      renderColor: '#0284c7',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'NIST Guide to Electrical Quantities: Capacitance',
        author: 'National Institute of Standards and Technology',
        publisher: 'NIST Physics Laboratory',
        type: 'university',
        url: 'https://www.nist.gov',
        citationTag: '[Ref 1: NIST Capacitance Guide]',
      },
      {
        title: 'Nichicon Aluminum Electrolytic Capacitors General Technical Data',
        author: 'Nichicon Corporation',
        publisher: 'Nichicon Technical Documentation',
        type: 'datasheet',
        citationTag: '[Ref 2: Nichicon Datasheet]',
      },
    ],
    isPopular: true,
  },

  // 3. Inductor
  {
    id: 'inductor',
    name: 'Inductor',
    symbol: 'L',
    category: 'Passive',
    difficulty: 'Intermediate',
    tagline: 'Stores energy in a magnetic field and resists sudden changes in current',
    description: 'A passive electrical component formed by insulating wire wrapped around a core (air, iron, or ferrite).',
    purpose: 'Filters high-frequency electromagnetic interference (EMI), forms LC resonant tanks, and acts as energy storage in switching buck/boost power converters.',
    howItWorks: 'Current flowing through the coil generates a magnetic field. Any change in current induces a counter-electromotive force (back-EMF) by Faraday’s Law, opposing current changes.',
    applications: [
      'Switch-mode DC-DC converter energy storage',
      'RF choke and EMI noise suppression',
      'LC tuned bandpass radio filters',
      'Audio crossover networks',
    ],
    advantages: [
      'Suppresses rapid current spikes and high frequency noise',
      'High efficiency in energy transfer for switching regulators',
    ],
    limitations: [
      'Core saturation reduces effective inductance at high currents',
      'Physical size can be relatively bulky',
      'Generates magnetic interference to adjacent trace signals',
    ],
    keyProperties: {
      'General Behavior': 'Magnetic field energy storage (V_L = L * dI/dt)',
      'Inductance Range': '1 µH to 100 mH typical',
      'DC Resistance (DCR)': 'Low mΩ to Ω range',
      'Saturation Current (Isat)': 'Maximum peak current before core saturation',
    },
    equations: [
      {
        title: 'Induced Voltage',
        formula: 'V_L = L \\times \\frac{dI}{dt}',
        description: 'Back-EMF voltage induced by rate of change of current (dI/dt).',
      },
      {
        title: 'Inductive Reactance',
        formula: 'X_L = 2 \\pi f L',
        description: 'Impedance increases proportionally with frequency (f).',
      },
    ],
    practicalExamples: [
      '10 µH toroidal power inductor in a 5V buck converter circuit',
      'Ferrite bead choke placed on a USB cable to pass FCC EMC compliance tests',
    ],
    commonMistakes: [
      'Exceeding saturation current causes sudden drop in inductance and thermal runaway',
      'Ignoring DC winding resistance (DCR) in high-power applications',
    ],
    relatedComponents: ['capacitor', 'transformer', 'voltageregulator'],
    symbolInformation: {
      schematicSymbol: 'Series of curved loops or bumps, with optional parallel lines representing ferrite core',
      notes: 'Non-polarized component.',
    },
    modelInformation: {
      modelType: 'inductor',
      pinout: [
        { pinNumber: 1, name: 'Lead A', function: 'Start of coil winding' },
        { pinNumber: 2, name: 'Lead B', function: 'End of coil winding' },
      ],
      renderColor: '#059669',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'IEEE Transactions on Magnetics & Power Electronics',
        author: 'IEEE Power Electronics Society',
        publisher: 'IEEE',
        type: 'standard',
        url: 'https://ieee-pels.org',
        citationTag: '[Ref 1: IEEE Magnetics Standard]',
      },
    ],
    isPopular: false,
  },

  // 4. Diode (1N4007)
  {
    id: 'diode',
    name: 'PN Junction Diode (1N4007)',
    symbol: 'D',
    category: 'Semiconductor',
    difficulty: 'Beginner',
    tagline: 'Allows electrical current to flow in one direction only',
    description: 'A two-terminal semiconductor device formed by joining P-type and N-type silicon material, acting as a one-way valve for electric current.',
    purpose: 'Used to rectify AC current to DC, protect circuits against reverse polarity power connections, and clamp high voltage inductive spikes.',
    howItWorks: 'When forward biased (> 0.7V for silicon), the depletion region collapses and electrons flow easily. In reverse bias, the depletion layer widens, blocking current up to breakdown voltage.',
    applications: [
      'Bridge rectifiers for AC-to-DC conversion',
      'Flyback protection diode across inductive relay coils',
      'Reverse battery polarity protection',
      'Logic OR gates in discrete circuits',
    ],
    advantages: [
      'Fast switching speeds',
      'High reverse breakdown protection (up to 1000V for 1N4007)',
      'Essential building block for power electronics',
    ],
    limitations: [
      'Forward voltage drop (0.7V Silicon, 0.3V Schottky) causes power loss',
      'Reverse leakage current exists at elevated temperatures',
    ],
    keyProperties: {
      'Device Specific Model': 'Vishay / ON Semi 1N4007 Rectifier',
      'Forward Voltage (Vf)': '0.7V (Silicon), 0.3V (Schottky)',
      'Peak Reverse Voltage (VRRM)': '1000V Max (1N4007 specific)',
      'Max Forward Current (If)': '1.0 Amp continuous (1N4007 specific)',
    },
    equations: [
      {
        title: 'Shockley Diode Equation',
        formula: 'I = I_S \\left( e^{\\frac{V}{n V_T}} - 1 \\right)',
        description: 'Diode current exponential relationship to forward voltage.',
      },
    ],
    practicalExamples: [
      '1N4007 diode connected in reverse parallel across a 12V relay coil to suppress inductive kickback',
      'Schottky diode connected in series with battery input to prevent damage if polarity is flipped',
    ],
    commonMistakes: [
      'Inserting diode upside down (cathode connected to positive rail)',
      'Exceeding maximum continuous forward current',
    ],
    relatedComponents: ['led', 'transistor', 'relay'],
    symbolInformation: {
      schematicSymbol: 'Triangle pointing to a vertical bar (arrow indicates forward current direction)',
      notes: 'Cathode (-) is identified by a printed silver or black band on the physical package.',
    },
    modelInformation: {
      modelType: 'diode',
      pinout: [
        { pinNumber: 1, name: 'Anode (A)', function: 'Positive terminal (Current enters)' },
        { pinNumber: 2, name: 'Cathode (K)', function: 'Negative terminal (Silver stripe side)' },
      ],
      renderColor: '#0f172a',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Vishay 1N4001 through 1N4007 General Purpose Rectifiers Datasheet',
        author: 'Vishay Intertechnology',
        publisher: 'Vishay Semiconductor Division',
        type: 'datasheet',
        url: 'https://www.vishay.com',
        citationTag: '[Ref 1: Vishay 1N4007 Datasheet]',
      },
    ],
    isPopular: true,
  },

  // 5. LED
  {
    id: 'led',
    name: 'Light Emitting Diode (LED)',
    symbol: 'LED',
    category: 'Semiconductor',
    difficulty: 'Beginner',
    tagline: 'Emits narrow-spectrum light when forward biased',
    description: 'A specialized PN junction semiconductor diode that converts electrical energy directly into visible, infrared, or ultraviolet light via electroluminescence.',
    purpose: 'Used for visual status indication, illumination displays, optocouplers, and fiber optic communication.',
    howItWorks: 'Electrons recombine with electron holes in the active bandgap layer, releasing energy in the form of photons. The bandgap energy determines the photon wavelength (color).',
    applications: [
      'Power and status indicators on circuit boards',
      'Seven-segment and matrix LED displays',
      'General room and automotive illumination',
      'Infrared remote control emitters',
    ],
    advantages: [
      'Extremely high energy efficiency compared to incandescent bulbs',
      'Long operational lifetime (50,000+ hours)',
      'Fast switching speed (nanoseconds)',
    ],
    limitations: [
      'Must ALWAYS be used with a current-limiting resistor to prevent thermal destruction',
      'Low reverse voltage breakdown (typically < 5V)',
      'Light output decreases with rising temperature',
    ],
    keyProperties: {
      'General Behavior': 'Electroluminescent semiconductor diode',
      'Forward Voltage (Vf)': '1.8V-2.1V (Red/Yellow), 3.0V-3.4V (Blue/White)',
      'Typical Operating Current': '10 mA to 20 mA (Standard indicator)',
      'Max Reverse Voltage (Vr)': '5.0 V Max',
    },
    equations: [
      {
        title: 'LED Resistor Calculation',
        formula: 'R_{limit} = \\frac{V_{CC} - V_F}{I_F}',
        description: 'Required current limiting resistor value.',
      },
    ],
    practicalExamples: [
      'Red LED (Vf = 2.0V) powered from 5V requiring R = (5 - 2) / 0.015 = 200 Ω (standard 220 Ω used)',
    ],
    commonMistakes: [
      'Connecting an LED directly to a power source without a current limiting resistor',
      'Connecting LED backwards (reversed anode/cathode)',
    ],
    relatedComponents: ['resistor', 'diode', 'transistor'],
    symbolInformation: {
      schematicSymbol: 'Standard diode symbol with two outward-pointing arrows representing emitted photons',
      notes: 'Anode (+) lead is longer; Cathode (-) side has a flat edge on the plastic body.',
    },
    modelInformation: {
      modelType: 'diode',
      pinout: [
        { pinNumber: 1, name: 'Anode (+)', function: 'Positive lead (Longer lead)' },
        { pinNumber: 2, name: 'Cathode (-)', function: 'Negative lead (Shorter lead / flat body edge)' },
      ],
      renderColor: '#10b981',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Optoelectronics Data Book',
        author: 'Texas Instruments Application Engineering',
        publisher: 'Texas Instruments',
        type: 'datasheet',
        citationTag: '[Ref 1: TI Optoelectronics Manual]',
      },
    ],
    isPopular: true,
  },

  // 6. Transistor (2N2222)
  {
    id: 'transistor',
    name: 'NPN Transistor (2N2222A)',
    symbol: 'Q',
    category: 'Semiconductor',
    difficulty: 'Intermediate',
    tagline: 'Current-controlled amplifier and high-speed electronic switch',
    description: 'A three-terminal semiconductor device consisting of two PN junctions (NPN or PNP) used to amplify or switch electrical signals.',
    purpose: 'Enables low-power microcontroller outputs to control high-power loads like motors and relays, and forms linear amplifiers in audio systems.',
    howItWorks: 'A small current injected into the Base (Ib) controls a larger current flowing from Collector to Emitter (Ic = β × Ib). Operating regions include Cutoff (OFF), Active (Amplification), and Saturation (ON switch).',
    applications: [
      'Low-side switching for relays, LEDs, and solenoids',
      'Audio pre-amplifiers and power amplifiers',
      'Push-pull power output stages',
      'Logic gates in TTL digital electronics',
    ],
    advantages: [
      'High current gain (hFE / β)',
      'Fast switching response',
      'Low cost in standard packages (TO-92, SOT-23)',
    ],
    limitations: [
      'Current-driven control requires continuous base current',
      'Thermal runaway risk if not properly biased',
      'Higher saturation voltage drop (Vce_sat ≈ 0.2V) compared to MOSFETs',
    ],
    keyProperties: {
      'Device Specific Model': 'ON Semiconductor / Microchip 2N2222A',
      'Current Gain (hFE)': '100 to 300 (2N2222A specific)',
      'Collector-Emitter Voltage (Vceo)': '40V Max (2N2222A specific)',
      'Max Collector Current (Ic)': '800 mA continuous (2N2222A specific)',
    },
    equations: [
      {
        title: 'Collector Current',
        formula: 'I_C = \\beta \\times I_B',
        description: 'Collector current is base current multiplied by current gain (β).',
      },
      {
        title: 'Emitter Current',
        formula: 'I_E = I_B + I_C',
        description: 'Total current exiting the emitter terminal.',
      },
    ],
    practicalExamples: [
      '2N2222 NPN transistor driven by an Arduino GPIO pin (via a 1 kΩ base resistor) turning ON a 12V motor',
    ],
    commonMistakes: [
      'Connecting Base directly to a digital output without a base current limiting resistor',
      'Swapping Emitter and Collector pins accidentally',
    ],
    relatedComponents: ['mosfet', 'resistor', 'relay', 'diode'],
    symbolInformation: {
      schematicSymbol: 'Circle with vertical base line and angled collector/emitter lines. Arrow on Emitter points OUT for NPN, IN for PNP.',
      notes: 'NPN: Not Pointing iN. PNP: Pointing iN Proudly.',
    },
    modelInformation: {
      modelType: 'transistor',
      pinout: [
        { pinNumber: 1, name: 'Emitter (E)', function: 'Emits charge carriers (Pin 1 TO-92)' },
        { pinNumber: 2, name: 'Base (B)', function: 'Control input terminal (Pin 2 TO-92)' },
        { pinNumber: 3, name: 'Collector (C)', function: 'Collects charge carriers (Pin 3 TO-92)' },
      ],
      renderColor: '#1e293b',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: '2N2222A N-Channel General Purpose Transistor Datasheet',
        author: 'ON Semiconductor',
        publisher: 'ON Semiconductor',
        type: 'datasheet',
        url: 'https://www.onsemi.com',
        citationTag: '[Ref 1: ON Semi 2N2222A Datasheet]',
      },
    ],
    isPopular: true,
  },

  // 7. MOSFET (IRLZ44N)
  {
    id: 'mosfet',
    name: 'N-Channel Power MOSFET (IRLZ44N)',
    symbol: 'Q',
    category: 'Semiconductor',
    difficulty: 'Intermediate',
    tagline: 'Voltage-controlled high-efficiency power switch with minimal losses',
    description: 'Metal-Oxide-Semiconductor Field-Effect Transistor. A voltage-controlled three-terminal semiconductor device widely used in high-power switching and digital logic.',
    purpose: 'Provides extremely low ON-resistance switching for high-current DC loads, switching power supplies (SMPS), motor H-bridges, and CMOS logic microprocessors.',
    howItWorks: 'Applying a gate-to-source voltage (Vgs) above threshold (Vgs_th) creates an electrostatic channel under the thin oxide layer, allowing massive current flow from Drain to Source with virtually zero gate current.',
    applications: [
      'PWM high-speed motor speed controllers',
      'Buck and boost converter switching transistors',
      'High-side and low-side power switches',
      'CMOS microprocessors and RAM memory cells',
    ],
    advantages: [
      'Voltage-driven control requires almost zero steady-state gate current',
      'Extremely low ON-resistance (Rds_on down to single-digit mΩ)',
      'Blazing fast switching speed (MHz range)',
    ],
    limitations: [
      'Gate dielectric oxide is sensitive to static electricity (ESD damage)',
      'High gate capacitance requires dedicated gate driver ICs for fast high-frequency switching',
    ],
    keyProperties: {
      'Device Specific Model': 'Infineon / IR IRLZ44N Logic-Level Power MOSFET',
      'Drain-Source Voltage (Vds)': '55V Max (IRLZ44N specific)',
      'ON Resistance (Rds_on)': '22 mΩ at Vgs=5V (IRLZ44N specific)',
      'Gate Threshold Voltage (Vgs_th)': '1.0V to 2.0V (Logic Level specific)',
      'Continuous Drain Current (Id)': '47A Max (IRLZ44N specific)',
    },
    equations: [
      {
        title: 'Conduction Power Loss',
        formula: 'P_{conduction} = I_D^2 \\times R_{DS(on)}',
        description: 'Heat generated while fully turned ON.',
      },
    ],
    practicalExamples: [
      'IRLZ44N logic-level N-channel MOSFET switching a 24V 10A LED strip directly from a 3.3V micro output',
    ],
    commonMistakes: [
      'Using a non-logic-level MOSFET with a 3.3V micro (MOSFET never fully turns ON, overheats)',
      'Leaving Gate pin floating without a pull-down resistor (causes erratic ON/OFF toggling)',
    ],
    relatedComponents: ['transistor', 'voltageregulator', 'relay', 'dcmotor'],
    symbolInformation: {
      schematicSymbol: 'Gate bar separated from channel lines, with Drain/Source lines and internal body diode symbol',
      notes: 'Always pay attention to whether the MOSFET is Logic Level (Vgs_th < 2.5V).',
    },
    modelInformation: {
      modelType: 'transistor',
      pinout: [
        { pinNumber: 1, name: 'Gate (G)', function: 'Voltage control terminal' },
        { pinNumber: 2, name: 'Drain (D)', function: 'Load terminal (Connected to tab)' },
        { pinNumber: 3, name: 'Source (S)', function: 'Ground reference terminal' },
      ],
      renderColor: '#0f172a',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'IRLZ44N Logic Level Power MOSFET Datasheet',
        author: 'Infineon Technologies / International Rectifier',
        publisher: 'Infineon',
        type: 'datasheet',
        url: 'https://www.infineon.com',
        citationTag: '[Ref 1: Infineon IRLZ44N Datasheet]',
      },
    ],
    isPopular: true,
  },

  // 8. Op-amp (LM358)
  {
    id: 'opamp',
    name: 'Operational Amplifier (LM358)',
    symbol: 'U',
    category: 'Integrated Circuit',
    difficulty: 'Intermediate',
    tagline: 'High-gain differential voltage amplifier for signal conditioning',
    description: 'A fundamental analog building block with differential inputs (Inverting and Non-inverting) and a single-ended output, providing near-infinite open-loop gain.',
    purpose: 'Used to amplify weak sensor signals, build precision active filters, construct mathematical computing circuits (adders, integrators), and compare analog voltages.',
    howItWorks: 'With negative feedback applied, the op-amp automatically adjusts its output voltage to make the voltage difference between its two input terminals zero ($V_+ = V_-$).',
    applications: [
      'Microphone and strain gauge sensor pre-amplifiers',
      'Active Butterworth / Sallen-Key low-pass audio filters',
      'Voltage comparators with hysteresis (Schmitt triggers)',
      'Instrumentation amplifiers',
    ],
    advantages: [
      'Extremely high input impedance (Giga-Ohms) draws zero sensor current',
      'Low output impedance easily drives subsequent stages',
      'Predictable gain determined purely by external feedback resistors',
    ],
    limitations: [
      'Gain Bandwidth Product (GBW) limits amplification at high frequencies',
      'Output voltage swing limited by supply rails (Rail-to-Rail op-amps mitigate this)',
      'Input offset voltage causes small output offset errors',
    ],
    keyProperties: {
      'Device Specific Model': 'Texas Instruments LM358 Dual Op-Amp',
      'Open-Loop Voltage Gain': '100 dB (100,000 V/V TI spec)',
      'Gain Bandwidth Product (GBW)': '1.1 MHz (LM358 specific)',
      'Supply Voltage Range': '3V to 32V Single Supply (LM358 specific)',
      'Slew Rate': '0.5 V/µs',
    },
    equations: [
      {
        title: 'Non-Inverting Gain',
        formula: 'A_v = 1 + \\frac{R_f}{R_{in}}',
        description: 'Voltage gain of non-inverting amplifier configuration.',
      },
      {
        title: 'Inverting Gain',
        formula: 'A_v = - \\frac{R_f}{R_{in}}',
        description: 'Voltage gain and phase inversion of inverting configuration.',
      },
    ],
    practicalExamples: [
      'LM358 op-amp configured as a non-inverting gain of 10 amplifier boosting a 0-100mV thermocouple signal to 0-1V',
    ],
    commonMistakes: [
      'Forgetting dual power supplies (+V / -V) when AC signals cross zero ground',
      'Operating without negative feedback when linear amplification is required (causes rail saturation)',
    ],
    relatedComponents: ['resistor', 'capacitor', 'microcontroller'],
    symbolInformation: {
      schematicSymbol: 'Triangle pointing right with + (Non-inverting) and - (Inverting) input terminals',
      notes: 'Standard pinouts for dual op-amps follow the LM358 / TL072 8-pin DIP convention.',
    },
    modelInformation: {
      modelType: 'ic555',
      pinout: [
        { pinNumber: 1, name: 'OUT A', function: 'Op-amp A Output' },
        { pinNumber: 2, name: 'IN A-', function: 'Op-amp A Inverting Input' },
        { pinNumber: 3, name: 'IN A+', function: 'Op-amp A Non-Inverting Input' },
        { pinNumber: 4, name: 'GND / -V', function: 'Negative supply / Ground' },
        { pinNumber: 5, name: 'IN B+', function: 'Op-amp B Non-Inverting Input' },
        { pinNumber: 6, name: 'IN B-', function: 'Op-amp B Inverting Input' },
        { pinNumber: 7, name: 'OUT B', function: 'Op-amp B Output' },
        { pinNumber: 8, name: 'VCC / +V', function: 'Positive supply voltage' },
      ],
      renderColor: '#1e293b',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'LM358 Dual Operational Amplifiers Technical Datasheet',
        author: 'Texas Instruments Incorporated',
        publisher: 'Texas Instruments',
        type: 'datasheet',
        url: 'https://www.ti.com',
        citationTag: '[Ref 1: TI LM358 Datasheet]',
      },
      {
        title: 'Op Amps for Everyone Design Reference',
        author: 'Ron Mancini',
        publisher: 'Texas Instruments / Newnes',
        type: 'textbook',
        citationTag: '[Ref 2: TI Op Amps Manual]',
      },
    ],
    isPopular: true,
  },

  // 9. Relay
  {
    id: 'relay',
    name: 'Electromechanical Relay',
    symbol: 'K',
    category: 'Electromechanical',
    difficulty: 'Beginner',
    tagline: 'Electromagnetically operated switch providing total galvanic isolation',
    description: 'An electromechanical switch containing an internal wire coil magnet that physically moves mechanical switch contacts when energized.',
    purpose: 'Allows a low-power 5V control circuit (like an Arduino) to safely switch high-voltage AC mains appliances (120V/240V) with complete electrical isolation.',
    howItWorks: 'Current through the control coil generates a magnetic field that attracts an iron armature, snapping the switch contacts from Normally Closed (NC) to Normally Open (NO).',
    applications: [
      'Smart home AC lamp and appliance switching',
      'Automotive horn and headlight switching circuits',
      'Industrial PLC control outputs',
      'Safety interlock disconnect switches',
    ],
    advantages: [
      'Complete galvanic isolation between control coil and load contacts',
      'Can switch both AC and DC high power loads',
      'Very low contact resistance when closed',
    ],
    limitations: [
      'Mechanical moving parts wear out over time (100k - 1M operations)',
      'Slow switching speed (5ms - 15ms response)',
      'Coil collapse generates high back-EMF voltage requiring a flyback diode',
    ],
    keyProperties: {
      'General Specification': 'Omron G5LE SPDT Electromechanical Relay',
      'Coil Nominal Voltage': '5V DC (Coil Resistance 63 Ω)',
      'Contact Rating': '10A 250V AC / 10A 30V DC (G5LE specific)',
      'Operate / Release Time': '10ms Max / 5ms Max',
    },
    equations: [
      {
        title: 'Coil Current',
        formula: 'I_{coil} = \\frac{V_{coil}}{R_{coil}}',
        description: 'Current drawn by the relay coil when energized.',
      },
    ],
    practicalExamples: [
      '5V relay module toggled by a microcontroller switching a 230V AC water pump',
    ],
    commonMistakes: [
      'Forgetting to install a flyback diode across the relay coil',
      'Attempting to drive a 100mA relay coil directly from a micro pin without a driving transistor',
    ],
    relatedComponents: ['transistor', 'diode', 'microcontroller'],
    symbolInformation: {
      schematicSymbol: 'Coil rectangle/zigzag next to switch contact lines (COM, NO, NC)',
      notes: 'COM = Common, NO = Normally Open, NC = Normally Closed.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'Coil A', function: 'Relay control coil terminal 1' },
        { pinNumber: 2, name: 'Coil B', function: 'Relay control coil terminal 2' },
        { pinNumber: 3, name: 'COM', function: 'Common contact terminal' },
        { pinNumber: 4, name: 'NO', function: 'Normally Open contact' },
        { pinNumber: 5, name: 'NC', function: 'Normally Closed contact' },
      ],
      renderColor: '#0284c7',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Omron G5LE PCB Power Relay Datasheet',
        author: 'Omron Corporation',
        publisher: 'Omron Electronic Components',
        type: 'datasheet',
        url: 'https://components.omron.com',
        citationTag: '[Ref 1: Omron G5LE Datasheet]',
      },
    ],
    isPopular: false,
  },

  // 10. Transformer
  {
    id: 'transformer',
    name: 'AC Power Transformer',
    symbol: 'T',
    category: 'Power',
    difficulty: 'Intermediate',
    tagline: 'Transfers AC electrical energy between circuits via electromagnetic induction',
    description: 'A static passive electromagnetic device consisting of two or more wire coils (Primary and Secondary) wrapped around a shared magnetic iron/ferrite core.',
    purpose: 'Steps up or steps down alternating current (AC) voltages for power distribution, mains power supplies, and isolation.',
    howItWorks: 'Alternating current in the primary winding creates a continuously varying magnetic flux in the core, which induces a proportional AC voltage in the secondary winding by Faraday’s law.',
    applications: [
      'Linear AC-to-DC mains wall adapter power supplies',
      'High voltage power grid distribution networks',
      'Audio impedance matching transformers',
      'Galvanic mains safety isolation',
    ],
    advantages: [
      'Extremely high energy conversion efficiency (up to 95-99%)',
      'No moving mechanical parts',
      'Provides galvanic isolation between input and output windings',
    ],
    limitations: [
      'Works ONLY with Alternating Current (AC); will overheat and short if connected to steady DC',
      'Heavy and bulky at low 50Hz/60Hz mains frequencies',
    ],
    keyProperties: {
      'General Behavior': 'Electromagnetic ratio conversion (Vp/Vs = Np/Ns)',
      'Power Rating': 'VA (Volt-Amperes rating)',
      'Typical Primary Voltage': '120V / 230V AC (50Hz / 60Hz)',
      'Secondary Output': 'Step-down 6V, 12V, 24V AC typical',
    },
    equations: [
      {
        title: 'Transformer Voltage Ratio',
        formula: '\\frac{V_P}{V_S} = \\frac{N_P}{N_S}',
        description: 'Primary to secondary voltage ratio equals turns ratio.',
      },
      {
        title: 'Current Inverse Ratio',
        formula: 'I_P \\times V_P = I_S \\times V_S',
        description: 'Ideal power conservation (Primary power equals secondary power).',
      },
    ],
    practicalExamples: [
      '230V AC to 12V AC step-down transformer feeding a bridge rectifier in an analog bench power supply',
    ],
    commonMistakes: [
      'Connecting DC voltage to primary winding (causes short circuit and core burnout)',
      'Exceeding maximum VA load rating',
    ],
    relatedComponents: ['inductor', 'diode', 'capacitor', 'powersupply'],
    symbolInformation: {
      schematicSymbol: 'Two opposing inductor coils with parallel vertical lines in between representing the core',
      notes: 'Dots indicate winding phase polarity.',
    },
    modelInformation: {
      modelType: 'inductor',
      pinout: [
        { pinNumber: 1, name: 'Pri 1', function: 'Primary AC input lead 1' },
        { pinNumber: 2, name: 'Pri 2', function: 'Primary AC input lead 2' },
        { pinNumber: 3, name: 'Sec 1', function: 'Secondary AC output lead 1' },
        { pinNumber: 4, name: 'Sec 2', function: 'Secondary AC output lead 2' },
      ],
      renderColor: '#b45309',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'IEEE Std C57.12.00 - Standard General Requirements for Distribution Transformers',
        author: 'IEEE Power & Energy Society',
        publisher: 'IEEE',
        type: 'standard',
        citationTag: '[Ref 1: IEEE C57 Standard]',
      },
    ],
    isPopular: false,
  },

  // 11. Battery
  {
    id: 'battery',
    name: 'Rechargeable Li-Ion Cell (18650)',
    symbol: 'BT',
    category: 'Power',
    difficulty: 'Beginner',
    tagline: 'Converts stored chemical energy directly into electrical energy',
    description: 'An electrochemical power source consisting of one or more voltaic cells that generate a direct current (DC) voltage across its terminals.',
    purpose: 'Provides portable standalone DC power for mobile devices, electric vehicles, backup UPS systems, and remote IoT nodes.',
    howItWorks: 'Reduction-oxidation (redox) chemical reactions at the anode and cathode create a surplus of electrons at the negative terminal, causing current to flow through an external load to the positive cathode.',
    applications: [
      'Lithium-Ion (18650) cells in laptops and EV vehicles',
      'AA / AAA Alkaline batteries for consumer electronics',
      'LiPo cells for drones and RC vehicles',
      'Lead-acid batteries for automotive starters',
    ],
    advantages: [
      'Independent portable DC power source',
      'High peak pulse current delivery',
      'Rechargeable chemistries allow thousands of charge/discharge cycles',
    ],
    limitations: [
      'Finite energy storage capacity (mAh / Wh)',
      'Lithium chemistries require strict protection circuits (BMS) against thermal runaway/fire',
      'Voltage drops gradually as state of charge depletes',
    ],
    keyProperties: {
      'Specific Chemistry': 'Lithium-Ion 18650 Cell (Panasonic NCR18650B)',
      'Nominal Voltage': '3.7V (Full Charge: 4.2V, Cutoff: 2.5V)',
      'Standard Capacity': '3400 mAh (NCR18650B specific)',
      'Max Continuous Discharge': '6.8 A (2C rating)',
    },
    equations: [
      {
        title: 'Battery Energy',
        formula: 'E_{Wh} = V_{nominal} \\times C_{Ah}',
        description: 'Total stored energy in Watt-hours.',
      },
    ],
    practicalExamples: [
      'Single-cell 3.7V 2500mAh 18650 Li-ion battery powering a portable ESP32 weather station',
    ],
    commonMistakes: [
      'Short-circuiting positive and negative battery terminals',
      'Over-discharging Lithium Polymer cells below 3.0V (permanently damages cell)',
    ],
    relatedComponents: ['voltageregulator', 'powersupply', 'resistor'],
    symbolInformation: {
      schematicSymbol: 'Alternating long thin lines (+) and short thick lines (-)',
      notes: 'Longer line indicates positive (+) terminal.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'Positive (+)', function: 'Anode output terminal (Positive voltage)' },
        { pinNumber: 2, name: 'Negative (-)', function: 'Cathode output terminal (Ground reference)' },
      ],
      renderColor: '#10b981',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Panasonic NCR18650B Lithium-Ion Battery Product Specification',
        author: 'Panasonic Corporation',
        publisher: 'Panasonic Industrial Devices',
        type: 'datasheet',
        url: 'https://industrial.panasonic.com',
        citationTag: '[Ref 1: Panasonic 18650 Datasheet]',
      },
    ],
    isPopular: true,
  },

  // 12. DC Motor
  {
    id: 'dcmotor',
    name: 'Brushed DC Motor',
    symbol: 'M',
    category: 'Electromechanical',
    difficulty: 'Beginner',
    tagline: 'Converts direct current electrical energy into mechanical rotation',
    description: 'A continuous rotating electromechanical actuator that converts DC electrical power into mechanical torque via internal magnetic interaction.',
    purpose: 'Drives wheels in robotics, powers fans, pumps, power tools, and automated mechanical machinery.',
    howItWorks: 'Current through the armature rotor coils generates a magnetic field that interacts with permanent stator magnets. Carbon brushes and a mechanical commutator reverse coil polarity twice per turn to sustain continuous rotation.',
    applications: [
      'Wheeled mobile robot drive systems',
      'Cooling fans and blowers',
      'Electric power drills and screwdrivers',
      'Automotive power windows',
    ],
    advantages: [
      'Simple two-wire speed control by varying applied DC voltage',
      'High starting torque',
      'Inexpensive and widely available',
    ],
    limitations: [
      'Brushes wear out and generate mechanical friction and RF sparks',
      'Requires H-bridge driver circuit for bidirectional rotation control',
      'High stall current can burn out drivers',
    ],
    keyProperties: {
      'General Behavior': 'Rotational torque generation (T ∝ I)',
      'Operating Voltage': '3V to 24V DC typical',
      'No-Load Speed': '3,000 to 12,000 RPM',
      'Stall Current': '4x to 10x higher than nominal running current',
    },
    equations: [
      {
        title: 'Motor Back-EMF',
        formula: 'V_{back} = K_e \\times \\omega',
        description: 'Counter-voltage produced by rotation speed (ω).',
      },
    ],
    practicalExamples: [
      '12V brushed DC motor controlled by an L298N H-Bridge driver with Arduino PWM speed control',
    ],
    commonMistakes: [
      'Connecting motor directly to microcontroller IO pin',
      'Forgetting flyback diodes across driver transistors during PWM switching',
    ],
    relatedComponents: ['mosfet', 'transistor', 'servomotor', 'microcontroller'],
    symbolInformation: {
      schematicSymbol: 'Circle with letter M inside and two connection leads',
      notes: 'Reversing terminal polarity reverses rotation direction.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'Terminal A', function: 'Motor winding lead 1' },
        { pinNumber: 2, name: 'Terminal B', function: 'Motor winding lead 2' },
      ],
      renderColor: '#0284c7',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Electric Motors and Drives: Fundamentals, Types and Applications',
        author: 'Austin Hughes & Bill Drury',
        publisher: 'Elsevier / Newnes',
        type: 'textbook',
        citationTag: '[Ref 1: Hughes Electric Motors Textbook]',
      },
    ],
    isPopular: false,
  },

  // 13. Servo Motor
  {
    id: 'servomotor',
    name: 'Hobby RC Servo Motor (SG90)',
    symbol: 'SERVO',
    category: 'Electromechanical',
    difficulty: 'Intermediate',
    tagline: 'Closed-loop rotary actuator for precise angular position control',
    description: 'A self-contained closed-loop motorized actuator containing a DC motor, reduction gearbox, potentiometer feedback sensor, and control board.',
    purpose: 'Provides exact 0° to 180° shaft angle position control for robotics joints, steering linkages, camera gimbals, and automated valves.',
    howItWorks: 'Reads a 50Hz Pulse-Width Modulation (PWM) signal (1ms = 0°, 1.5ms = 90°, 2ms = 180°). The internal control board compares target pulse width against the feedback potentiometer position and drives the motor until error is zero.',
    applications: [
      'RC airplane control surface rudders and flaps',
      'Robotic arm joint positioners',
      'Pan-and-tilt camera gimbals',
      'Automated door lock mechanisms',
    ],
    advantages: [
      'Integrated closed-loop position control with high holding torque',
      'Controlled with a single digital PWM signal wire',
      'No external shaft encoder needed',
    ],
    limitations: [
      'Limited rotation range (typically 180° or 270°)',
      'High current spikes when under heavy mechanical loads',
      'Plastic gears can strip under impact forces',
    ],
    keyProperties: {
      'Device Specific Model': 'TowerPro SG90 Micro Servo',
      'Operating Voltage': '4.8V to 6.0V DC (SG90 specific)',
      'Stall Torque': '1.8 kg·cm at 4.8V (SG90 specific)',
      'Operating Speed': '0.12 sec / 60 degrees',
      'Control Protocol': '50 Hz PWM (1.0ms - 2.0ms pulse width)',
    },
    equations: [
      {
        title: 'Position Pulse Width',
        formula: 'Angle(^{\\circ}) = (Pulse_{ms} - 1.0) \\times 180^{\\circ}',
        description: 'Standard RC servo control mapping.',
      },
    ],
    practicalExamples: [
      'SG90 micro servo controlling robotic arm claw angle using Arduino Servo.h library',
    ],
    commonMistakes: [
      'Powering servo off microcontroller 5V rail (causes supply brownouts during motor current spikes)',
      'Driving servo past mechanical hard stops',
    ],
    relatedComponents: ['dcmotor', 'microcontroller', 'voltageregulator'],
    symbolInformation: {
      schematicSymbol: 'Box with 3 pin connections: VCC (Red), GND (Black/Brown), PWM Signal (Yellow/White)',
      notes: 'Standard 3-pin 0.1-inch pitch connector.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'GND (Brown/Black)', function: 'Ground reference' },
        { pinNumber: 2, name: 'VCC (Red)', function: 'Power supply (+5V to +6V)' },
        { pinNumber: 3, name: 'PWM (Yellow/White)', function: '50Hz position control signal' },
      ],
      renderColor: '#f59e0b',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'TowerPro SG90 9g Micro Servo Specification Sheet',
        author: 'TowerPro Technical Division',
        publisher: 'TowerPro',
        type: 'datasheet',
        url: 'http://www.towerpro.com.tw',
        citationTag: '[Ref 1: TowerPro SG90 Datasheet]',
      },
    ],
    isPopular: false,
  },

  // 14. Voltage Regulator (LM7805)
  {
    id: 'voltageregulator',
    name: '5V Linear Voltage Regulator (LM7805)',
    symbol: 'REG',
    category: 'Power',
    difficulty: 'Intermediate',
    tagline: 'Maintains a constant stable DC output voltage despite supply drops or load changes',
    description: 'An integrated circuit designed to automatically produce a fixed or adjustable ripple-free DC output voltage from a variable higher input voltage.',
    purpose: 'Protects delicate digital microcontrollers and analog sensors by delivering clean stable power (e.g. 5.0V or 3.3V) from fluctuating power supplies or batteries.',
    howItWorks: 'Linear regulators (LM7805) use an internal pass transistor operating in the active region to burn off excess voltage as heat. Switching buck regulators rapidly turn an inductor ON/OFF at high efficiency.',
    applications: [
      '5V and 3.3V power rails for microcontrollers and sensors',
      'Clean low-noise power supplies for audio op-amps',
      'Automotive 12V to 5V USB charger adapters',
    ],
    advantages: [
      'Linear Regulators: Extremely low output noise and simple 3-pin usage',
      'Switching Regulators: High energy efficiency (85-95%) with minimal heat',
    ],
    limitations: [
      'Linear regulators dissipate high thermal energy if (Vin - Vout) is large',
      'Linear regulators can only step DOWN voltage, not UP',
      'Switching regulators generate high frequency switching ripple noise',
    ],
    keyProperties: {
      'Device Specific Model': 'Texas Instruments LM7805 Positive 5V Regulator',
      'Output Voltage': '5.0 V Fixed (±4% tolerance TI spec)',
      'Input Voltage Range': '7.0 V to 25.0 V (LM7805 specific)',
      'Dropout Voltage': '2.0 V typical at 1A',
      'Max Output Current': '1.5 A (with adequate heatsink)',
    },
    equations: [
      {
        title: 'Linear Thermal Power Dissipation',
        formula: 'P_{heat} = (V_{in} - V_{out}) \\times I_{load}',
        description: 'Power lost as heat in linear regulator.',
      },
    ],
    practicalExamples: [
      'LM7805 stepping down a 12V wall adapter supply to a stable 5.0V rail for an Arduino UNO',
    ],
    commonMistakes: [
      'Forgetting input and output ceramic decoupling capacitors (causes regulator oscillation)',
      'Running linear regulator with high dropout without a heatsink',
    ],
    relatedComponents: ['capacitor', 'battery', 'powersupply'],
    symbolInformation: {
      schematicSymbol: 'Rectangle with Input (IN), Ground (GND), and Output (OUT) terminals',
      notes: 'TO-220 package tab is usually internally connected to Ground pin.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'Input (IN)', function: 'Unregulated DC input voltage' },
        { pinNumber: 2, name: 'Ground (GND)', function: 'Common ground reference pin' },
        { pinNumber: 3, name: 'Output (OUT)', function: 'Regulated 5.0V clean output' },
      ],
      renderColor: '#10b981',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'LM78xx Series Positive Voltage Regulators Datasheet',
        author: 'Texas Instruments Incorporated',
        publisher: 'Texas Instruments',
        type: 'datasheet',
        url: 'https://www.ti.com',
        citationTag: '[Ref 1: TI LM7805 Datasheet]',
      },
    ],
    isPopular: true,
  },

  // 15. Microcontroller (ESP32)
  {
    id: 'microcontroller',
    name: 'Microcontroller (ESP32-WROOM-32)',
    symbol: 'MCU',
    category: 'Integrated Circuit',
    difficulty: 'Intermediate',
    tagline: 'Compact programmable computer on a single IC chip',
    description: 'A complete integrated computer containing a CPU core, RAM memory, flash program storage, and programmable Digital/Analog Input/Output (GPIO) pins.',
    purpose: 'Acts as the programmable brain of embedded systems, reading sensor inputs, executing software algorithms, and driving displays and actuators.',
    howItWorks: 'Fetches binary instructions stored in flash memory, executes arithmetic and logic operations in the CPU, and manipulates hardware registers mapped to physical GPIO pins.',
    applications: [
      'IoT smart home sensors and Wi-Fi/Bluetooth devices',
      'Automotive engine control units (ECUs)',
      '3D printer and CNC motion controllers',
      'Consumer smart appliances and wearables',
    ],
    advantages: [
      'Highly flexible: behavior modified via software updates',
      'Integrated peripherals: ADC, DAC, PWM, SPI, I2C, UART, Wi-Fi',
      'Low power consumption with deep sleep modes',
    ],
    limitations: [
      'GPIO pins limited to low currents (typically 12mA - 40mA max)',
      'Requires real-time programming knowledge (C/C++, MicroPython)',
      'Limited RAM and processing speed compared to desktop CPUs',
    ],
    keyProperties: {
      'Device Specific Model': 'Espressif ESP32-WROOM-32 Wi-Fi & BLE SoC',
      'CPU Core': '32-bit Dual-Core Tensilica LX6 at 240 MHz',
      'SRAM / Flash': '520 KB SRAM / 4 MB Flash (ESP32 specific)',
      'Operating Voltage': '3.3V DC (IO pins NOT 5V tolerant)',
    },
    equations: [
      {
        title: 'ADC Voltage Resolution',
        formula: 'V_{step} = \\frac{V_{ref}}{2^N - 1}',
        description: 'Analog-to-Digital converter voltage resolution for N bits (12-bit on ESP32).',
      },
    ],
    practicalExamples: [
      'ESP32 microcontroller reading BME280 temperature sensor via I2C bus and pushing data to cloud dashboard via Wi-Fi',
    ],
    commonMistakes: [
      'Applying 5V signals to 3.3V un-tolerant ESP32 GPIO pins',
      'Exceeding maximum total current draw across all IO pins simultaneously',
    ],
    relatedComponents: ['resistor', 'voltageregulator', 'servomotor', 'multimeter'],
    symbolInformation: {
      schematicSymbol: 'Large rectangle with labeled GPIO pins (VCC, GND, TX, RX, SDA, SCL, GPIOs)',
      notes: 'Check pin multiplexing functions in MCU datasheet.',
    },
    modelInformation: {
      modelType: 'ic555',
      pinout: [
        { pinNumber: 1, name: 'VCC / 3V3', function: 'Power supply input pin' },
        { pinNumber: 2, name: 'GND', function: 'Ground reference pin' },
        { pinNumber: 3, name: 'GPIO21 (SDA)', function: 'I2C Data line / Digital IO' },
        { pinNumber: 4, name: 'GPIO22 (SCL)', function: 'I2C Clock line / Digital IO' },
      ],
      renderColor: '#1e293b',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'ESP32 Technical Reference Manual',
        author: 'Espressif Systems',
        publisher: 'Espressif Systems Documentation',
        type: 'datasheet',
        url: 'https://www.espressif.com',
        citationTag: '[Ref 1: Espressif ESP32 Reference Manual]',
      },
    ],
    isPopular: true,
  },

  // 16. Multimeter
  {
    id: 'multimeter',
    name: 'Digital Multimeter (DMM)',
    symbol: 'DMM',
    category: 'Test Equipment',
    difficulty: 'Beginner',
    tagline: 'Essential diagnostic instrument for measuring voltage, current, and resistance',
    description: 'A handheld electronic measuring instrument that combines several measurement functions (Volts, Amperes, Ohms, Continuity, Diode check) in one unit.',
    purpose: 'Used by engineers and technicians to troubleshoot electrical circuits, test component health, check battery voltages, and trace wire continuity.',
    howItWorks: 'Uses an internal precision analog-to-digital converter (ADC) and calibrated voltage dividers, current shunts, and constant current sources to display values on a digital LCD.',
    applications: [
      'Measuring DC power supply voltage rail stability',
      'Testing circuit wire continuity and locating short circuits',
      'Measuring component resistor values and diode forward drops',
      'Debugging open connections',
    ],
    advantages: [
      'High accuracy and high input impedance (10 MΩ on voltage modes)',
      'Portable and durable',
      'Essential for every electronics workbench',
    ],
    limitations: [
      'Cannot display fast time-varying voltage waveforms (requires an Oscilloscope)',
      'In-series current measurement fuse burns if connected in parallel across power rails',
    ],
    keyProperties: {
      'General Specification': 'Fluke 117 True RMS Digital Multimeter',
      'Input Impedance': '10 MΩ (Voltage measurement mode)',
      'Safety Rating': 'CAT III 600 V Safety Certified (Fluke specific)',
      'Counts / Resolution': '6000 Count LCD resolution',
    },
    equations: [
      {
        title: 'Shunt Resistor Current',
        formula: 'I_{measured} = \\frac{V_{shunt}}{R_{shunt}}',
        description: 'DMM internal current measurement mechanism.',
      },
    ],
    practicalExamples: [
      'Using DMM continuity mode (beeper) to verify PCB trace connection between microcontroller pin and sensor',
    ],
    commonMistakes: [
      'Accidentally measuring voltage while probe leads are plugged into the 10A current jack (causes violent short circuit & blown fuse)',
      'Measuring resistance while circuit power is still turned ON',
    ],
    relatedComponents: ['resistor', 'battery', 'oscilloscope'],
    symbolInformation: {
      schematicSymbol: 'Circle containing V, A, or Ω symbol connected across test nodes',
      notes: 'Red probe = Positive (+), Black probe = Common (COM / Ground).',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'COM (Black)', function: 'Common reference probe jack' },
        { pinNumber: 2, name: 'V/Ω/Hz (Red)', function: 'Voltage, resistance, frequency probe jack' },
        { pinNumber: 3, name: '10A (Red)', function: 'High-current measurement probe jack' },
      ],
      renderColor: '#f59e0b',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Fluke ABCs of Multimeter Safety and Measurement Techniques',
        author: 'Fluke Corporation',
        publisher: 'Fluke Test Tools',
        type: 'standard',
        url: 'https://www.fluke.com',
        citationTag: '[Ref 1: Fluke DMM Safety Guide]',
      },
    ],
    isPopular: true,
  },

  // 17. Oscilloscope
  {
    id: 'oscilloscope',
    name: 'Digital Storage Oscilloscope (DSO)',
    symbol: 'SCOPE',
    category: 'Test Equipment',
    difficulty: 'Advanced',
    tagline: 'Visualizes electrical voltage signals as waveforms over time',
    description: 'An advanced test instrument that plots a two-dimensional graph of voltage (vertical Y-axis) against time (horizontal X-axis).',
    purpose: 'Allows engineers to view fast transient waveforms, measure clock frequencies, observe signal noise, debug SPI/I2C digital buses, and detect signal distortion.',
    howItWorks: 'High-speed Analog-to-Digital Converters (ADCs) sample the input voltage millions or billions of times per second into high-speed acquisition memory, displaying waveform traces on screen.',
    applications: [
      'Debugging PWM signals and motor driver waveforms',
      'Measuring AC power supply ripple voltage',
      'Decoding serial communication protocol buses (I2C, SPI, CAN)',
      'Detecting ringing and signal reflection on high-speed traces',
    ],
    advantages: [
      'Displays real-time time-domain signal waveforms',
      'Measures rise times, duty cycles, frequencies, and peak-to-peak voltages',
      'Advanced trigger modes catch rare transient glitches',
    ],
    limitations: [
      'High cost for high-bandwidth models',
      'Requires proper probe attenuation (10x) and grounding techniques',
    ],
    keyProperties: {
      'General Specification': 'Tektronix / Rigol Bench Digital Storage Oscilloscope',
      'Bandwidth': '50 MHz to 100 MHz (Standard Entry Bench)',
      'Real-Time Sample Rate': '1.0 GSa/s (Gigasamples per second)',
      'Input Impedance': '1 MΩ || 15 pF (Standard 10x probe mode)',
    },
    equations: [
      {
        title: 'Frequency to Period',
        formula: 'f = \\frac{1}{T}',
        description: 'Frequency equals inverse of measured period (T).',
      },
    ],
    practicalExamples: [
      'Using a DSO with 10x passive probe to measure 100 kHz PWM duty cycle output from a microcontroller pin',
    ],
    commonMistakes: [
      'Attaching oscilloscope probe ground crocodile clip to a non-ground node in non-isolated circuits (causes short circuit to earth ground)',
      'Forgetting to set probe 10x switch setting in DSO menu',
    ],
    relatedComponents: ['multimeter', 'signalgenerator', 'logicanalyser', 'microcontroller'],
    symbolInformation: {
      schematicSymbol: 'Circle containing a sine wave or square wave inside connected to signal node',
      notes: 'BNC connector inputs with 1 MΩ || 15pF input impedance.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'Channel 1 BNC', function: 'Analog input channel 1' },
        { pinNumber: 2, name: 'Channel 2 BNC', function: 'Analog input channel 2' },
        { pinNumber: 3, name: 'Probe Ground Clip', function: 'Earth ground reference' },
      ],
      renderColor: '#0284c7',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'XYZs of Oscilloscopes Primer',
        author: 'Tektronix Technical Division',
        publisher: 'Tektronix Inc.',
        type: 'textbook',
        url: 'https://www.tek.com',
        citationTag: '[Ref 1: Tektronix Scope Guide]',
      },
    ],
    isPopular: true,
  },

  // 18. Signal Generator
  {
    id: 'signalgenerator',
    name: 'Function / Arbitrary Waveform Generator (AWG)',
    symbol: 'GEN',
    category: 'Test Equipment',
    difficulty: 'Intermediate',
    tagline: 'Generates precise mathematical electrical waveforms (Sine, Square, Triangle)',
    description: 'An electronic test instrument that outputs repetitive standard waveforms or custom arbitrary signals at configurable frequencies, amplitudes, and DC offsets.',
    purpose: 'Injects known test signals into circuits to evaluate audio amplifier frequency response, test active filters, and stimulate digital inputs.',
    howItWorks: 'Modern Function Generators use Direct Digital Synthesis (DDS) where a high-speed DAC reads waveform lookup tables at precise clock intervals to synthesize smooth waveforms.',
    applications: [
      'Testing audio amplifier frequency response and THD distortion',
      'Injecting clock pulses into digital logic circuits',
      'Calibrating filter cutoff frequencies',
      'Simulating sensor pulse outputs',
    ],
    advantages: [
      'Precise frequency tuning (µHz resolution via DDS)',
      'Configurable output amplitude, DC offset, and duty cycle',
      'Sweep and modulation capability (AM, FM, FSK)',
    ],
    limitations: [
      'Output current is limited (typically 50 Ω output impedance)',
      'Cannot directly drive heavy power loads without an amplifier',
    ],
    keyProperties: {
      'General Specification': 'Keysight / Rigol DDS Function Generator',
      'Frequency Range': '1 µHz to 25 MHz (Sine wave typical)',
      'Standard Output Impedance': '50 Ω BNC Output',
      'Max Output Amplitude': '10 Vpp into 50 Ω load',
    },
    equations: [
      {
        title: 'DDS Output Frequency',
        formula: 'f_{out} = \\frac{M \\times f_{clock}}{2^N}',
        description: 'Direct Digital Synthesis frequency accumulator equation.',
      },
    ],
    practicalExamples: [
      'Generating a 1 kHz 1Vpp sine wave to test an op-amp low-pass filter frequency response',
    ],
    commonMistakes: [
      'Connecting output directly into a short circuit or high-voltage rail',
      'Forgetting that 50 Ω output load halves the displayed open-circuit voltage',
    ],
    relatedComponents: ['oscilloscope', 'opamp', 'multimeter'],
    symbolInformation: {
      schematicSymbol: 'Circle containing a tilde (~) sine wave symbol',
      notes: 'BNC 50 Ω output port.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'MAIN OUT (BNC)', function: 'Primary 50 Ω waveform output' },
        { pinNumber: 2, name: 'TTL / Sync Out', function: 'Square wave sync pulse output' },
      ],
      renderColor: '#059669',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Fundamentals of Arbitrary Waveform Generation Application Note',
        author: 'Keysight Technologies',
        publisher: 'Keysight',
        type: 'datasheet',
        url: 'https://www.keysight.com',
        citationTag: '[Ref 1: Keysight AWG Guide]',
      },
    ],
    isPopular: false,
  },

  // 19. Logic Analyser
  {
    id: 'logicanalyser',
    name: 'Digital Logic Analyser',
    symbol: 'LA',
    category: 'Test Equipment',
    difficulty: 'Advanced',
    tagline: 'Captures and decodes multi-channel digital logic signals and protocol buses',
    description: 'A specialized digital test instrument that captures high-speed 1s and 0s across 8 to 32+ parallel digital channels simultaneously.',
    purpose: 'Used to inspect, capture, and protocol-decode multi-wire digital buses (I2C, SPI, UART, CAN, USB) to debug embedded software firmware.',
    howItWorks: 'High-speed digital comparators check input voltages against a threshold level (e.g. 1.65V) at rapid clock intervals, storing digital states in high-speed RAM for USB streaming to PC analysis software.',
    applications: [
      'Debugging I2C communication NACK errors between micro and sensor',
      'Capturing SPI flash memory boot sequences',
      'Measuring exact micro execution timing and interrupt latency',
      'Reverse engineering digital communication protocols',
    ],
    advantages: [
      'Captures 8 to 32+ digital channels simultaneously',
      'Automated protocol decoders display ASCII text and HEX frame bytes',
      'Deep sample memory for long trace captures',
    ],
    limitations: [
      'Measures ONLY digital HIGH/LOW states; cannot display analog voltage curves',
      'Requires digital threshold matching',
    ],
    keyProperties: {
      'General Specification': 'Saleae Logic 8 Digital Protocol Analyzer',
      'Digital Channels': '8 Channels (3.3V / 5V Logic Compatible)',
      'Max Sampling Rate': '100 MS/s (Megasamples per second)',
      'Protocol Decoders': 'I2C, SPI, UART, CAN, I2S, 1-Wire',
    },
    equations: [
      {
        title: 'Nyquist Digital Sampling',
        formula: 'f_{sample} \\ge 4 \\times f_{bitrate}',
        description: 'Recommended sampling rate for reliable protocol decoding.',
      },
    ],
    practicalExamples: [
      'Using a Saleae 8-channel logic analyzer to decode 400kHz I2C bus traffic between ESP32 and OLED display',
    ],
    commonMistakes: [
      'Forgetting to connect logic analyzer ground lead to target circuit ground',
      'Exceeding maximum digital input voltage limit',
    ],
    relatedComponents: ['microcontroller', 'oscilloscope'],
    symbolInformation: {
      schematicSymbol: 'Box with parallel digital input lines (D0 - D7) and GND',
      notes: 'Includes fly-wire lead harnesses.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'GND', function: 'Ground reference wire' },
        { pinNumber: 2, name: 'Ch 0 - Ch 7', function: 'Digital input channel pins 0 through 7' },
      ],
      renderColor: '#10b981',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Saleae Logic User Guide & Protocol Analyzer Documentation',
        author: 'Saleae LLC',
        publisher: 'Saleae Technical Support',
        type: 'datasheet',
        url: 'https://www.saleae.com',
        citationTag: '[Ref 1: Saleae Logic Manual]',
      },
    ],
    isPopular: false,
  },

  // 20. Power Supply
  {
    id: 'powersupply',
    name: 'Benchtop DC Power Supply',
    symbol: 'PSU',
    category: 'Power',
    difficulty: 'Beginner',
    tagline: 'Provides regulated, variable DC voltage with adjustable constant-current limiting',
    description: 'A lab instrument that converts AC mains power into clean, controllable DC voltage with precision current limiting features.',
    purpose: 'Safely powers electronic prototype circuits on the workbench while preventing short-circuit damage through adjustable current limit cutoffs.',
    howItWorks: 'Transformers/switching converters step down AC mains, followed by linear post-regulation and dual control feedback loops (Constant Voltage CV / Constant Current CC).',
    applications: [
      'Powering prototype breadboards during development',
      'Testing circuit behavior across varying supply voltages (3.3V to 30V)',
      'Safely bringing up newly soldered PCBs under current limit',
      'Battery charging simulation',
    ],
    advantages: [
      'Adjustable voltage and current limit controls',
      'Short-circuit auto-protection (Constant Current CC mode)',
      'Digital LED displays for real-time voltage and current draw',
    ],
    limitations: [
      'Benchtop unit requires AC mains outlet power',
      'Linear lab PSUs are heavy and generate heat under heavy current loads',
    ],
    keyProperties: {
      'General Specification': 'Keysight / Korad Linear DC Bench Supply',
      'Output Voltage Range': '0 V to 30.0 V DC (Variable)',
      'Current Limit Range': '0 A to 5.0 A DC (Adjustable CC mode)',
      'Ripple & Noise': '< 1 mVrms Low Noise Linear output',
    },
    equations: [
      {
        title: 'Max Output Power',
        formula: 'P_{max} = V_{set} \\times I_{limit}',
        description: 'Maximum power delivered to the prototype load.',
      },
    ],
    practicalExamples: [
      'Setting bench PSU to 5.0V with a 100mA current limit before turning on a freshly assembled circuit board to prevent short circuit fire',
    ],
    commonMistakes: [
      'Setting current limit to maximum (disables short-circuit protection for sensitive chips)',
      'Connecting output terminals backwards to target circuit (+ and - reversed)',
    ],
    relatedComponents: ['voltageregulator', 'battery', 'multimeter'],
    symbolInformation: {
      schematicSymbol: 'Circle with + and - signs inside or DC voltage source symbol',
      notes: 'Red terminal = Positive (+), Black terminal = Negative (-), Green terminal = Earth Ground.',
    },
    modelInformation: {
      modelType: 'generic',
      pinout: [
        { pinNumber: 1, name: 'Positive (+ Red)', function: 'DC output voltage terminal' },
        { pinNumber: 2, name: 'Negative (- Black)', function: 'DC ground reference terminal' },
        { pinNumber: 3, name: 'GND (Green)', function: 'Mains earth ground terminal' },
      ],
      renderColor: '#10b981',
      licenseInfo: 'CC0 Public Domain Open Mesh',
    },
    sources: [
      {
        title: 'Keysight Bench DC Power Supplies Fundamentals',
        author: 'Keysight Technologies',
        publisher: 'Keysight Measurement Insights',
        type: 'standard',
        url: 'https://www.keysight.com',
        citationTag: '[Ref 1: Keysight PSU Manual]',
      },
    ],
    isPopular: true,
  },
];

export function getAllComponents(): ElectronicComponent[] {
  return ELECTRONIC_COMPONENTS;
}

export function getComponentById(id: string): ElectronicComponent | undefined {
  return ELECTRONIC_COMPONENTS.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

export function getRelatedComponents(componentId: string): ElectronicComponent[] {
  const comp = getComponentById(componentId);
  if (!comp || !comp.relatedComponents) return [];
  return comp.relatedComponents
    .map((id) => getComponentById(id))
    .filter((c): c is ElectronicComponent => c !== undefined);
}

export function filterComponents(
  category: string = 'All',
  difficulty: string = 'All',
  query: string = ''
): ElectronicComponent[] {
  return ELECTRONIC_COMPONENTS.filter((comp) => {
    const matchesCategory = category === 'All' || comp.category === category;
    const matchesDifficulty = difficulty === 'All' || comp.difficulty === difficulty;
    const normalizedQuery = query.toLowerCase().trim();
    const matchesQuery =
      !normalizedQuery ||
      comp.name.toLowerCase().includes(normalizedQuery) ||
      comp.description.toLowerCase().includes(normalizedQuery) ||
      comp.symbol.toLowerCase().includes(normalizedQuery) ||
      comp.tagline.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesDifficulty && matchesQuery;
  });
}

export function getAdjacentComponents(id: string) {
  const total = ELECTRONIC_COMPONENTS.length;
  const currentIndex = ELECTRONIC_COMPONENTS.findIndex(
    (c) => c.id.toLowerCase() === id.toLowerCase()
  );

  if (currentIndex === -1) {
    return {
      current: undefined,
      currentIndex: 0,
      total,
      prevComponent: undefined,
      nextComponent: undefined,
    };
  }

  const current = ELECTRONIC_COMPONENTS[currentIndex];
  const prevComponent =
    currentIndex > 0 ? ELECTRONIC_COMPONENTS[currentIndex - 1] : undefined;
  const nextComponent =
    currentIndex < total - 1 ? ELECTRONIC_COMPONENTS[currentIndex + 1] : undefined;

  return {
    current,
    currentIndex,
    total,
    prevComponent,
    nextComponent,
  };
}


