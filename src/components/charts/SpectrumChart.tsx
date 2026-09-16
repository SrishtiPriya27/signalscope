import React from 'react';
import Plot from 'react-plotly.js';

interface SpectrumChartProps {
  frequencies: number[];
  magnitudes: number[];
  centerFrequency?: number;
  sampleRate?: number;
}

export const SpectrumChart: React.FC<SpectrumChartProps> = ({ 
  frequencies, 
  magnitudes
}) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Plot
        data={[
          {
            x: frequencies,
            y: magnitudes,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#3b82f6', width: 1.5 },
            fill: 'tozeroy',
            fillcolor: 'rgba(59, 130, 246, 0.1)',
            hoverinfo: 'x+y',
          }
        ]}
        layout={{
          autosize: true,
          margin: { l: 50, r: 20, t: 30, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter' },
          xaxis: {
            title: 'Frequency (Hz)',
            gridcolor: '#27272a',
            zerolinecolor: '#3f3f46',
            titlefont: { size: 12 },
          },
          yaxis: {
            title: 'Power (dBFS)',
            gridcolor: '#27272a',
            zerolinecolor: '#3f3f46',
            titlefont: { size: 12 },
            range: [-120, 0]
          },
          showlegend: false,
          hovermode: 'closest',
        }}
        config={{
          responsive: true,
          displayModeBar: false,
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};
