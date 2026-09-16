import type { 
  SignalMetadata, 
  SignalParameters, 
  DemodulationResult, 
  FECResult, 
  CorrelationResult 
} from '../../types';

export interface DemodConfig {
  modulation: string;
  symbolRate: number;
}

export interface DeinterleaveConfig {
  type: string;
  blockSize?: number;
}

export interface FECConfig {
  type: string;
}

export interface CorrelateConfig {
  patternHex: string;
}

export interface SignalProcessingClient {
  inspectFile(file: File): Promise<SignalMetadata>;
  analyzeSignal(data: ArrayBuffer): Promise<any>;
  estimateParameters(data: ArrayBuffer): Promise<SignalParameters>;
  demodulate(data: ArrayBuffer, config: DemodConfig): Promise<DemodulationResult>;
  deinterleave(bits: Uint8Array, config: DeinterleaveConfig): Promise<Uint8Array>;
  decodeFEC(bits: Uint8Array, config: FECConfig): Promise<FECResult>;
  correlate(bits: Uint8Array, config: CorrelateConfig): Promise<CorrelationResult>;
}
