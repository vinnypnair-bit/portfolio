'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ElectronicComponent } from '@/types/component';
import { ComponentPhysicsState } from '@/types/interaction';
import {
  Zap,
  Sliders,
  Play,
  RotateCcw,
  AlertTriangle,
  Info,
  Power,
  Gauge,
} from 'lucide-react';

interface PhysicsPanelProps {
  component: ElectronicComponent;
  state: ComponentPhysicsState;
  onChangeState: (newState: Partial<ComponentPhysicsState>) => void;
}

function InteractivePhysicsPanel({
  component,
  state,
  onChangeState,
}: PhysicsPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chargingInterval, setChargingInterval] = useState<NodeJS.Timeout | null>(null);

  // Render Oscilloscope Live Waveform on canvas
  useEffect(() => {
    if (component.id !== 'oscilloscope' && component.id !== 'signalgenerator') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const renderWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (!state.isPowered) {
        // Flatline
        ctx.strokeStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const freqMultiplier = (state.signalFrequency / 1000) * 0.05;
      const amplitude = (state.voltage / 15) * (canvas.height / 2.5);
      const centerY = canvas.height / 2;

      for (let x = 0; x < canvas.width; x++) {
        const t = x * freqMultiplier + phase;
        let y = centerY;

        if (state.signalType === 'sine') {
          y = centerY - Math.sin(t) * amplitude;
        } else if (state.signalType === 'square') {
          y = centerY - (Math.sin(t) >= 0 ? amplitude : -amplitude);
        } else if (state.signalType === 'triangle') {
          y = centerY - (Math.asin(Math.sin(t)) * (2 / Math.PI)) * amplitude;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      phase += 0.08;
      animationFrameId = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [component.id, state.isPowered, state.signalType, state.signalFrequency, state.voltage]);

  // Capacitor Charge / Discharge Animation Handler
  const handleStartCapacitorCharge = () => {
    if (chargingInterval) clearInterval(chargingInterval);

    onChangeState({ chargePercent: 0 });
    let currentCharge = 0;

    const interval = setInterval(() => {
      currentCharge += 4;
      if (currentCharge >= 100) {
        currentCharge = 100;
        clearInterval(interval);
      }
      onChangeState({ chargePercent: currentCharge });
    }, 50);

    setChargingInterval(interval);
  };

  const handleStartCapacitorDischarge = () => {
    if (chargingInterval) clearInterval(chargingInterval);

    let currentCharge = state.chargePercent;

    const interval = setInterval(() => {
      currentCharge -= 5;
      if (currentCharge <= 0) {
        currentCharge = 0;
        clearInterval(interval);
      }
      onChangeState({ chargePercent: currentCharge });
    }, 40);

    setChargingInterval(interval);
  };

  // Render Component Specific Physics Controls
  const renderControlsForComponent = () => {
    switch (component.id) {
      // 1. LED
      case 'led': {
        const calculatedCurrent = state.isPowered ? ((state.voltage - 2.0) / state.resistance) * 1000 : 0;
        const isOvercurrent = calculatedCurrent > 30;
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Power State:</span>
              <button
                onClick={() => onChangeState({ isPowered: !state.isPowered })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  state.isPowered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{state.isPowered ? 'ACTIVE (ON)' : 'DEACTIVATED (OFF)'}</span>
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Supply Voltage (Vcc):</span>
                <span className="font-mono font-bold text-slate-900">{state.voltage.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="0.1"
                value={state.voltage}
                onChange={(e) => onChangeState({ voltage: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Current Limiting Resistor:</span>
                <span className="font-mono font-bold text-slate-900">{state.resistance} Ω</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={state.resistance}
                onChange={(e) => onChangeState({ resistance: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">LED Forward Voltage (Vf):</span>
                <span className="text-emerald-700 font-bold">2.0 V (Red)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Calculated Current (If):</span>
                <span className={`font-bold ${isOvercurrent ? 'text-rose-600' : 'text-slate-900'}`}>
                  {calculatedCurrent < 0 ? '0.0 mA' : `${calculatedCurrent.toFixed(1)} mA`}
                </span>
              </div>
              {isOvercurrent && (
                <div className="text-[11px] text-rose-600 font-sans flex items-center gap-1 mt-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Over-current Warning! LED would burn out.
                </div>
              )}
            </div>
          </div>
        );
      }

      // 2. DC Motor
      case 'dcmotor': {
        const effectiveRpm = state.isPowered ? state.rpm : 0;
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Motor Power Switch:</span>
              <button
                onClick={() => onChangeState({ isPowered: !state.isPowered })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  state.isPowered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{state.isPowered ? 'MOTOR RUNNING' : 'STOPPED'}</span>
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Speed (RPM Control):</span>
                <span className="font-mono font-bold text-slate-900">{effectiveRpm} RPM</span>
              </div>
              <input
                type="range"
                min="0"
                max="12000"
                step="500"
                disabled={!state.isPowered}
                value={state.rpm}
                onChange={(e) => onChangeState({ rpm: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer disabled:opacity-50"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Torque Back-EMF:</span>
                <span className="text-emerald-700 font-bold">{((effectiveRpm / 12000) * 12).toFixed(1)} V</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Current Draw:</span>
                <span className="text-slate-900 font-bold">{(0.1 + (effectiveRpm / 12000) * 1.5).toFixed(2)} A</span>
              </div>
            </div>
          </div>
        );
      }

      // 3. Relay
      case 'relay': {
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Coil Excitation Control:</span>
              <button
                onClick={() => onChangeState({ isEnergized: !state.isEnergized })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  state.isEnergized
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{state.isEnergized ? 'COIL ENERGISED (ON)' : 'COIL DE-ENERGISED (OFF)'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-600" /> Switch Contact State:
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-center">
                <div
                  className={`p-2 rounded-lg border ${
                    !state.isEnergized
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}
                >
                  COM → NC (Connected)
                </div>
                <div
                  className={`p-2 rounded-lg border ${
                    state.isEnergized
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}
                >
                  COM → NO (Connected)
                </div>
              </div>
            </div>
          </div>
        );
      }

      // 4. Oscilloscope & Signal Generator
      case 'oscilloscope':
      case 'signalgenerator': {
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">DSO Power:</span>
              <button
                onClick={() => onChangeState({ isPowered: !state.isPowered })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  state.isPowered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {state.isPowered ? 'DISPLAY ACTIVE' : 'POWER OFF'}
              </button>
            </div>

            {/* Live Waveform Canvas */}
            <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-950 shadow-inner">
              <canvas ref={canvasRef} width={340} height={120} className="w-full h-[120px]" />
            </div>

            {/* Signal Controls */}
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {(['sine', 'square', 'triangle'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => onChangeState({ signalType: st })}
                  className={`py-1.5 rounded-lg font-mono capitalize border transition-all ${
                    state.signalType === st
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st} Wave
                </button>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Signal Frequency:</span>
                <span className="font-mono font-bold text-slate-900">{state.signalFrequency} Hz</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={state.signalFrequency}
                onChange={(e) => onChangeState({ signalFrequency: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        );
      }

      // 5. Power Supply
      case 'powersupply': {
        const currentDraw = state.isPowered ? Math.min(state.voltage / 10, 5.0) : 0;
        const wattage = state.voltage * currentDraw;
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Master Output Switch:</span>
              <button
                onClick={() => onChangeState({ isPowered: !state.isPowered })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  state.isPowered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {state.isPowered ? 'OUTPUT ENABLED' : 'OUTPUT OFF'}
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Voltage Output Knob:</span>
                <span className="font-mono font-bold text-slate-900">{state.voltage.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={state.voltage}
                onChange={(e) => onChangeState({ voltage: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1 shadow-xs">
              <div className="flex justify-between text-emerald-400">
                <span>Voltage (CV Mode):</span>
                <span className="font-bold text-sm">{(state.isPowered ? state.voltage : 0).toFixed(2)} V</span>
              </div>
              <div className="flex justify-between text-cyan-400">
                <span>Current (Load Draw):</span>
                <span className="font-bold text-sm">{currentDraw.toFixed(2)} A</span>
              </div>
              <div className="flex justify-between text-amber-400 border-t border-slate-800 pt-1">
                <span>Total Output Power:</span>
                <span className="font-bold text-sm">{wattage.toFixed(1)} W</span>
              </div>
            </div>
          </div>
        );
      }

      // 6. Resistor (Ohm's Law Calculator)
      case 'resistor': {
        const calculatedI = (state.voltage / state.resistance) * 1000; // mA
        const powerWatts = (state.voltage * state.voltage) / state.resistance;
        const isOverheated = powerWatts > 0.25;

        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Applied Voltage (V):</span>
                <span className="font-mono font-bold text-slate-900">{state.voltage.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="0.5"
                value={state.voltage}
                onChange={(e) => onChangeState({ voltage: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Resistance Value (R):</span>
                <span className="font-mono font-bold text-slate-900">{state.resistance} Ω</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={state.resistance}
                onChange={(e) => onChangeState({ resistance: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Ohm&apos;s Current ($I = V / R$):</span>
                <span className="font-bold text-emerald-700 text-sm">{calculatedI.toFixed(2)} mA</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Power Loss ($P = V^2 / R$):</span>
                <span className={`font-bold ${isOverheated ? 'text-rose-600' : 'text-slate-900'}`}>
                  {powerWatts.toFixed(3)} W (Rating: 0.25 W)
                </span>
              </div>

              {isOverheated && (
                <div className="text-[11px] text-rose-600 font-sans flex items-center gap-1 font-semibold pt-1 border-t border-rose-100">
                  <AlertTriangle className="w-3.5 h-3.5" /> Thermal Overload: Exceeds 1/4W resistor rating!
                </div>
              )}
            </div>
          </div>
        );
      }

      // 7. Capacitor (Charge / Discharge)
      case 'capacitor': {
        const storedVoltage = (state.chargePercent / 100) * state.voltage;
        const timeConstantMs = (state.resistance * state.capacitance) / 1000;

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleStartCapacitorCharge}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" /> Charge Cap
              </button>
              <button
                onClick={handleStartCapacitorDischarge}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Discharge
              </button>
            </div>

            {/* Charge Level Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-600">Electrostatic Charge:</span>
                <span className="font-bold text-emerald-700">{state.chargePercent}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
                  style={{ width: `${state.chargePercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Stored Plate Voltage:</span>
                <span className="font-bold text-slate-900">{storedVoltage.toFixed(2)} V</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">RC Time Constant ($\tau = RC$):</span>
                <span className="font-bold text-emerald-700">{timeConstantMs.toFixed(1)} ms</span>
              </div>
            </div>
          </div>
        );
      }

      // 8. MOSFET & Transistors
      case 'mosfet':
      case 'transistor': {
        const isConducting = state.gateVoltage >= state.gateThreshold;
        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Control Voltage (Vgs):</span>
                <span className="font-mono font-bold text-slate-900">{state.gateVoltage.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.2"
                value={state.gateVoltage}
                onChange={(e) => onChangeState({ gateVoltage: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-semibold text-slate-900 flex items-center justify-between">
                <span>Channel State:</span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded font-bold border ${
                    isConducting
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  {isConducting ? 'SATURATION (CONDUCTING)' : 'CUTOFF (OFF)'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed font-mono">
                Gate Threshold Vgs(th) = {state.gateThreshold}V.{' '}
                {isConducting
                  ? 'Channel fully turned ON with low Rds(on) resistance.'
                  : 'Channel turned OFF; blocking drain current.'}
              </div>
            </div>
          </div>
        );
      }

      // Default Generic Component Controls
      default: {
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Power Circuit:</span>
              <button
                onClick={() => onChangeState({ isPowered: !state.isPowered })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  state.isPowered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {state.isPowered ? 'CIRCUIT ACTIVE' : 'CIRCUIT OFF'}
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Input Voltage:</span>
                <span className="font-mono font-bold text-slate-900">{state.voltage.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={state.voltage}
                onChange={(e) => onChangeState({ voltage: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-600" />
          Interactive Physics Control Panel
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
          Tailored Model
        </span>
      </div>

      {renderControlsForComponent()}

      {/* Educational Disclaimer */}
      <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Educational Simulation: Idealized 25°C room model without parasitic trace resistance.
        </span>
      </div>
    </div>
  );
}

export default React.memo(InteractivePhysicsPanel);

