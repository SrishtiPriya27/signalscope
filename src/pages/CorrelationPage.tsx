import React, { useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import { Loader2, Search, Crosshair } from 'lucide-react';
import type { CorrelationResult } from '../types';

export const CorrelationPage: React.FC = () => {
  const { activeDataset, activeFile, addLog } = useSignalStore();
  const [pattern, setPattern] = useState('1ACFFC1D');
  const [result, setResult] = useState<CorrelationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!pattern) return;
    setLoading(true);
    addLog('INFO', 'Correlation', `Searching for pattern: ${pattern}`);
    try {
      const dummyBits = new Uint8Array(1024);
      const res = await signalClient.correlate(dummyBits, { patternHex: pattern });
      setResult(res);
      addLog('SUCCESS', 'Correlation', `Found ${res.matches.length} matches`);
    } catch (e) {}
    setLoading(false);
  };

  if (!activeDataset && !activeFile) return <div className="p-8 text-center text-slate-400">Please load a signal in the workspace first.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Bitstream Correlation</h1>
          <p className="text-slate-400">Search for known sync words or preambles.</p>
        </div>
      </div>

      <div className="panel p-4 shrink-0 flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            className="w-full bg-zinc-900 border border-border rounded py-2 pl-10 pr-4 text-slate-200 font-mono focus:outline-none focus:border-primary transition-colors"
            placeholder="Enter Hex pattern (e.g. 1ACFFC1D)"
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading || !pattern}
          className="btn-primary flex items-center gap-2 py-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Crosshair size={18} />}
          Correlate
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
          <div className="panel p-4 md:col-span-1">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">Matches</h3>
            <div className="space-y-2">
              {result.matches.map((m, i) => (
                <div key={i} className="flex justify-between p-2 bg-zinc-900 rounded border border-border">
                  <span className="text-slate-400">Pos: {m.position}</span>
                  <span className="text-green-400 font-mono font-bold">{(m.score * 100).toFixed(1)}%</span>
                </div>
              ))}
              {result.matches.length === 0 && (
                <div className="text-slate-500 italic p-2">No matches found.</div>
              )}
            </div>
          </div>
          <div className="panel p-4 md:col-span-2">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">Header / Payload Detection</h3>
            <div className="flex w-full h-12 rounded overflow-hidden text-xs font-bold text-center leading-[3rem]">
               <div className="w-[10%] bg-blue-500/80 text-white" title="Preamble">PRE</div>
               <div className="w-[5%] bg-green-500/80 text-white" title="Sync Word">SYNC</div>
               <div className="w-[15%] bg-purple-500/80 text-white" title="Header">HDR</div>
               <div className="w-[60%] bg-zinc-700 text-slate-300" title="Payload">PAYLOAD</div>
               <div className="w-[10%] bg-red-500/80 text-white" title="CRC">CRC</div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center uppercase tracking-widest">Simulated Frame Structure</p>
          </div>
        </div>
      )}

      <div className="panel p-4 flex-1 flex flex-col min-h-[300px]">
        <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4 shrink-0">Bitstream Viewer</h3>
        <div className="flex-1 bg-zinc-950 rounded border border-border p-4 font-mono text-xs text-slate-400 overflow-y-auto scrollbar-thin leading-relaxed break-all">
          {/* Mock bitstream rendering */}
          {Array.from({ length: 2000 }).map((_, i) => {
            const isMatch = result?.matches.some(m => i >= m.position && i < m.position + pattern.length * 4);
            return (
              <span key={i} className={isMatch ? 'bg-primary text-white font-bold' : ''}>
                {Math.random() > 0.5 ? '1' : '0'}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
