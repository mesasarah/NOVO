
import React, { useState, useEffect } from 'react';
import { getMockStressSignal } from '../services/stressService';
import { StressSignal } from '../types';

export const Dashboard: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [stress, setStress] = useState<StressSignal>(getMockStressSignal());
  
  useEffect(() => {
    const interval = setInterval(() => setStress(getMockStressSignal()), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Oceanic Pulse</h1>
          <p className="text-teal-300/40 text-sm font-medium uppercase tracking-widest mt-1">Real-time biometrics & mental tides</p>
        </div>
        <div className="px-4 py-2 glass rounded-full text-teal-400 text-[10px] font-black uppercase tracking-widest border border-teal-500/20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          Telemetry Connected
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MetricCard 
          title="Vitals" 
          value={`${stress.heartRate} BPM`} 
          sub={stress.isSpike ? "Storm Turbulence" : "Tranquil Flow"}
          color={stress.isSpike ? "rose" : "teal"}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
        />
        <MetricCard 
          title="Resilience" 
          value={`${stress.hrv} ms`} 
          sub={stress.hrv > 50 ? "Steady Anchor" : "Shallow Surface"}
          color={stress.hrv > 50 ? "teal" : "amber"}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        />
      </div>

      <div className="glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-black text-white">Emotional Current</h2>
            <p className="text-teal-300/40 text-[10px] font-black uppercase tracking-widest">Last 7 Sessions</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-teal-400">Stable</span>
            <p className="text-[10px] text-teal-300/40 uppercase font-black tracking-widest">Trend</p>
          </div>
        </div>

        <div className="flex items-end justify-between h-48 gap-4">
          {[6, 8, 4, 3, 7, 9, 5].map((val, i) => (
            <div key={i} className="flex-grow flex flex-col items-center gap-4 group/bar">
              <div 
                className={`w-full rounded-2xl transition-all duration-1000 group-hover/bar:brightness-125 ${val < 4 ? 'bg-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.2)]' : val < 7 ? 'bg-teal-500/20 shadow-[0_0_30px_rgba(20,184,166,0.1)]' : 'bg-teal-500/60 shadow-[0_0_40px_rgba(20,184,166,0.3)]'}`} 
                style={{ height: `${val * 10}%` }}
              ></div>
              <span className="text-[9px] font-black text-teal-500/30 uppercase tracking-tighter">Day {i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: string; sub: string; color: string; icon: React.ReactNode }> = ({ title, value, sub, color, icon }) => {
  const colorMap = {
    rose: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
    teal: 'text-teal-400 border-teal-500/20 bg-teal-500/5',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  }[color as 'rose' | 'teal' | 'amber'];

  return (
    <div className={`glass p-8 rounded-[2.5rem] border flex items-center gap-8 group transition-all hover:border-teal-500/30 ${colorMap}`}>
      <div className="p-5 rounded-3xl bg-white/5 text-current group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">{title}</p>
        <p className="text-3xl font-black text-white mt-1 group-hover:text-glow transition-all">{value}</p>
        <p className="text-xs font-medium opacity-60 mt-1">{sub}</p>
      </div>
    </div>
  );
};
