import React from 'react';
import Plot from 'react-plotly.js';

interface ConstellationChartProps {
  i: number[];
  q: number[];
  title?: string;
}

export const ConstellationChart: React.FC<ConstellationChartProps> = ({ 
  i, 
  q, 
  title 
}) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Plot
        data={[
          {
            x: i,
            y: q,
            type: 'scatter',
            mode: 'markers',
            marker: { 
              color: '#22d3ee', 
              size: 3, 
              opacity: 0.6 
            },
            hoverinfo: 'x+y',
          }
        ]}
        layout={{
          autosize: true,
          margin: { l: 40, r: 40, t: title ? 40 : 20, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'rgba(24, 24, 27, 0.5)',
          font: { color: '#94a3b8', family: 'Inter' },
          title: title ? { text: title, font: { size: 14, color: '#e2e8f0' } } : undefined,
          xaxis: {
            title: 'In-phase (I)',
            gridcolor: '#3f3f46',
            zerolinecolor: '#71717a',
            zerolinewidth: 1,
            titlefont: { size: 12 },
            range: [-1.5, 1.5],
            dtick: 0.5
          },
          yaxis: {
            title: 'Quadrature (Q)',
            gridcolor: '#3f3f46',
            zerolinecolor: '#71717a',
            zerolinewidth: 1,
            titlefont: { size: 12 },
            range: [-1.5, 1.5],
            dtick: 0.5,
            scaleanchor: 'x',
            scaleratio: 1,
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
