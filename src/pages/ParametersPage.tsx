import React, { useEffect, useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { SignalParameters, ProcessingStatus } from '../types';

export const ParametersPage: React.FC = () => {
  const { activeDataset, activeFile } = useSignalStore();
  const [params, setParams] = useState<SignalParameters | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (activeDataset || activeFile) {
        setLoading(true);
        try {
          const result = await signalClient.estimateParameters(new ArrayBuffer(0));
          setParams(result);
        } catch (e) {
          // Keep null on generic files not supported by mock
        }
        setLoading(false);
      }
    };
    loadData();
  }, [activeDataset, activeFile]);

  if (!activeDataset && !activeFile) {
    return <div className="p-8 text-center text-slate-400">Please load a signal in the workspace first.</div>;
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400">
        <Loader2 size={32} className="animate-spin mb-4 text-primary" />
        <p>Running Parameter Extraction...</p>
      </div>
    );
  }

  if (!params) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-yellow-500">
        <AlertTriangle size={32} className="mb-4" />
        <p>Parameter extraction failed or unsupported for generic files in demo mode.</p>
      </div>
    );
  }

  const renderStatus = (status: ProcessingStatus) => {
    switch (status) {
      case 'SIMULATED': return <span className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded text-xs">SIMULATED</span>;
      case 'ESTIMATED': return <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded text-xs">ESTIMATED</span>;
      case 'INFERRED': return <span className="text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded text-xs">INFERRED</span>;
      default: return <span className="text-slate-400">{status}</span>;
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 95) return 'text-green-400';
    if (conf >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const rows = [
    { label: 'Sample Rate', data: params.sampleRate, format: (v: any) => `${(v / 1e6).toFixed(2)} MS/s` },
    { label: 'Modulation', data: params.modulation, format: (v: any) => v },
    { label: 'Symbol Rate', data: params.symbolRate, format: (v: any) => `${(v / 1000).toFixed(2)} ksym/s` },
    { label: 'SNR', data: params.snr, format: (v: any) => `${v.toFixed(1)} dB` },
    { label: 'Carrier Offset', data: params.carrierOffset, format: (v: any) => `${v.toFixed(0)} Hz` },
    { label: 'Bandwidth', data: params.bandwidth, format: (v: any) => `${(v / 1000).toFixed(1)} kHz` },
    { label: 'FEC', data: params.fec, format: (v: any) => v },
    { label: 'Interleaving', data: params.interleaving, format: (v: any) => v },
  ];

  if (params.freqDeviation) {
    rows.push({ label: 'Frequency Deviation', data: params.freqDeviation, format: (v: any) => `${v.toFixed(0)} Hz` });
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Extracted Parameters</h1>
          <p className="text-slate-400">Automatic detection and parameter estimation results.</p>
        </div>
        <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full text-sm">
          <CheckCircle2 size={16} />
          Extraction Complete
        </div>
      </div>

      <div className="panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-300">Parameter</th>
              <th className="px-6 py-4 font-medium text-slate-300">Value</th>
              <th className="px-6 py-4 font-medium text-slate-300">Confidence</th>
              <th className="px-6 py-4 font-medium text-slate-300">Source</th>
              <th className="px-6 py-4 font-medium text-slate-300">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-300">{row.label}</td>
                <td className="px-6 py-4 font-mono text-slate-200">{row.format(row.data.value)}</td>
                <td className={`px-6 py-4 font-mono ${getConfidenceColor(row.data.confidence)}`}>
                  {row.data.confidence.toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-slate-400">{row.data.source}</td>
                <td className="px-6 py-4">{renderStatus(row.data.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
