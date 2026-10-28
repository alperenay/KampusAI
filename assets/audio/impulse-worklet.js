/* Process on the audio rendering thread. No audio is transmitted or persisted. */
class KampusImpulse extends AudioWorkletProcessor {
  constructor() {
    super();
    this.last = -1;
    this.noise = 0.005;
    this.prev = 0;
    this.filtered = 0;
  }
  process(inputs) {
    const data = inputs[0]?.[0];
    if (data)
      for (let i = 0; i < data.length; i++) {
        const alpha = 1 / (1 + (2 * Math.PI * 800) / sampleRate);
        this.filtered = alpha * (this.filtered + data[i] - this.prev);
        this.prev = data[i];
        const a = Math.abs(this.filtered),
          t = currentTime + i / sampleRate;
        const threshold = Math.max(0.08, this.noise * 7);
        if (a > threshold && t - this.last > 0.015) {
          this.last = t;
          this.port.postMessage({ time: t, amplitude: a, threshold });
        }
        this.noise = 0.999 * this.noise + 0.001 * Math.min(a, 0.1);
      }
    return true;
  }
}
registerProcessor("kampus-impulse", KampusImpulse);
