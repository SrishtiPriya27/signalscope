import React from 'react';
import { useSignalStore } from '../../store/useSignalStore';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const stages = [
  'INPUT',
  'FILE PARSER',
  'SIGNAL CONDITIONING',
  'FFT',
  'FEATURE EXTRACTION',
  'PARAMETER EXTRACTION',
  'SYNCHRONIZATION',
  'DEMODULATION',
  'DE-INTERLEAVING',
  'FEC',
  'BITSTREAM',
  'CORRELATION',
  'HEADER/PAYLOAD'
];

export const ProcessingPipeline: React.FC = () => {
  const { pipelineStage } = useSignalStore();

  return (
    <div className="flex flex-col gap-2 p-4 text-xs font-mono">
      <h3 className="text-slate-400 font-sans font-medium uppercase tracking-wider mb-2">Processing Pipeline</h3>
      {stages.map((stage, index) => {
        const isCompleted = pipelineStage > index;
        const isCurrent = pipelineStage === index;
        const isPending = pipelineStage < index;

        return (
          <div 
            key={stage} 
            className={`flex items-center gap-3 p-2 rounded transition-colors ${
              isCurrent ? 'bg-primary/10 text-primary border border-primary/20' : 
              isCompleted ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {isCompleted && <CheckCircle2 size={14} className="text-green-500" />}
            {isCurrent && <Loader2 size={14} className="animate-spin text-primary" />}
            {isPending && <Circle size={14} />}
            
            <span className={isCurrent ? 'font-bold' : ''}>{stage}</span>
          </div>
        );
      })}
    </div>
  );
};
