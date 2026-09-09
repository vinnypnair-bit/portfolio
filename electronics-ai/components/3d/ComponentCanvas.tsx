'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Grid, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ElectronicComponent, PinoutInfo } from '@/types/component';

interface ModelProps {
  modelType: ElectronicComponent['modelInformation']['modelType'];
  wireframe?: boolean;
  showPinout?: boolean;
  pinoutData?: PinoutInfo[];
}

function Resistor3D({ wireframe }: { wireframe?: boolean }) {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 1.6, 32]} />
        <meshStandardMaterial color="#e5d5b7" roughness={0.3} wireframe={wireframe} />
      </mesh>
      <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.355, 0.355, 0.12, 32]} />
        <meshStandardMaterial color="#dc2626" roughness={0.2} />
      </mesh>
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.355, 0.355, 0.12, 32]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.355, 0.355, 0.12, 32]} />
        <meshStandardMaterial color="#059669" roughness={0.2} />
      </mesh>
      <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.355, 0.355, 0.12, 32]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Capacitor3D({ wireframe }: { wireframe?: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.5, 32]} />
        <meshStandardMaterial color="#0284c7" roughness={0.2} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 1.255, 0]}>
        <cylinderGeometry args={[0.54, 0.54, 0.02, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.38, 0.5, 0]}>
        <boxGeometry args={[0.05, 1.48, 0.3]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[0.2, -0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Transistor3D({ wireframe }: { wireframe?: boolean }) {
  return (
    <group position={[0, 0.2, 0]}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.9, 32, 1, false, 0, Math.PI * 1.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.05]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      <mesh position={[-0.25, -0.6, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.1, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.1, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.1} />
      </mesh>
      <mesh position={[0.25, -0.6, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.1, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Diode3D({ wireframe }: { wireframe?: boolean }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.4, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.305, 0.305, 0.15, 32]} />
        <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function IC5553D({ wireframe }: { wireframe?: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.8]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} wireframe={wireframe} />
      </mesh>
      <mesh position={[-0.58, 0.25, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.41, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {[-0.4, -0.13, 0.13, 0.4].map((x, idx) => (
        <React.Fragment key={`pins-${idx}`}>
          <mesh position={[x, 0.05, 0.48]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[x, 0.05, -0.48]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

function Inductor3D({ wireframe }: { wireframe?: boolean }) {
  return (
    <group position={[0, 0.5, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.22, 24, 48]} />
        <meshStandardMaterial color="#059669" roughness={0.3} wireframe={wireframe} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.235, 12, 18]} />
        <meshStandardMaterial color="#b45309" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ComponentModelSwitch({ modelType, wireframe, showPinout, pinoutData }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  const renderModel = () => {
    switch (modelType) {
      case 'resistor':
        return <Resistor3D wireframe={wireframe} />;
      case 'capacitor':
        return <Capacitor3D wireframe={wireframe} />;
      case 'transistor':
        return <Transistor3D wireframe={wireframe} />;
      case 'diode':
        return <Diode3D wireframe={wireframe} />;
      case 'ic555':
        return <IC5553D wireframe={wireframe} />;
      case 'inductor':
        return <Inductor3D wireframe={wireframe} />;
      default:
        return <Resistor3D wireframe={wireframe} />;
    }
  };

  return (
    <group ref={groupRef}>
      {renderModel()}

      {showPinout && pinoutData && pinoutData.length > 0 && (
        <Html position={[0, 1.4, 0]} center distanceFactor={6}>
          <div className="bg-white/95 text-slate-900 border border-emerald-500/40 p-3 rounded-xl text-xs font-mono shadow-xl whitespace-nowrap animate-fade-in">
            <div className="font-bold text-emerald-700 border-b border-emerald-100 pb-1 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pinout Map
            </div>
            {pinoutData.map((p: PinoutInfo) => (
              <div key={p.pinNumber} className="flex gap-2">
                <span className="text-emerald-800 font-bold">Pin {p.pinNumber}:</span>
                <span className="text-slate-600">{p.name}</span>
              </div>
            ))}
          </div>
        </Html>
      )}
    </group>
  );
}

interface CanvasProps {
  component: ElectronicComponent;
  wireframe?: boolean;
  showPinout?: boolean;
  autoRotate?: boolean;
}

export default function ComponentCanvas({
  component,
  wireframe = false,
  showPinout = false,
  autoRotate = true,
}: CanvasProps) {
  return (
    <div className="w-full h-full min-h-[340px] relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-inner">
      <Canvas
        camera={{ position: [0, 1.5, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} />
        <directionalLight position={[-5, -4, -5]} intensity={0.5} color="#10b981" />
        <pointLight position={[0, 3, 0]} intensity={0.8} color="#059669" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <ComponentModelSwitch
            modelType={component.modelInformation.modelType}
            wireframe={wireframe}
            showPinout={showPinout}
            pinoutData={component.modelInformation.pinout}
          />
        </Float>

        <Grid
          infiniteGrid
          fadeDistance={12}
          fadeStrength={1.5}
          cellColor="#e2e8f0"
          sectionColor="#cbd5e1"
          cellSize={0.5}
          sectionSize={2}
          position={[0, -1.2, 0]}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.8}
          minDistance={1.8}
          maxDistance={8}
        />
      </Canvas>

      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur border border-slate-200 text-slate-600 text-[11px] px-3 py-1 rounded-lg shadow-sm pointer-events-none flex items-center gap-1.5 font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        3D Realtime Workbench • Drag to rotate
      </div>
    </div>
  );
}
