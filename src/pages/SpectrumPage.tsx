import React, { useEffect, useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import { SpectrumChart } from '../components/charts/SpectrumChart';
import { WaterfallChart } from '../components/charts/WaterfallChart';
import { Loader2 } from 'lucide-react';

export const SpectrumPage: React.FC = () => {
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
        <p>Computing FFT...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 panel p-4 flex flex-col min-h-[300px]">
        <h2 className="text-sm font-medium text-slate-300 mb-2 uppercase tracking-wider">Power Spectrum</h2>
        <div className="flex-1 relative">
          <SpectrumChart 
            frequencies={data.spectrum.f} 
            magnitudes={data.spectrum.magnitude} 
          />
        </div>
      </div>
      
      <div className="flex-1 panel p-4 flex flex-col min-h-[300px]">
        <h2 className="text-sm font-medium text-slate-300 mb-2 uppercase tracking-wider">Waterfall</h2>
        <div className="flex-1 relative">
          <WaterfallChart 
            time={data.waterfall.t} 
            frequencies={data.waterfall.f} 
            power={data.waterfall.power} 
          />
        </div>
      </div>
    </div>
  );
};
