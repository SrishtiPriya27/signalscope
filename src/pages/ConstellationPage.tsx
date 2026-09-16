import React, { useEffect, useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import { ConstellationChart } from '../components/charts/ConstellationChart';
import { Loader2 } from 'lucide-react';

export const ConstellationPage: React.FC = () => {
  const { activeDataset, activeFile } = useSignalStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (activeDataset || activeFile) {
        setLoading(true);
        const result = await signalClient.analyzeSignal(new ArrayBuffer(0));
        setData(result);
        setLoading(false);
      }
    };
    loadData();
  }, [activeDataset, activeFile]);

  if (!activeDataset && !activeFile) {
    return <div className="p-8 text-center text-slate-400">Please load a signal in the workspace first.</div>;
  }

  if (loading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400">
        <Loader2 size={32} className="animate-spin mb-4 text-primary" />
        <p>Extracting symbols...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="panel p-4 flex-1 flex flex-col min-h-[400px]">
        <h2 className="text-sm font-medium text-slate-300 mb-2 uppercase tracking-wider">I/Q Constellation</h2>
        <div className="flex-1 relative flex justify-center">
          <div className="w-full max-w-[600px] h-full">
            <ConstellationChart 
              i={data.constellation.i} 
              q={data.constellation.q} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
