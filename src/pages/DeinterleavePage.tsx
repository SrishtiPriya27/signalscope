import React, { useEffect, useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import { Loader2, Grid } from 'lucide-react';

export const DeinterleavePage: React.FC = () => {
  const { activeDataset, activeFile, parameters } = useSignalStore();
  const [_bits, setBits] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const runDeinterleave = async () => {
      if ((activeDataset || activeFile) && parameters) {
        setLoading(true);
        try {
          // Just pass a dummy array for the demo
          const dummyBits = new Uint8Array(1024);
          const res = await signalClient.deinterleave(dummyBits, {
            type: parameters.interleaving.value
          });
          setBits(res);
        } catch (e) {}
        setLoading(false);
      }
    };
    runDeinterleave();
  }, [activeDataset, activeFile, parameters]);

  if (!activeDataset && !activeFile) return <div className="p-8 text-center text-slate-400">Please load a signal in the workspace first.</div>;
  if (!parameters) return <div className="p-8 text-center text-slate-400">Run parameter extraction before de-interleaving.</div>;

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-400">
      <Loader2 size={32} className="animate-spin mb-4 text-primary" />
      <p>Applying de-interleaving matrix...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">De-interleaving</h1>
          <p className="text-slate-400">Restoring original bit sequence.</p>
        </div>
        <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-full text-sm">
          <Grid size={16} />
          Type: {parameters.interleaving.value}
        </div>
      </div>

      <div className="panel p-6 flex flex-col items-center justify-center min-h-[400px]">
        {parameters.interleaving.value === 'NONE' ? (
          <div className="text-slate-400">No interleaving detected on this signal.</div>
        ) : (
          <div className="w-full">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">Interleaving Matrix (Visualizer)</h3>
            <div className="grid grid-cols-16 gap-1 p-4 bg-zinc-900 rounded border border-border">
               {Array.from({length: 256}).map((_, i) => (
                 <div key={i} className={`h-4 rounded-sm ${Math.random() > 0.5 ? 'bg-primary' : 'bg-slate-700'}`} />
               ))}
            </div>
            <p className="text-xs text-slate-500 text-center mt-4 uppercase tracking-widest">Simulated De-interleaving Matrix Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};
