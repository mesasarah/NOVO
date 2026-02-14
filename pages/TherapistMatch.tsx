
import React, { useState } from 'react';
import { Therapist } from '../types';

const MOCK_DB: Therapist[] = [
  { id: '1', name: 'Dr. Julia Chen', specialty: ['Anxiety', 'Grief'], bio: 'Focus on mindfulness-based cognitive therapy and ocean-inspired wellness.', rating: 5.0, imageUrl: 'https://picsum.photos/seed/julia/100', location: 'San Francisco, CA', insurance: ['Blue Shield', 'Aetna'] },
  { id: '2', name: 'Robert Vance, LCSW', specialty: ['Trauma', 'PTSD'], bio: 'Veteran support and trauma-informed recovery through deep-listening.', rating: 4.8, imageUrl: 'https://picsum.photos/seed/rob/100', location: 'Remote / Austin, TX', insurance: ['Medicare', 'Cigna'] },
  { id: '3', name: 'Sarah Miller', specialty: ['Relationships', 'LGBQT+'], bio: 'Supporting identity and relational health in a safe harbor.', rating: 4.9, imageUrl: 'https://picsum.photos/seed/sarah/100', location: 'New York, NY', insurance: ['Private Pay'] },
];

export const TherapistMatch: React.FC = () => {
  const [matched, setMatched] = useState<Therapist[]>(MOCK_DB);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in slide-in-from-right duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Deep Care Referral</h1>
        <p className="text-slate-500">Nova analyzed your tides. These human professionals offer the deepest support.</p>
      </header>

      <div className="bg-teal-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-800 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
        <div className="flex gap-4 items-center z-10">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
          </div>
          <div>
            <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Care Alignment</p>
            <p className="text-2xl font-black">94% Confidence</p>
          </div>
        </div>
        <button className="bg-white text-teal-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-sky-50 transition-colors z-10">
          Refine Matching
        </button>
      </div>

      <div className="space-y-4">
        {matched.map(t => (
          <div key={t.id} className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm flex flex-col sm:flex-row gap-6 hover:border-teal-300 transition-all group">
            <img src={t.imageUrl} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-sky-50 group-hover:ring-teal-100" />
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-slate-800">{t.name}</h3>
                <span className="text-teal-600 font-bold text-xs uppercase bg-teal-50 px-2 py-1 rounded-md tracking-widest">Recommended</span>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">{t.specialty.join(' • ')}</p>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{t.bio}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-tighter">
                <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{t.location}</span>
                <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>{t.insurance[0]}...</span>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col justify-center gap-2">
              <button className="flex-grow bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md hover:bg-teal-700 transition-colors">Book</button>
              <button className="flex-grow bg-sky-50 text-teal-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-sky-100 transition-colors">Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
