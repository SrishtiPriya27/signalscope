import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

import { WorkspacePage } from './pages/WorkspacePage';
import { AnalysisPage } from './pages/AnalysisPage';
import { SpectrumPage } from './pages/SpectrumPage';
import { ConstellationPage } from './pages/ConstellationPage';

import { ParametersPage } from './pages/ParametersPage';
import { DemodulationPage } from './pages/DemodulationPage';
import { DeinterleavePage } from './pages/DeinterleavePage';
import { FecPage } from './pages/FecPage';
import { CorrelationPage } from './pages/CorrelationPage';
import { ReportPage } from './pages/ReportPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/workspace" replace />} />
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="spectrum" element={<SpectrumPage />} />
          <Route path="constellation" element={<ConstellationPage />} />
          <Route path="parameters" element={<ParametersPage />} />
          <Route path="demodulation" element={<DemodulationPage />} />
          <Route path="deinterleave" element={<DeinterleavePage />} />
          <Route path="fec" element={<FecPage />} />
          <Route path="correlation" element={<CorrelationPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/workspace" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
