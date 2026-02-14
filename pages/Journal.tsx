
import React, { useState, useEffect } from 'react';
import { MoodType, MoodEntry } from '../types';
import { summarizeMoodForTherapist } from '../services/geminiService';

// Helper to map mood types to a numeric score
const getMoodScore = (mood: MoodType): number => {
  switch (mood) {
    case MoodType.GREAT: return 10;
    case MoodType.GOOD: return 8;
    case MoodType.NEUTRAL: return 5;
    case MoodType.LOW: return 3;
    case MoodType.DISTRESSED: return 1;
    default: return 5;
  }
};

export const Journal: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType>(MoodType.NEUTRAL);
  const [summary, setSummary] = useState<{ text: string; loading: boolean }>({ text: '', loading: false });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mindanchor_journal');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const saveEntry = () => {
    if (!note.trim()) return;
    // Added missing 'score' property to satisfy MoodEntry interface
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      mood: selectedMood,
      score: getMoodScore(selectedMood),
      note: note.trim()
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('mindanchor_journal', JSON.stringify(updated));
    setNote('');
  };

  const handleSummarize = async () => {
    setSummary({ text: '', loading: true });
    try {
      const result = await summarizeMoodForTherapist(entries);
      setSummary({ text: result, loading: false });
    } catch (err) {
      setSummary({ text: 'Error generating summary.', loading: false });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4">How are you feeling?</h2>
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {[MoodType.GREAT, MoodType.GOOD, MoodType.NEUTRAL, MoodType.LOW, MoodType.DISTRESSED].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMood(m)}
                className={`flex flex-col items-center gap-1 min-w-[64px] transition-transform ${selectedMood === m ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getMoodBg(m)}`}>
                  {getMoodEmoji(m)}
                </div>
                <span className="text-[10px] font-bold uppercase text-slate-500">{m}</span>
              </button>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? (Private thoughts for your therapist)"
            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mb-4"
          ></textarea>

          <button
            onClick={saveEntry}
            disabled={!note.trim()}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 transition-colors"
          >
            Save Entry
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Recent Entries</h3>
          {entries.length === 0 ? (
            <p className="text-slate-400 italic text-sm">No entries yet. Start your journey today.</p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
                <div className="text-2xl pt-1">{getMoodEmoji(e.mood)}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">{e.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getMoodTag(e.mood)}`}>{e.mood}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{e.note}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Therapist Summary</h2>
          <p className="text-indigo-200 text-sm mb-6">
            MindAnchor can use AI to summarize your recent patterns into a concise format for your next session. 
            This helps your human therapist understand you faster.
          </p>

          <button
            onClick={handleSummarize}
            disabled={entries.length === 0 || summary.loading}
            className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 w-full disabled:opacity-50"
          >
            {summary.loading ? (
              <>
                <div className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                Analyzing Trends...
              </>
            ) : (
              'Generate Clinical Summary'
            )}
          </button>

          {summary.text && (
            <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20 animate-in fade-in slide-in-from-top duration-300">
              <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                AI Summary for Human Care
              </h3>
              <div className="prose prose-invert prose-sm">
                <p className="whitespace-pre-wrap text-indigo-50 leading-relaxed italic">"{summary.text}"</p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                 <span className="text-[10px] text-indigo-400">Generated for professional use only</span>
                 <button 
                  onClick={() => navigator.clipboard.writeText(summary.text)}
                  className="text-xs font-bold hover:text-white transition-colors"
                 >
                   Copy for Session
                 </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="font-bold text-emerald-900 mb-2">Privacy & Ethics</h3>
          <p className="text-sm text-emerald-700 leading-relaxed">
            Your data is never used to train the AI. 
            Summaries are ephemeral and processed with strict context isolation. 
            MindAnchor prioritizes your clinical privacy and the sanctity of the human therapeutic bond.
          </p>
        </div>
      </div>
    </div>
  );
};

const getMoodEmoji = (mood: MoodType) => {
  switch (mood) {
    case MoodType.GREAT: return '🤩';
    case MoodType.GOOD: return '🙂';
    case MoodType.NEUTRAL: return '😐';
    case MoodType.LOW: return '😔';
    case MoodType.DISTRESSED: return '🚨';
  }
};

const getMoodBg = (mood: MoodType) => {
  switch (mood) {
    case MoodType.GREAT: return 'bg-yellow-100';
    case MoodType.GOOD: return 'bg-emerald-100';
    case MoodType.NEUTRAL: return 'bg-slate-100';
    case MoodType.LOW: return 'bg-indigo-100';
    case MoodType.DISTRESSED: return 'bg-rose-100';
  }
};

const getMoodTag = (mood: MoodType) => {
  switch (mood) {
    case MoodType.GREAT: return 'bg-yellow-100 text-yellow-700';
    case MoodType.GOOD: return 'bg-emerald-100 text-emerald-700';
    case MoodType.NEUTRAL: return 'bg-slate-100 text-slate-700';
    case MoodType.LOW: return 'bg-indigo-100 text-indigo-700';
    case MoodType.DISTRESSED: return 'bg-rose-100 text-rose-700';
  }
};
