export interface ComponentPhysicsState {
  isPowered: boolean;
  voltage: number;         // Volts (V)
  resistance: number;      // Ohms (Ω)
  current: number;         // Amperes (A) or mA
  rpm: number;             // Revolutions Per Minute (for Motors)
  capacitance: number;     // Microfarads (µF)
  chargePercent: number;   // 0% to 100% (for Capacitors)
  isEnergized: boolean;    // For Relays
  signalType: 'sine' | 'square' | 'triangle'; // For Oscilloscope & Function Gen
  signalFrequency: number; // Hertz (Hz)
  gateVoltage: number;     // Gate-Source Voltage Vgs for MOSFETs
  gateThreshold: number;   // Vgs Threshold
}

export const INITIAL_PHYSICS_STATE: ComponentPhysicsState = {
  isPowered: true,
  voltage: 5.0,
  resistance: 220,
  current: 0.0227, // 22.7 mA
  rpm: 3000,
  capacitance: 100,
  chargePercent: 0,
  isEnergized: false,
  signalType: 'sine',
  signalFrequency: 1000,
  gateVoltage: 0.0,
  gateThreshold: 2.5,
};
