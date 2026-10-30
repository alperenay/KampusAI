// Boundary to the existing IIFE App namespace. New module internals are checked.
declare const App: any;
interface GenericReadingSensor extends EventTarget {
  start(): void;
  stop(): void;
  illuminance: number;
  x: number;
  y: number;
  z: number;
}
interface Window {
  AmbientLightSensor?: new (options: {
    frequency: number;
  }) => GenericReadingSensor;
  Magnetometer?: new (options: { frequency: number }) => GenericReadingSensor;
  webkitAudioContext?: typeof AudioContext;
}

interface Window {
  jsQR: (data: Uint8ClampedArray, width: number, height: number) => { data: string } | null;
  qrcode: (version: number, correction: string) => { addData(text: string): void; make(): void; createSvgTag(options: {cellSize: number; margin: number; scalable: boolean}): string };
}

interface Window { SpeechRecognition?: any; webkitSpeechRecognition?: any; KampusNative?: any; __nativeSpeech?: (event: any) => void; }

interface Window { fflate?: any; }

interface AppearanceOptions {
  palette: string; atmosphere: string; style: string; font: string;
  readingFont: string; readingSize: string; lineHeight: string;
  readingWidth: string; tracking: string; corners: string; density: string;
  motion: string; blur: string; background: string;
  shadows: boolean; ambientMotion: boolean; touchFeedback: boolean; intro: boolean;
}
interface Window {
  KampusAppearanceConfig: {
    palettes: {id: string; tr: string; en: string; dark: string[]; light: string[]; swatch: string[]}[];
    atmospheres: {id: string; tr: string; en: string; a: string; b: string}[];
    fonts: Record<string, string>;
    choices: Record<string, string[]>;
    defaults: AppearanceOptions;
    normalize(value: unknown): AppearanceOptions;
    read(get: (key: string, fallback: unknown) => unknown): AppearanceOptions;
    apply(root: HTMLElement, value: Partial<AppearanceOptions>, mode: string): void;
  };
}

// Early branded splash is declared by the inline index.html bootstrap before modules load.
interface Window {
  __startupFallback?: ReturnType<typeof setTimeout>;
  __startupSkip?: boolean;
  __startupDismissEarly?: () => void;
}
