import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File as FileIcon, Play, Database } from 'lucide-react';
import { useSignalStore } from '../store/useSignalStore';
import { mockDatasets } from '../mock/datasets';
import { signalClient } from '../services/signal/MockSignalProcessingClient';

export const WorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    setActiveDataset, 
    setActiveFile, 
    setMetadata, 
    addLog, 
    setPipelineStage 
  } = useSignalStore();
  
  const [isDragging, setIsDragging] = useState(false);

  const handleDatasetSelect = async (datasetId: string) => {
    const dataset = mockDatasets.find(d => d.id === datasetId);
    if (dataset) {
      setActiveDataset(dataset);
      setActiveFile(null);
      signalClient.setMockDataset(dataset);
      
      addLog('INFO', 'Workspace', `Loading demo dataset: ${dataset.name}`);
      
      // Simulate file parsing delay
      setPipelineStage(1);
      const metadata = await signalClient.inspectFile(new File([], dataset.metadata.filename));
      setMetadata(metadata);
      setPipelineStage(2);
      
      addLog('SUCCESS', 'FileParser', `Metadata extracted successfully`);
      navigate('/analysis');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setActiveFile(file);
    setActiveDataset(null);
    signalClient.setMockDataset(null as any); // fallback to generic mock behavior
    
    addLog('INFO', 'Workspace', `File loaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    
    setPipelineStage(1);
    const metadata = await signalClient.inspectFile(file);
    setMetadata(metadata);
    setPipelineStage(2);
    
    addLog('SUCCESS', 'FileParser', `Estimated metadata for ${file.name}`);
    navigate('/analysis');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Signal Workspace</h1>
        <p className="text-slate-400">Load a raw baseband file or select a demo dataset to begin analysis.</p>
      </div>

      <div 
        className={`panel p-12 border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-slate-500'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <UploadCloud size={48} className={`mb-4 ${isDragging ? 'text-primary' : 'text-slate-500'}`} />
        <h3 className="text-lg font-medium text-slate-200 mb-1">Drag and drop raw file</h3>
        <p className="text-sm text-slate-400 mb-6 text-center max-w-md">
          Supports .IQ (Complex Float32/16/8) and .WAV formats. For the prototype, large files will be processed entirely in the browser.
        </p>
        
        <label className="btn-primary cursor-pointer flex items-center gap-2">
          <FileIcon size={16} />
          Browse Files
          <input 
            type="file" 
            className="hidden" 
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            accept=".iq,.wav,audio/wav"
          />
        </label>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2 text-slate-200">
          <Database size={18} className="text-primary" />
          Demo Datasets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockDatasets.map(dataset => (
            <div 
              key={dataset.id} 
              className="panel p-4 hover:border-primary/50 cursor-pointer transition-colors group flex items-start justify-between"
              onClick={() => handleDatasetSelect(dataset.id)}
            >
              <div>
                <h3 className="font-medium text-slate-200 group-hover:text-primary transition-colors">
                  {dataset.name}
                </h3>
                <div className="text-xs text-slate-400 mt-1 space-y-0.5 font-mono">
                  <p>{dataset.metadata.filename}</p>
                  <p>{(dataset.metadata.sampleRate / 1e6).toFixed(2)} MS/s • {dataset.metadata.format}</p>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-zinc-800 group-hover:bg-primary/20 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                <Play size={14} className="ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
