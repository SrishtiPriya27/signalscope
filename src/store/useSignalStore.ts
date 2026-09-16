import { create } from 'zustand';
import type { SignalMetadata, SignalParameters, MockDataset } from '../types';

export interface LogEntry {
  id: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  module: string;
  message: string;
}

interface SignalState {
  activeDataset: MockDataset | null;
  activeFile: File | null;
  metadata: SignalMetadata | null;
  parameters: SignalParameters | null;
  
  demoMode: boolean;
  pipelineStage: number; // 0 = Input, 1 = File Parser, 2 = Signal Conditioning, etc.
  
  logs: LogEntry[];
  
  setActiveDataset: (dataset: MockDataset | null) => void;
  setActiveFile: (file: File | null) => void;
  setMetadata: (metadata: SignalMetadata | null) => void;
  setParameters: (params: SignalParameters | null) => void;
  setDemoMode: (enabled: boolean) => void;
  setPipelineStage: (stage: number) => void;
  
  addLog: (severity: LogEntry['severity'], module: string, message: string) => void;
  clearLogs: () => void;
}

export const useSignalStore = create<SignalState>((set) => ({
  activeDataset: null,
  activeFile: null,
  metadata: null,
  parameters: null,
  
  demoMode: true, // Always default to true for the prototype demo
  pipelineStage: 0,
  
  logs: [],
  
  setActiveDataset: (dataset) => set({ activeDataset: dataset }),
  setActiveFile: (file) => set({ activeFile: file }),
  setMetadata: (metadata) => set({ metadata }),
  setParameters: (parameters) => set({ parameters }),
  setDemoMode: (demoMode) => set({ demoMode }),
  setPipelineStage: (pipelineStage) => set({ pipelineStage }),
  
  addLog: (severity, module, message) => set((state) => ({
    logs: [...state.logs, {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString().split('T')[1].split('.')[0],
      severity,
      module,
      message
    }].slice(-100) // Keep last 100 logs
  })),
  clearLogs: () => set({ logs: [] }),
}));
