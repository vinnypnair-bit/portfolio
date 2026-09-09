export type ComponentCategory =
  | 'Passive'
  | 'Semiconductor'
  | 'Integrated Circuit'
  | 'Electromechanical'
  | 'Power'
  | 'Test Equipment';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface PinoutInfo {
  pinNumber: number;
  name: string;
  function: string;
}

export interface EquationInfo {
  title: string;
  formula: string;
  description: string;
}

export type SourceType = 'datasheet' | 'textbook' | 'standard' | 'university';

export interface SourceInfo {
  title: string;
  author: string;
  publisher: string;
  type: SourceType;
  url?: string;
  citationTag?: string;
}

export interface SymbolInfo {
  schematicSymbol: string;
  notes: string;
}

export interface ModelInfo {
  modelType: 'resistor' | 'capacitor' | 'inductor' | 'diode' | 'transistor' | 'ic555' | 'generic';
  pinout: PinoutInfo[];
  renderColor: string;
  gltfUrl?: string;
  licenseInfo?: string;
}

export interface ElectronicComponent {
  id: string;
  name: string;
  symbol: string;
  category: ComponentCategory;
  difficulty: DifficultyLevel;
  tagline: string;
  description: string;
  purpose: string;
  howItWorks: string;
  applications: string[];
  advantages: string[];
  limitations: string[];
  keyProperties: Record<string, string>;
  equations: EquationInfo[];
  practicalExamples: string[];
  commonMistakes: string[];
  relatedComponents: string[];
  symbolInformation: SymbolInfo;
  modelInformation: ModelInfo;
  sources: SourceInfo[];
  isPopular?: boolean;
}
