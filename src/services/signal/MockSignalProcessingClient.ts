import type { 
  SignalProcessingClient,
  DemodConfig,
  DeinterleaveConfig,
  FECConfig,
  CorrelateConfig
} from './SignalProcessingClient';
import type { 
  SignalMetadata, 
  SignalParameters, 
  DemodulationResult, 
  FECResult, 
  CorrelationResult,
  MockDataset
} from '../../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockSignalProcessingClient implements SignalProcessingClient {
  private activeDataset: MockDataset | null = null;

  setMockDataset(dataset: MockDataset) {
    this.activeDataset = dataset;
  }

  async inspectFile(file: File): Promise<SignalMetadata> {
    await delay(800);
    if (this.activeDataset) {
      return this.activeDataset.metadata;
    }
    
    // Generic fallback for any file uploaded not matching a dataset
    return {
      filename: file.name,
      sizeBytes: file.size,
      format: file.name.endsWith('.wav') ? 'WAV' : 'IQ_FLOAT32',
      sampleCount: Math.floor(file.size / 8),
      channels: 2,
      sampleRate: 1000000,
    };
  }

  async analyzeSignal(_data: ArrayBuffer): Promise<any> {
    await delay(1500);
    if (this.activeDataset) {
      return {
        timeDomain: this.activeDataset.timeDomain,
        spectrum: this.activeDataset.spectrum,
        waterfall: this.activeDataset.waterfall,
        constellation: this.activeDataset.constellation,
      };
    }
    return null;
  }

  async estimateParameters(_data: ArrayBuffer): Promise<SignalParameters> {
    await delay(2000);
    if (this.activeDataset) {
      return this.activeDataset.parameters;
    }
    throw new Error("No dataset loaded");
  }

  async demodulate(_data: ArrayBuffer, _config: DemodConfig): Promise<DemodulationResult> {
    await delay(1200);
    return {
      syncFound: true,
      constellationBeforeSync: [], // UI can reuse initial constellation
      constellationAfterSync: [],
      recoveredSymbols: Array.from({length: 100}, () => Math.floor(Math.random() * 4)),
      recoveredBits: this.activeDataset ? this.activeDataset.bits : new Uint8Array(1024),
    };
  }

  async deinterleave(bits: Uint8Array, _config: DeinterleaveConfig): Promise<Uint8Array> {
    await delay(800);
    return bits; // Return same bits for demo
  }

  async decodeFEC(bits: Uint8Array, config: FECConfig): Promise<FECResult> {
    await delay(1000);
    return {
      type: config.type as any,
      success: true,
      errorsCorrected: Math.floor(Math.random() * 15),
      decodedBits: bits,
    };
  }

  async correlate(_bits: Uint8Array, config: CorrelateConfig): Promise<CorrelationResult> {
    await delay(600);
    return {
      pattern: config.patternHex,
      matches: [
        { position: 128, score: 1.0 },
        { position: 512, score: 0.95 },
      ]
    };
  }
}

export const signalClient = new MockSignalProcessingClient();
