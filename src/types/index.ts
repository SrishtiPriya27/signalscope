export type Modulation = 'UNKNOWN' | 'BPSK' | 'QPSK' | '8-PSK' | '16-QAM' | '64-QAM' | 'FSK';
export type FECType = 'NONE' | 'CONVOLUTIONAL' | 'REED_SOLOMON' | 'LDPC' | 'CONCATENATED';
export type InterleavingType = 'NONE' | 'BLOCK' | 'CONVOLUTIONAL' | 'DIAGONAL' | 'PSEUDO_RANDOM';
export type SignalFormat = 'IQ_FLOAT32' | 'IQ_FLOAT64' | 'IQ_INT16' | 'IQ_INT8' | 'WAV';
export type ProcessingStatus = 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR' | 'SIMULATED' | 'ESTIMATED' | 'INFERRED';
export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';

export interface SignalMetadata {
  filename: string;
  sizeBytes: number;
  format: SignalFormat;
  durationMs?: number;
  sampleCount: number;
  channels: number;
  bitDepth?: number;
  sampleRate: number;
  centerFrequency?: number;
  byteOrder?: 'LE' | 'BE';
  iqOrder?: 'IQ' | 'QI';
}

export interface SignalParameters {
  sampleRate: { value: number; confidence: number; source: string; status: ProcessingStatus };
  modulation: { value: Modulation; confidence: number; source: string; status: ProcessingStatus };
  symbolRate: { value: number; confidence: number; source: string; status: ProcessingStatus };
  snr: { value: number; confidence: number; source: string; status: ProcessingStatus };
  carrierOffset: { value: number; confidence: number; source: string; status: ProcessingStatus };
  bandwidth: { value: number; confidence: number; source: string; status: ProcessingStatus };
  fec: { value: FECType; confidence: number; source: string; status: ProcessingStatus };
  interleaving: { value: InterleavingType; confidence: number; source: string; status: ProcessingStatus };
  freqDeviation?: { value: number; confidence: number; source: string; status: ProcessingStatus };
}

export interface DemodulationResult {
  syncFound: boolean;
  constellationBeforeSync: number[][]; // [I, Q][]
  constellationAfterSync: number[][]; // [I, Q][]
  recoveredSymbols: number[];
  recoveredBits: Uint8Array;
}

export interface FECResult {
  type: FECType;
  success: boolean;
  errorsCorrected: number;
  decodedBits: Uint8Array;
}

export interface CorrelationResult {
  pattern: string;
  matches: { position: number; score: number }[];
}

export interface MockDataset {
  id: string;
  name: string;
  metadata: SignalMetadata;
  parameters: SignalParameters;
  timeDomain: { t: number[]; i: number[]; q: number[] };
  spectrum: { f: number[]; magnitude: number[] };
  waterfall: { t: number[]; f: number[]; power: number[][] };
  constellation: { i: number[]; q: number[] };
  bits: Uint8Array;
}
