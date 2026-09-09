'use client';

import React, { useRef, useState, useEffect, Suspense, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Grid, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ElectronicComponent, PinoutInfo } from '@/types/component';
import { ComponentPhysicsState, INITIAL_PHYSICS_STATE } from '@/types/interaction';
import {
  RotateCw,
  Eye,
  Maximize2,
  Minimize2,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Sliders,
  AlertCircle,
} from 'lucide-react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL / 3D Model load issue gracefully handled:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function ExternalGLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} scale={1.2} position={[0, 0, 0]} />;
}

// Interactive 3D Models with Physics State animations
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

function Capacitor3D({ wireframe, physicsState }: { wireframe?: boolean; physicsState: ComponentPhysicsState }) {
  const chargeGlow = (physicsState.chargePercent / 100) * 0.8;
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.5, 32]} />
        <meshStandardMaterial color="#0284c7" roughness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Charged dielectric glow indicator */}
      {physicsState.chargePercent > 0 && (
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 1.52, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={chargeGlow} />
        </mesh>
      )}
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

function LED3D({ wireframe, physicsState }: { wireframe?: boolean; physicsState: ComponentPhysicsState }) {
  const isIlluminated = physicsState.isPowered && physicsState.voltage >= 2.0;
  return (
    <group position={[0, 0.3, 0]}>
      {/* LED Plastic Bulb */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
        <meshStandardMaterial
          color={isIlluminated ? '#10b981' : '#064e3b'}
          emissive={isIlluminated ? '#10b981' : '#000000'}
          emissiveIntensity={isIlluminated ? 1.5 : 0}
          roughness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Point Light Emission when ON */}
      {isIlluminated && <pointLight position={[0, 0.6, 0]} intensity={2.5} color="#10b981" distance={4} />}

      {/* Anode / Cathode Leads */}
      <mesh position={[0.15, -0.5, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.0, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.15, -0.4, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.8, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function DCMotor3D({ wireframe, physicsState }: { wireframe?: boolean; physicsState: ComponentPhysicsState }) {
  const shaftRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (shaftRef.current && physicsState.isPowered) {
      const rotSpeed = (physicsState.rpm / 60) * Math.PI * 2 * delta;
      shaftRef.current.rotation.z += rotSpeed;
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      {/* Motor Metal Casing */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 1.4, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} wireframe={wireframe} />
      </mesh>

      {/* Rotating Shaft & Propeller Blade */}
      <group ref={shaftRef} position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Fan Propeller Blade visual */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.15]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
      </group>
    </group>
  );
}

function Relay3D({ wireframe, physicsState }: { wireframe?: boolean; physicsState: ComponentPhysicsState }) {
  return (
    <group position={[0, 0.3, 0]}>
      {/* Relay Enclosure Box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.7, 0.8]} />
        <meshStandardMaterial
          color={physicsState.isEnergized ? '#0284c7' : '#1e293b'}
          roughness={0.3}
          wireframe={wireframe}
        />
      </mesh>
      {/* Active LED indicator */}
      <mesh position={[0.4, 0.36, 0.2]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial color={physicsState.isEnergized ? '#10b981' : '#64748b'} />
      </mesh>
    </group>
  );
}

function GenericEquipment3D({ wireframe, color = '#10b981' }: { wireframe?: boolean; color?: string }) {
  return (
    <group position={[0, 0.4, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.6, 0.9, 1.0]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 0.2, 0.51]}>
        <planeGeometry args={[1.4, 0.7]} />
        <meshStandardMaterial color="#0284c7" roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, 0.25, 0.52]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function ComponentModelSwitch({
  component,
  wireframe,
  showPinout,
  physicsState,
}: {
  component: ElectronicComponent;
  wireframe?: boolean;
  showPinout?: boolean;
  physicsState: ComponentPhysicsState;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { modelInformation } = component;

  useFrame((_, delta) => {
    if (groupRef.current && component.id !== 'dcmotor') {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  const renderModelContent = () => {
    if (modelInformation.gltfUrl) {
      return (
        <Suspense fallback={<GenericEquipment3D wireframe={wireframe} color={modelInformation.renderColor} />}>
          <ExternalGLTFModel url={modelInformation.gltfUrl} />
        </Suspense>
      );
    }

    switch (component.id) {
      case 'led':
        return <LED3D wireframe={wireframe} physicsState={physicsState} />;
      case 'dcmotor':
        return <DCMotor3D wireframe={wireframe} physicsState={physicsState} />;
      case 'relay':
        return <Relay3D wireframe={wireframe} physicsState={physicsState} />;
      case 'capacitor':
        return <Capacitor3D wireframe={wireframe} physicsState={physicsState} />;
      case 'resistor':
        return <Resistor3D wireframe={wireframe} />;
      default:
        return <GenericEquipment3D wireframe={wireframe} color={modelInformation.renderColor} />;
    }
  };

  return (
    <group ref={groupRef}>
      {renderModelContent()}

      {showPinout && modelInformation.pinout && modelInformation.pinout.length > 0 && (
        <Html position={[0, 1.4, 0]} center distanceFactor={6}>
          <div className="bg-white/95 text-slate-900 border border-emerald-500/40 p-3 rounded-xl text-xs font-mono shadow-xl whitespace-nowrap animate-fade-in">
            <div className="font-bold text-emerald-700 border-b border-emerald-100 pb-1 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pinout Map
            </div>
            {modelInformation.pinout.map((p: PinoutInfo) => (
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

interface Interactive3DViewerProps {
  component: ElectronicComponent;
  height?: string;
  physicsState?: ComponentPhysicsState;
}

export default function Interactive3DViewer({
  component,
  height = 'h-[420px]',
  physicsState = INITIAL_PHYSICS_STATE,
}: Interactive3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  const [autoRotate, setAutoRotate] = useState(true);
  const [showPinout, setShowPinout] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Tab visibility observer to pause rendering when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Viewport intersection observer to pause rendering when 3D viewer is scrolled out of view
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.warn('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen error:', err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const FallbackUI = (
    <div className="w-full h-full min-h-[300px] rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-500 p-6 text-center">
      <AlertCircle className="w-8 h-8 text-amber-500" />
      <span className="text-xs font-bold text-slate-800">3D Parametric Render Engine</span>
      <p className="text-[11px] text-slate-500 max-w-xs">
        Procedural WebGL render active for {component.name}.
      </p>
    </div>
  );

  const isCanvasActive = isIntersecting && isTabVisible;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${height} rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-inner flex flex-col justify-between`}
    >
      {/* Screen Reader Textual Alternative for 3D Information */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Interactive 3D view of ${component.name} (${component.symbol}). Category: ${component.category}. Current state: ${
          physicsState.isPowered ? 'Active/Powered ON' : 'Deactivated/OFF'
        }. ${autoRotate ? 'Automatic model rotation active.' : ''} ${
          wireframe ? 'Wireframe mesh mode enabled.' : ''
        } ${showPinout ? 'Pinout annotations visible.' : ''}`}
      </div>

      {/* Top Controls Overlay */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/90 backdrop-blur p-1.5 rounded-xl border border-slate-200 shadow-sm text-slate-600">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-lg text-xs transition-all min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden ${
            autoRotate ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-100 text-slate-600'
          }`}
          title="Toggle Auto Rotation"
          aria-label={autoRotate ? 'Disable 3D auto rotation' : 'Enable 3D auto rotation'}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={() => setShowPinout(!showPinout)}
          className={`p-2 rounded-lg text-xs transition-all min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden ${
            showPinout ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-100 text-slate-600'
          }`}
          title="Toggle Pin Map Overlay"
          aria-label={showPinout ? 'Hide pinout overlay' : 'Show pinout overlay'}
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={() => setWireframe(!wireframe)}
          className={`p-2 rounded-lg text-xs transition-all min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden ${
            wireframe ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-100 text-slate-600'
          }`}
          title="Toggle Wireframe Mesh"
          aria-label={wireframe ? 'Disable wireframe mode' : 'Enable wireframe mode'}
        >
          <Sliders className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-xs hover:bg-slate-100 text-slate-600 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
          title="Zoom In"
          aria-label="Zoom in 3D viewer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-xs hover:bg-slate-100 text-slate-600 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
          title="Zoom Out"
          aria-label="Zoom out 3D viewer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={handleResetCamera}
          className="p-2 rounded-lg text-xs hover:bg-slate-100 text-slate-600 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
          title="Reset Camera View"
          aria-label="Reset 3D camera view"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg text-xs hover:bg-slate-100 text-slate-600 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
          title="Toggle Fullscreen"
          aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* WebGL Canvas with On-demand Frameloop when inactive */}
      <WebGLErrorBoundary fallback={FallbackUI}>
        <Canvas
          camera={{ position: [0, 1.5, 3.8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          frameloop={isCanvasActive ? 'always' : 'never'}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
          <directionalLight position={[-5, -4, -5]} intensity={0.4} color="#10b981" />
          <pointLight position={[0, 3, 0]} intensity={0.8} color="#059669" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <ComponentModelSwitch
              component={component}
              wireframe={wireframe}
              showPinout={showPinout}
              physicsState={physicsState}
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
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            autoRotate={isCanvasActive && autoRotate && component.id !== 'dcmotor'}
            autoRotateSpeed={1.8}
            minDistance={1.8}
            maxDistance={8}
            makeDefault
          />
        </Canvas>
      </WebGLErrorBoundary>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="bg-white/90 backdrop-blur border border-slate-200 text-slate-600 text-[11px] px-3 py-1 rounded-lg shadow-sm pointer-events-auto flex items-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
          <span>WebGL Studio • {component.name}</span>
        </div>
      </div>
    </div>

  );
}
