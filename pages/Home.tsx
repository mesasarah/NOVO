
import React from 'react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Alex.</h1>
        <p className="text-slate-500 max-w-2xl">
          Your path to wellness is human-led. Use MindAnchor to track your progress and prepare for sessions with your licensed professional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          title="Daily Check-in" 
          description="Log your mood and notes to see patterns over time."
          buttonLabel="Open Journal"
          onClick={() => onNavigate('journal')}
          color="indigo"
        />
        <Card 
          title="Clinical Screening" 
          description="Take a validated PHQ-9 or GAD-7 assessment."
          buttonLabel="Start Assessment"
          onClick={() => onNavigate('screening')}
          color="emerald"
        />
        <Card 
          title="Licensed Therapists" 
          description="Browse our directory of verified local professionals."
          buttonLabel="Browse Directory"
          onClick={() => onNavigate('directory')}
          color="amber"
        />
      </div>

      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-900 mb-2">Safety Disclaimer</h2>
        <p className="text-sm text-indigo-700">
          MindAnchor uses AI strictly for administrative assistance and summarization. 
          We do not provide medical diagnosis, therapy, or emergency intervention. 
          Always consult with a licensed professional for medical needs.
        </p>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; description: string; buttonLabel: string; onClick: () => void; color: string }> = ({ 
  title, description, buttonLabel, onClick, color 
}) => {
  const colorClasses = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    amber: 'bg-amber-600 hover:bg-amber-700',
  }[color as 'indigo' | 'emerald' | 'amber'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between h-full hover:border-indigo-200 transition-all">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">{description}</p>
      </div>
      <button 
        onClick={onClick}
        className={`${colorClasses} text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};
