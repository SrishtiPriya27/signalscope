import React, { useEffect, useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import { Loader2, Zap } from 'lucide-react';
import type { DemodulationResult } from '../types';

export const DemodulationPage: React.FC = () => {
  const { activeDataset, activeFile, parameters } = useSignalStore();
  const [result, setResult] = useState<DemodulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const runDemod = async () => {
      if ((activeDataset || activeFile) && parameters) {
        setLoading(true);
        try {
          const res = await signalClient.demodulate(new ArrayBuffer(0), {
            modulation: parameters.modulation.value,
            symbolRate: parameters.symbolRate.value
          });
          setResult(res);
        } catch (e) {
          // generic fallback
        }
        setLoading(false);
      }
    };
    runDemod();
  }, [activeDataset, activeFile, parameters]);

  if (!activeDataset && !activeFile) return <div className="p-8 text-center text-slate-400">Please load a signal in the workspace first.</div>;
  if (!parameters) return <div className="p-8 text-center text-slate-400">Run parameter extraction before demodulation.</div>;

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-400">
      <Loader2 size={32} className="animate-spin mb-4 text-primary" />
      <p>Demodulating signal...</p>
    </div>
  );

  if (!result) return <div className="p-8 text-center text-red-400">Demodulation failed or unsupported.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Demodulation Results</h1>
          <p className="text-slate-400">Symbol recovery and bitstream mapping.</p>
        </div>
        <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-full text-sm">
          <Zap size={16} />
          {parameters.modulation.value} Demodulator Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel p-6">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">Synchronization</h3>
          <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded border border-border">
            <span className="text-slate-400">Carrier Lock</span>
            {result.syncFound ? (
              <span className="text-green-400 font-bold">LOCKED</span>
            ) : (
              <span className="text-red-400 font-bold">UNLOCKED</span>
            )}
          </div>
        </div>

        <div className="panel p-6">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">Recovered Symbols</h3>
          <div className="font-mono text-xs text-slate-300 break-all bg-zinc-900/50 p-3 rounded border border-border h-24 overflow-y-auto scrollbar-thin">
            {result.recoveredSymbols.join(' ')}
          </div>
        </div>
      </div>

      <div className="panel p-6">
        <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">Initial Soft Bits (Preview)</h3>
        <div className="font-mono text-xs text-slate-400 break-all bg-zinc-900/50 p-4 rounded border border-border h-48 overflow-y-auto scrollbar-thin leading-relaxed">
          {Array.from(result.recoveredBits).map(b => b.toString(2).padStart(8, '0')).join('')}
        </div>
      </div>
    </div>
  );
};
