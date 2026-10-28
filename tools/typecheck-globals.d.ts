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
