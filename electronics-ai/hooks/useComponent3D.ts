import { useState, useCallback } from 'react';
import { ElectronicComponent } from '@/types/component';
import { ELECTRONIC_COMPONENTS } from '@/data/components';

export function useComponent3D() {
  const [selectedComponent, setSelectedComponent] = useState<ElectronicComponent>(
    ELECTRONIC_COMPONENTS[0]
  );
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showPinoutOverlay, setShowPinoutOverlay] = useState<boolean>(false);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  const selectComponentById = useCallback((id: string) => {
    const found = ELECTRONIC_COMPONENTS.find((c) => c.id === id);
    if (found) {
      setSelectedComponent(found);
    }
  }, []);

  const toggleAutoRotate = useCallback(() => setAutoRotate((prev) => !prev), []);
  const togglePinoutOverlay = useCallback(() => setShowPinoutOverlay((prev) => !prev), []);
  const toggleWireframe = useCallback(() => setWireframeMode((prev) => !prev), []);

  return {
    selectedComponent,
    setSelectedComponent,
    selectComponentById,
    autoRotate,
    toggleAutoRotate,
    showPinoutOverlay,
    togglePinoutOverlay,
    wireframeMode,
    toggleWireframe,
  };
}
