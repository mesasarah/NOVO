
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPath, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Crisis Banner - More subtle but clear */}
      <div className="bg-rose-500/10 backdrop-blur-md text-rose-300 text-center py-1 px-4 sticky top-0 z-50 border-b border-rose-500/20">
        <p className="text-[10px] font-bold uppercase tracking-widest">
          In distress? <button onClick={() => onNavigate('crisis')} className="underline hover:text-rose-200">Connect to 988 Lifeline</button>
        </p>
      </div>

      <header className="glass border-b border-white/5 sticky top-[28px] z-40">
        <nav className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('buddy')}>
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(100,255,218,0.3)] group-hover:rotate-6 transition-transform">
              <svg className="w-7 h-7 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.381a7 7 0 01-4.684.6l-2.394-.448a2 2 0 11.751-3.93l2.408.451a5 5 0 003.346-.427l.693-.382a8 8 0 014.646-.614l2.423.485a4 4 0 11-1.58 7.72z" /></svg>
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tighter block leading-none">Nova</span>
              <span className="text-[8px] font-black text-teal-500/50 uppercase tracking-[0.2em]">Deep Mindset</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <NavIcon active={currentPath === 'buddy'} onClick={() => onNavigate('buddy')} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} label="Chat" />
            <NavIcon active={currentPath === 'dashboard'} onClick={() => onNavigate('dashboard')} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} label="Pulse" />
            <NavIcon active={currentPath === 'match'} onClick={() => onNavigate('match')} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>} label="Care" />
          </div>
        </nav>
      </header>

      <div className="flex-grow relative z-10">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const NavIcon: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-teal-400' : 'text-white/20 hover:text-white/60'}`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-teal-500/10' : 'bg-transparent'}`}>
      {icon}
    </div>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);
