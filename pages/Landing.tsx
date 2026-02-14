
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-4xl w-full text-center space-y-12 z-10">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/30 text-teal-300 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            Nova v3.0 Deep Water Edition
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
            Dive <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">&gt;</span> deep <br />
            into <span className="text-glow text-teal-300">peace</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-teal-100/60 max-w-2xl mx-auto font-light leading-relaxed">
            Immediate emotional support without the clinical fluff. <br />
            Your persistent companion through the tides of life.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <button 
            onClick={onStart}
            className="group relative px-10 py-5 bg-teal-500 text-slate-900 rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(100,255,218,0.4)] hover:shadow-[0_0_60px_rgba(100,255,218,0.6)] transition-all transform hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Speak with Nova
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>

          <button className="px-10 py-5 glass text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10">
            View My Pulse
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-20 animate-in fade-in duration-1000 delay-500">
          <Feature icon="🌊" title="Fluid Empathy" desc="Non-scripted, context-aware support that evolves with you." />
          <Feature icon="⚓" title="Stable Grounding" desc="Immediate tools for stress spikes and panic prevention." />
          <Feature icon="🐚" title="Safe Harbor" desc="End-to-end encrypted sessions and HIPAA-aligned care." />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-teal-500/40 text-[10px] font-black tracking-widest uppercase">
        <span>Scroll to explore the depths</span>
        <div className="w-0.5 h-10 bg-gradient-to-b from-teal-500/40 to-transparent"></div>
      </div>
    </div>
  );
};

const Feature: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="glass p-6 rounded-3xl border border-white/5 group hover:border-teal-500/20 transition-all">
    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-lg font-bold text-teal-200 mb-2">{title}</h3>
    <p className="text-sm text-teal-100/40 leading-relaxed">{desc}</p>
  </div>
);
