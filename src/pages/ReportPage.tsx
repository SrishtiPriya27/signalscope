import React from 'react';
import { useSignalStore } from '../store/useSignalStore';
import { FileText, Download } from 'lucide-react';

export const ReportPage: React.FC = () => {
  const { activeDataset, activeFile, metadata, parameters, logs } = useSignalStore();

  const handleExport = (format: 'json' | 'csv' | 'txt') => {
    let content = '';
    let mime = 'text/plain';
    
    const reportData = {
      metadata,
      parameters,
      processingTimeMs: 1450, // Simulated
      events: logs.length
    };

    if (format === 'json') {
      content = JSON.stringify(reportData, null, 2);
      mime = 'application/json';
    } else if (format === 'csv') {
      content = `Parameter,Value,Confidence\n`;
      if (parameters) {
        Object.entries(parameters).forEach(([key, param]: [string, any]) => {
          content += `${key},${param.value},${param.confidence}\n`;
        });
      }
      mime = 'text/csv';
    } else {
      content = `SignalScope Analysis Report\n===========================\n\n`;
      if (metadata) content += `File: ${metadata.filename}\nFormat: ${metadata.format}\nSample Rate: ${metadata.sampleRate}\n\n`;
      if (parameters) {
        content += `Parameters:\n`;
        Object.entries(parameters).forEach(([key, param]: [string, any]) => {
          content += `- ${key}: ${param.value} (${param.confidence}%)\n`;
        });
      }
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signalscope-report.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!activeDataset && !activeFile) return <div className="p-8 text-center text-slate-400">Please load a signal in the workspace first.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Analysis Report</h1>
          <p className="text-slate-400">Consolidated findings and export options.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport('json')} className="btn-secondary flex items-center gap-2 py-1.5 px-3 text-sm">
            <Download size={14} /> JSON
          </button>
          <button onClick={() => handleExport('csv')} className="btn-secondary flex items-center gap-2 py-1.5 px-3 text-sm">
            <Download size={14} /> CSV
          </button>
          <button onClick={() => handleExport('txt')} className="btn-secondary flex items-center gap-2 py-1.5 px-3 text-sm">
            <Download size={14} /> TXT
          </button>
        </div>
      </div>

      <div className="panel p-8 bg-zinc-950/80 prose prose-invert max-w-none">
        <div className="flex items-center gap-4 border-b border-border pb-6 mb-6">
          <FileText size={48} className="text-primary opacity-50" />
          <div>
            <h2 className="text-xl font-mono text-slate-200 m-0">SignalScope Technical Report</h2>
            <p className="text-slate-400 text-sm m-0 mt-1">Generated automatically upon full pipeline completion.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4 border-b border-border pb-2">File Metadata</h3>
            {metadata ? (
              <dl className="text-sm space-y-2 font-mono">
                <div className="flex justify-between"><dt className="text-slate-500">Filename</dt><dd className="text-slate-200">{metadata.filename}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Format</dt><dd className="text-slate-200">{metadata.format}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Sample Rate</dt><dd className="text-slate-200">{metadata.sampleRate} Hz</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Duration</dt><dd className="text-slate-200">{metadata.durationMs || 'N/A'} ms</dd></div>
              </dl>
            ) : <p className="text-slate-500 text-sm">Not available</p>}
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4 border-b border-border pb-2">Extracted Parameters</h3>
            {parameters ? (
              <dl className="text-sm space-y-2 font-mono">
                <div className="flex justify-between"><dt className="text-slate-500">Modulation</dt><dd className="text-slate-200">{parameters.modulation.value}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Symbol Rate</dt><dd className="text-slate-200">{parameters.symbolRate.value} Hz</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">SNR</dt><dd className="text-slate-200">{parameters.snr.value.toFixed(1)} dB</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">FEC Type</dt><dd className="text-slate-200">{parameters.fec.value}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Interleaving</dt><dd className="text-slate-200">{parameters.interleaving.value}</dd></div>
              </dl>
            ) : <p className="text-slate-500 text-sm">Not available</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
