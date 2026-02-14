
import React, { useState } from 'react';
import { Therapist } from '../types';

const MOCK_THERAPISTS: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    specialty: ['CBT', 'Anxiety', 'Depression'],
    bio: 'Specializing in cognitive behavioral therapy with 15 years of experience helping adults manage stress.',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/seed/sarah/200/200',
    location: 'Portland, OR',
    insurance: ['BlueCross', 'Aetna']
  },
  {
    id: '2',
    name: 'Marcus Thorne, LCSW',
    specialty: ['Trauma', 'PTSD', 'EMDR'],
    bio: 'Focusing on trauma-informed care and recovery through evidence-based interventions.',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/marcus/200/200',
    location: 'Seattle, WA',
    insurance: ['Kaiser', 'Cigna']
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    specialty: ['Family Therapy', 'Adolescents', 'ADHD'],
    bio: 'Supporting families and children through neurodiversity-affirming practices.',
    rating: 5.0,
    imageUrl: 'https://picsum.photos/seed/elena/200/200',
    location: 'Austin, TX',
    insurance: ['UnitedHealthcare', 'Aetna']
  },
  {
    id: '4',
    name: 'Kenji Sato, LMFT',
    specialty: ['Mindfulness', 'Relationships', 'Grief'],
    bio: 'Integrating mindfulness and system-theory to help couples and individuals find peace.',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/kenji/200/200',
    location: 'San Francisco, CA',
    insurance: ['BlueShield', 'Medicare']
  }
];

export const TherapistDirectory: React.FC = () => {
  const [filter, setFilter] = useState('');

  const filtered = MOCK_THERAPISTS.filter(t => 
    t.name.toLowerCase().includes(filter.toLowerCase()) || 
    t.specialty.some(s => s.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Verified Licensed Professionals</h1>
          <p className="text-slate-500">Only human, board-certified therapists are listed here.</p>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 hover:border-indigo-200 transition-all">
            <img src={t.imageUrl} alt={t.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 bg-slate-100" />
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-slate-800">{t.name}</h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="text-xs font-bold">{t.rating}</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {t.specialty.map(s => (
                  <span key={s} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">{s}</span>
                ))}
              </div>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">{t.bio}</p>
              <button className="w-full bg-indigo-50 text-indigo-600 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors">
                View Profile & Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400">No human therapists found matching that search.</p>
        </div>
      )}
    </div>
  );
};
