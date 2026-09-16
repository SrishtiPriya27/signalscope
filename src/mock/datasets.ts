import type { MockDataset } from '../types';

export const mockDatasets: MockDataset[] = [
  {
    id: 'qpsk_telemetry',
    name: 'QPSK Telemetry',
    metadata: {
      filename: 'satellite_qpsk_2.4Msps.iq',
      sizeBytes: 1024 * 1024 * 4,
      format: 'IQ_FLOAT32',
      durationMs: 426,
      sampleCount: 1024000,
      channels: 2,
      sampleRate: 2400000,
      centerFrequency: 435000000,
      iqOrder: 'IQ',
    },
    parameters: {
      sampleRate: { value: 2400000, confidence: 99.9, source: 'Header', status: 'SIMULATED' },
      modulation: { value: 'QPSK', confidence: 92.4, source: 'Demo Classifier', status: 'SIMULATED' },
      symbolRate: { value: 24000, confidence: 89.1, source: 'Demo Estimator', status: 'ESTIMATED' },
      snr: { value: 17.8, confidence: 95.0, source: 'Demo Estimator', status: 'ESTIMATED' },
      carrierOffset: { value: 1250, confidence: 91.2, source: 'Costas Loop', status: 'ESTIMATED' },
      bandwidth: { value: 36000, confidence: 94.5, source: 'Occupied BW', status: 'ESTIMATED' },
      fec: { value: 'LDPC', confidence: 71.0, source: 'Decoder Test', status: 'INFERRED' },
      interleaving: { value: 'CONVOLUTIONAL', confidence: 85.5, source: 'Structure Analysis', status: 'INFERRED' },
    },
    // Truncated mockup data for UI display
    timeDomain: {
      t: Array.from({ length: 500 }, (_, i) => i),
      i: Array.from({ length: 500 }, () => Math.random() * 2 - 1),
      q: Array.from({ length: 500 }, () => Math.random() * 2 - 1),
    },
    spectrum: {
      f: Array.from({ length: 500 }, (_, i) => (i - 250) * 10),
      magnitude: Array.from({ length: 500 }, (_, i) => -100 + (Math.abs(i - 250) < 50 ? 60 + Math.random() * 10 : Math.random() * 20)),
    },
    waterfall: {
      t: Array.from({ length: 50 }, (_, i) => i),
      f: Array.from({ length: 100 }, (_, i) => i),
      power: Array.from({ length: 50 }, () => Array.from({ length: 100 }, (_, i) => -100 + (Math.abs(i - 50) < 10 ? 60 + Math.random() * 10 : Math.random() * 20))),
    },
    constellation: {
      i: Array.from({ length: 1000 }, () => (Math.random() > 0.5 ? 0.7 : -0.7) + (Math.random() * 0.2 - 0.1)),
      q: Array.from({ length: 1000 }, () => (Math.random() > 0.5 ? 0.7 : -0.7) + (Math.random() * 0.2 - 0.1)),
    },
    bits: new Uint8Array(Array.from({ length: 1024 }, () => (Math.random() > 0.5 ? 1 : 0))),
  },
  {
    id: 'fsk_narrowband',
    name: 'Narrowband FSK',
    metadata: {
      filename: 'sensor_fsk_48k.wav',
      sizeBytes: 1024 * 512,
      format: 'WAV',
      durationMs: 5333,
      sampleCount: 256000,
      channels: 1,
      bitDepth: 16,
      sampleRate: 48000,
    },
    parameters: {
      sampleRate: { value: 48000, confidence: 100, source: 'Header', status: 'SIMULATED' },
      modulation: { value: 'FSK', confidence: 95.2, source: 'Demo Classifier', status: 'SIMULATED' },
      symbolRate: { value: 9600, confidence: 90.0, source: 'Demo Estimator', status: 'ESTIMATED' },
      snr: { value: 24.5, confidence: 98.0, source: 'Demo Estimator', status: 'ESTIMATED' },
      carrierOffset: { value: 50, confidence: 85.0, source: 'Demo Estimator', status: 'ESTIMATED' },
      bandwidth: { value: 12000, confidence: 92.0, source: 'Occupied BW', status: 'ESTIMATED' },
      fec: { value: 'NONE', confidence: 90.0, source: 'Decoder Test', status: 'INFERRED' },
      interleaving: { value: 'NONE', confidence: 90.0, source: 'Structure Analysis', status: 'INFERRED' },
      freqDeviation: { value: 2400, confidence: 91.0, source: 'Demo Estimator', status: 'ESTIMATED' },
    },
    timeDomain: {
      t: Array.from({ length: 500 }, (_, i) => i),
      i: Array.from({ length: 500 }, (_, i) => Math.sin(i * 0.1) + Math.random() * 0.1),
      q: Array.from({ length: 500 }, (_, i) => Math.cos(i * 0.1) + Math.random() * 0.1),
    },
    spectrum: {
      f: Array.from({ length: 500 }, (_, i) => (i - 250) * 10),
      magnitude: Array.from({ length: 500 }, (_, i) => -100 + (Math.abs(i - 200) < 5 || Math.abs(i - 300) < 5 ? 70 + Math.random() * 10 : Math.random() * 20)),
    },
    waterfall: {
      t: Array.from({ length: 50 }, (_, i) => i),
      f: Array.from({ length: 100 }, (_, i) => i),
      power: Array.from({ length: 50 }, () => Array.from({ length: 100 }, (_, i) => -100 + (Math.abs(i - 40) < 2 || Math.abs(i - 60) < 2 ? 70 + Math.random() * 10 : Math.random() * 20))),
    },
    constellation: {
      i: Array.from({ length: 1000 }, () => Math.random() * 2 - 1),
      q: Array.from({ length: 1000 }, () => Math.random() * 2 - 1), // FSK constellation is typically a circle or noise-like depending on viz
    },
    bits: new Uint8Array(Array.from({ length: 1024 }, () => (Math.random() > 0.5 ? 1 : 0))),
  },
  {
    id: 'qam16_wideband',
    name: '16-QAM Wideband',
    metadata: {
      filename: 'video_16qam_20mhz.iq',
      sizeBytes: 1024 * 1024 * 20,
      format: 'IQ_FLOAT32',
      durationMs: 125,
      sampleCount: 2500000,
      channels: 2,
      sampleRate: 20000000,
      centerFrequency: 1250000000,
      iqOrder: 'IQ',
    },
    parameters: {
      sampleRate: { value: 20000000, confidence: 99.9, source: 'Header', status: 'SIMULATED' },
      modulation: { value: '16-QAM', confidence: 88.5, source: 'Demo Classifier', status: 'SIMULATED' },
      symbolRate: { value: 15000000, confidence: 82.1, source: 'Demo Estimator', status: 'ESTIMATED' },
      snr: { value: 22.1, confidence: 94.0, source: 'Demo Estimator', status: 'ESTIMATED' },
      carrierOffset: { value: -2500, confidence: 89.2, source: 'Demo Estimator', status: 'ESTIMATED' },
      bandwidth: { value: 18000000, confidence: 96.5, source: 'Occupied BW', status: 'ESTIMATED' },
      fec: { value: 'REED_SOLOMON', confidence: 75.0, source: 'Decoder Test', status: 'INFERRED' },
      interleaving: { value: 'BLOCK', confidence: 80.5, source: 'Structure Analysis', status: 'INFERRED' },
    },
    timeDomain: {
      t: Array.from({ length: 500 }, (_, i) => i),
      i: Array.from({ length: 500 }, () => Math.random() * 2 - 1),
      q: Array.from({ length: 500 }, () => Math.random() * 2 - 1),
    },
    spectrum: {
      f: Array.from({ length: 500 }, (_, i) => (i - 250) * 100),
      magnitude: Array.from({ length: 500 }, (_, i) => -100 + (Math.abs(i - 250) < 150 ? 50 + Math.random() * 5 : Math.random() * 20)),
    },
    waterfall: {
      t: Array.from({ length: 50 }, (_, i) => i),
      f: Array.from({ length: 100 }, (_, i) => i),
      power: Array.from({ length: 50 }, () => Array.from({ length: 100 }, (_, i) => -100 + (Math.abs(i - 50) < 30 ? 50 + Math.random() * 5 : Math.random() * 20))),
    },
    constellation: {
      i: Array.from({ length: 1600 }, (_, index) => {
        const val = [-0.9, -0.3, 0.3, 0.9][index % 4];
        return val + (Math.random() * 0.15 - 0.075);
      }),
      q: Array.from({ length: 1600 }, (_, index) => {
        const val = [-0.9, -0.3, 0.3, 0.9][Math.floor(index / 4) % 4];
        return val + (Math.random() * 0.15 - 0.075);
      }),
    },
    bits: new Uint8Array(Array.from({ length: 1024 }, () => (Math.random() > 0.5 ? 1 : 0))),
  }
];
