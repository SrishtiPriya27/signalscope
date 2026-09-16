import React, { useRef, useEffect } from 'react';
import { useSignalStore } from '../../store/useSignalStore';
import { Terminal, Trash2, Download } from 'lucide-react';

export const EventConsole: React.FC = () => {
  const { logs, clearLogs } = useSignalStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleExport = () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.severity}] [${l.module}] ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signalscope-log-${new Date().toISOString().replace(/:/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getColor = (severity: string) => {
    switch (severity) {
      case 'INFO': return 'text-blue-400';
      case 'WARNING': return 'text-yellow-400';
      case 'ERROR': return 'text-red-400';
      case 'SUCCESS': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="h-48 bg-zinc-950 border-t border-border flex flex-col shrink-0">
      <div className="h-8 border-b border-border flex items-center justify-between px-4 bg-zinc-900/50">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
          <Terminal size={14} />
          Event Console
        </div>
        <div className="flex gap-2">
          <button 
            onClick={clearLogs}
            className="p-1 hover:bg-zinc-800 text-slate-400 hover:text-white rounded transition-colors"
            title="Clear logs"
          >
            <Trash2 size={14} />
          </button>
          <button 
            onClick={handleExport}
            className="p-1 hover:bg-zinc-800 text-slate-400 hover:text-white rounded transition-colors"
            title="Export logs"
          >
            <Download size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 font-mono text-[11px] leading-relaxed">
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">No events logged yet.</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-3 hover:bg-zinc-900/50 py-0.5 px-2 rounded">
              <span className="text-slate-500 shrink-0">{log.timestamp}</span>
              <span className={`shrink-0 w-16 font-semibold ${getColor(log.severity)}`}>
                {log.severity}
              </span>
              <span className="text-slate-400 shrink-0 w-24 truncate" title={log.module}>[{log.module}]</span>
              <span className="text-slate-300 break-all">{log.message}</span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
