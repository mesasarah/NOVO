
import React from 'react';
import { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  onUpdate: (s: UserSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  const update = (key: keyof UserSettings, val: string) => {
    onUpdate({ ...settings, [key]: val });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nova Calibration</h1>
        <p className="text-slate-500">Set the currents for your emotional voyage.</p>
      </header>

      <div className="space-y-8">
        <SettingSection 
          label="Conversation Current (Tone)" 
          value={settings.tone} 
          options={['Soft', 'Direct', 'Minimal']} 
          onChange={(v) => update('tone', v)} 
          desc="Soft is like a warm lagoon. Direct is honest and deep. Minimal stays below the surface."
        />
        
        <SettingSection 
          label="Tide Frequency (Check-Ins)" 
          value={settings.checkInFrequency} 
          options={['High', 'Medium', 'Low']} 
          onChange={(v) => update('checkInFrequency', v)} 
          desc="How often Nova breaks the silence to check on you."
        />

        <div className="bg-teal-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-800 rounded-full opacity-30 blur-xl"></div>
          <h3 className="text-xl font-bold mb-4">Deep Sea Security</h3>
          <p className="text-sm opacity-70 mb-6">Your data is locked in an encrypted vault. Only you hold the key. We adhere to the strictest clinical privacy standards.</p>
          <button className="w-full border border-white/30 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">Export Logs</button>
          <button className="w-full mt-4 text-rose-300 font-bold text-sm hover:underline">Terminate Connection & Delete Data</button>
        </div>
      </div>
    </div>
  );
};

const SettingSection: React.FC<{ label: string; value: string; options: string[]; onChange: (v: string) => void; desc: string }> = ({ label, value, options, onChange, desc }) => (
  <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-4">
    <div>
      <h3 className="text-lg font-bold text-slate-800">{label}</h3>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
    <div className="flex bg-sky-50 p-1 rounded-2xl gap-1">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex-grow py-2 rounded-xl text-sm font-bold transition-all ${value === opt ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400 hover:text-teal-400'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);
