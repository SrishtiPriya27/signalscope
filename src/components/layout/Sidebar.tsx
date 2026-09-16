import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FolderOpen, 
  Activity, 
  Waves, 
  Settings2, 
  Radio, 
  Cpu, 
  Binary, 
  Share2, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useSignalStore } from '../../store/useSignalStore';
import { ProcessingPipeline } from '../pipeline/ProcessingPipeline';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { demoMode } = useSignalStore();

  const navItems = [
    { to: '/workspace', icon: <FolderOpen size={20} />, label: 'Workspace' },
    { to: '/analysis', icon: <Activity size={20} />, label: 'Analysis' },
    { to: '/spectrum', icon: <Waves size={20} />, label: 'Spectrum & Waterfall' },
    { to: '/constellation', icon: <Radio size={20} />, label: 'Constellation' },
    { to: '/parameters', icon: <Settings2 size={20} />, label: 'Parameters' },
    { to: '/demodulation', icon: <Activity size={20} />, label: 'Demodulation' },
    { to: '/deinterleave', icon: <Cpu size={20} />, label: 'De-interleave' },
    { to: '/fec', icon: <Share2 size={20} />, label: 'FEC' },
    { to: '/correlation', icon: <Binary size={20} />, label: 'Correlation' },
    { to: '/report', icon: <FileText size={20} />, label: 'Report' },
  ];

  return (
    <aside className={`bg-zinc-950 border-r border-border transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
        {!collapsed && <span className="font-mono font-bold text-lg tracking-wider text-slate-200">SignalScope</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {demoMode && !collapsed && (
        <div className="bg-blue-900/30 border-y border-blue-800/50 p-2 text-xs text-blue-400 font-mono text-center flex items-center justify-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          DEMO MODE ACTIVE
        </div>
      )}

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-slate-400 hover:bg-zinc-900 hover:text-slate-200'
              }`
            }
            title={collapsed ? item.label : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-border shrink-0">
        <NavLink
          to="/settings"
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-400 hover:bg-zinc-900 hover:text-slate-200'
            }`
          }
          title={collapsed ? "Settings" : undefined}
        >
          <span className="shrink-0"><Settings size={20} /></span>
          {!collapsed && <span className="font-medium text-sm">Settings</span>}
        </NavLink>
      </div>
      
      {!collapsed && (
        <div className="border-t border-border overflow-y-auto max-h-[40vh] scrollbar-thin">
          <ProcessingPipeline />
        </div>
      )}
    </aside>
  );
};
