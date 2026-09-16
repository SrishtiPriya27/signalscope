import React, { useState } from 'react';
import { useSignalStore } from '../../store/useSignalStore';
import { Database, Zap, Play, Loader2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeDataset, activeFile, metadata, pipelineStage, setPipelineStage, addLog } = useSignalStore();
  const [analyzing, setAnalyzing] = useState(false);

  const getSourceDisplay = () => {
    if (activeDataset) return activeDataset.name;
    if (activeFile) return activeFile.name;
    return 'No source loaded';
  };

  return (
    <header className="h-14 bg-zinc-950 border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-300">
          <Database size={16} className="text-primary" />
          <span className="font-medium text-sm font-mono truncate max-w-xs" title={getSourceDisplay()}>
            {getSourceDisplay()}
          </span>
        </div>
        
        {metadata && (
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="bg-zinc-900 px-2 py-1 rounded">{(metadata.sampleRate / 1e6).toFixed(2)} MS/s</span>
            <span className="bg-zinc-900 px-2 py-1 rounded">{metadata.format}</span>
            {metadata.centerFrequency && (
              <span className="bg-zinc-900 px-2 py-1 rounded">{(metadata.centerFrequency / 1e6).toFixed(1)} MHz</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="btn-primary flex items-center gap-2 py-1.5 px-3 text-sm"
          disabled={(!activeDataset && !activeFile) || analyzing}
          onClick={async () => {
            setAnalyzing(true);
            const stages = 12; // 0 to 12
            for (let i = pipelineStage; i <= stages; i++) {
              setPipelineStage(i);
              addLog('INFO', 'Pipeline', `Running stage: ${i}`);
              await new Promise(r => setTimeout(r, 600)); // Simulate async processing
            }
            addLog('SUCCESS', 'Pipeline', `Full analysis complete`);
            setAnalyzing(false);
          }}
        >
          {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
          {analyzing ? 'Analyzing...' : 'Run Full Analysis'}
        </button>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-l border-border pl-4">
          <Zap size={14} className="text-green-500" />
          <span>System Ready</span>
        </div>
      </div>
    </header>
  );
};
