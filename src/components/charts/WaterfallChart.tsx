import React from 'react';
import Plot from 'react-plotly.js';

interface WaterfallChartProps {
  time: number[];
  frequencies: number[];
  power: number[][]; // 2D array [time][freq]
}

export const WaterfallChart: React.FC<WaterfallChartProps> = ({ 
  time, 
  frequencies, 
  power 
}) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Plot
        data={[
          {
            z: power,
            x: frequencies,
            y: time,
            type: 'heatmap',
            colorscale: 'Viridis',
            showscale: false,
            hoverinfo: 'none',
          }
        ]}
        layout={{
          autosize: true,
          margin: { l: 50, r: 20, t: 10, b: 40 },
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
            title: 'Time',
            gridcolor: '#27272a',
            zerolinecolor: '#3f3f46',
            titlefont: { size: 12 },
            autorange: 'reversed'
          },
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
