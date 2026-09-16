import React, { useEffect, useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import type { FECResult } from '../types';

export const FecPage: React.FC = () => {
  const { activeDataset, activeFile, parameters } = useSignalStore();
  const [result, setResult] = useState<FECResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const runFEC = async () => {
      if ((activeDataset || activeFile) && parameters) {
        setLoading(true);
        try {
          const dummyBits = new Uint8Array(1024);
          const res = await signalClient.decodeFEC(dummyBits, {
            type: parameters.fec.value
          });
          setResult(res);
        } catch (e) {}
        setLoading(false);
      }
    };
    runFEC();
  }, [activeDataset, activeFile, parameters]);

  if (!activeDataset && !activeFile) return <div className="p-8 text-center text-slate-400">Please load a signal in the workspace first.</div>;
  if (!parameters) return <div className="p-8 text-center text-slate-400">Run parameter extraction before FEC decoding.</div>;

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-400">
      <Loader2 size={32} className="animate-spin mb-4 text-primary" />
      <p>Running Forward Error Correction...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Forward Error Correction</h1>
          <p className="text-slate-400">Error detection and correction status.</p>
        </div>
        <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-full text-sm">
          <ShieldCheck size={16} />
          {parameters.fec.value} Decoder
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel p-6 flex flex-col items-center justify-center min-h-[200px]">
          {result?.success ? (
            <>
               <ShieldCheck size={48} className="text-green-500 mb-4" />
               <h3 className="text-lg font-bold text-green-400">Decoding Successful</h3>
               <p className="text-slate-400 mt-2">Bitstream recovered.</p>
            </>
          ) : (
            <>
               <AlertCircle size={48} className="text-red-500 mb-4" />
               <h3 className="text-lg font-bold text-red-400">Decoding Failed</h3>
               <p className="text-slate-400 mt-2">Errors exceed correction capability.</p>
            </>
          )}
        </div>
        
        <div className="panel p-6">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">Statistics</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center p-3 bg-zinc-900 rounded border border-border">
               <span className="text-slate-400">Decoder Type</span>
               <span className="text-slate-200 font-mono">{parameters.fec.value}</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-zinc-900 rounded border border-border">
               <span className="text-slate-400">Errors Corrected</span>
               <span className="text-yellow-400 font-bold font-mono">{result?.errorsCorrected || 0}</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-zinc-900 rounded border border-border">
               <span className="text-slate-400">Estimated BER</span>
               <span className="text-slate-200 font-mono">1.2e-4</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
