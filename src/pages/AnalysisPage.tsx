import React, { useEffect, useState } from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { signalClient } from '../services/signal/MockSignalProcessingClient';
import Plot from 'react-plotly.js';
import { Loader2, Activity } from 'lucide-react';

export const AnalysisPage: React.FC = () => {
  const { activeDataset, activeFile, metadata } = useSignalStore();
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
        <p>Analyzing signal...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="panel p-4 md:col-span-1">
           <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
             <Activity size={16} /> Signal Properties
           </h3>
           {metadata && (
             <div className="space-y-3 text-sm">
               <div className="flex justify-between border-b border-border pb-1">
                 <span className="text-slate-500">Duration</span>
                 <span className="text-slate-200">{metadata.durationMs ? `${metadata.durationMs} ms` : 'Unknown'}</span>
               </div>
               <div className="flex justify-between border-b border-border pb-1">
                 <span className="text-slate-500">Samples</span>
                 <span className="text-slate-200">{metadata.sampleCount.toLocaleString()}</span>
               </div>
               <div className="flex justify-between border-b border-border pb-1">
                 <span className="text-slate-500">Format</span>
                 <span className="text-slate-200">{metadata.format}</span>
               </div>
               <div className="flex justify-between border-b border-border pb-1">
                 <span className="text-slate-500">Channels</span>
                 <span className="text-slate-200">{metadata.channels}</span>
               </div>
               <div className="flex justify-between pb-1">
                 <span className="text-slate-500">Sample Rate</span>
                 <span className="text-slate-200">{(metadata.sampleRate / 1e6).toFixed(2)} MHz</span>
               </div>
             </div>
           )}
        </div>

        <div className="panel p-4 md:col-span-3 flex flex-col min-h-[300px]">
          <h2 className="text-sm font-medium text-slate-300 mb-2 uppercase tracking-wider">Time Domain (I/Q)</h2>
          <div className="flex-1 relative">
            <Plot
              data={[
                {
                  x: data.timeDomain.t,
                  y: data.timeDomain.i,
                  type: 'scatter',
                  mode: 'lines',
                  name: 'In-phase (I)',
                  line: { color: '#3b82f6', width: 1.5 },
                },
                {
                  x: data.timeDomain.t,
                  y: data.timeDomain.q,
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Quadrature (Q)',
                  line: { color: '#ef4444', width: 1.5, dash: 'dot' },
                }
              ]}
              layout={{
                autosize: true,
                margin: { l: 40, r: 20, t: 10, b: 30 },
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                font: { color: '#94a3b8', family: 'Inter' },
                xaxis: { title: 'Time (μs)', gridcolor: '#27272a', zerolinecolor: '#3f3f46', titlefont: { size: 12 } },
                yaxis: { title: 'Amplitude', gridcolor: '#27272a', zerolinecolor: '#3f3f46', titlefont: { size: 12 } },
                legend: { orientation: 'h', y: 1.1 },
                hovermode: 'x unified'
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
