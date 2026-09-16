# SignalScope

SignalScope is a production-quality frontend prototype for automated RF signal analysis and parameter extraction. It was built to demonstrate a complete conceptual DSP pipeline from file ingestion to report generation (SIH26147).

## Features
- **File Inspection**: Support for dragging and dropping `.IQ` and `.WAV` raw files.
- **Signal Visualization**: Interactive Time Domain, Spectrum, Waterfall, and Constellation diagrams.
- **Parameter Extraction**: Simulated automatic parameter extraction with confidence levels.
- **Demodulation**: Simulated sync, symbol recovery, and bitstream output.
- **Error Correction**: FEC and De-interleaving visualizers.
- **Reporting**: Exportable analysis reports (JSON/CSV/TXT).
- **Demo Datasets**: Includes deterministic demo datasets (QPSK, FSK, 16-QAM) to demonstrate the complete pipeline without needing a live backend server.

## Technologies Used
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand (State Management)
- Plotly.js (Scientific Charting)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Vercel Deployment

This application is primarily a frontend engineering workstation designed to run entirely in the browser for prototype purposes.

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Vercel will automatically detect the **Vite** framework.
4. **Build command:** `npm run build`
5. **Output directory:** `dist`

### Environment Variables
You can optionally configure `VITE_SIGNAL_API_URL` to point to a future remote Python/GNU Radio backend. If left blank, the application will automatically fall back to the built-in `MockSignalProcessingClient` which produces deterministic results for demo datasets.

```env
VITE_SIGNAL_API_URL=https://your-backend-api.com
```
