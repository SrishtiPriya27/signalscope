import React from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { MonitorPlay, Activity } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { demoMode, setDemoMode } = useSignalStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 mb-1">Settings</h1>
        <p className="text-slate-400">Configure application behavior and processing options.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-2">Processing Engine</h2>
        
        <div className="panel p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="mt-1">
              <MonitorPlay size={24} className={demoMode ? 'text-primary' : 'text-slate-500'} />
            </div>
            <div>
              <h3 className="font-medium text-slate-200">Demo Mode</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-lg">
                Use the mock DSP engine to generate deterministic, visually coherent analysis results for pre-defined datasets. Required for browser-based prototype demonstrations.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setDemoMode(!demoMode)}
            className={`w-12 h-6 rounded-full transition-colors relative ${demoMode ? 'bg-primary' : 'bg-zinc-700'}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${demoMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="panel p-6 flex items-center justify-between opacity-50 pointer-events-none">
          <div className="flex gap-4">
            <div className="mt-1">
              <Activity size={24} className="text-slate-500" />
            </div>
            <div>
              <h3 className="font-medium text-slate-200">Remote Backend URL (Future)</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-lg">
                Connect to a remote Python/GNU Radio DSP cluster for processing large raw files.
              </p>
            </div>
          </div>
          <input 
            type="text" 
            disabled 
            placeholder="http://localhost:8000/api" 
            className="bg-zinc-900 border border-border rounded px-3 py-1.5 text-sm w-64"
          />
        </div>
      </div>
    </div>
  );
};
