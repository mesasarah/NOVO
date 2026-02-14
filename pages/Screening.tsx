
import React, { useState } from 'react';

const QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way"
];

const OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 }
];

interface ScreeningProps {
  onComplete: () => void;
}

export const Screening: React.FC<ScreeningProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (value: number) => {
    const newScores = [...scores, value];
    setScores(newScores);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);

  const getSeverity = (score: number) => {
    if (score <= 4) return "Minimal or none";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately severe";
    return "Severe";
  };

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center animate-in zoom-in duration-300">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Assessment Complete</h2>
        <div className="mb-6 p-6 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Your PHQ-9 Score</p>
          <p className="text-4xl font-black text-indigo-600">{totalScore}</p>
          <p className="text-lg font-semibold text-slate-700 mt-2">Severity: {getSeverity(totalScore)}</p>
        </div>
        <p className="text-slate-600 mb-8 leading-relaxed text-sm">
          This result is a screening tool, not a diagnosis. 
          {totalScore >= 10 ? " Your score suggests you may benefit from speaking with a professional." : " Share this result with your doctor at your next appointment."}
        </p>
        <button 
          onClick={onComplete}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          View Recommended Therapists
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Question {currentStep + 1} of {QUESTIONS.length}</span>
            <h1 className="text-xl font-bold text-slate-800">PHQ-9 Mental Health Screen</h1>
          </div>
          <span className="text-xs text-slate-400">Over the last 2 weeks...</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px] flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          <h2 className="text-2xl font-medium text-slate-800 leading-tight mb-8">
            {QUESTIONS[currentStep]}
          </h2>
          
          <div className="space-y-3">
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group flex justify-between items-center"
              >
                <span className="font-medium text-slate-700 group-hover:text-indigo-900">{opt.label}</span>
                <span className="text-slate-300 group-hover:text-indigo-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 mt-8 text-center italic">
          MindAnchor Privacy: Responses are stored locally and only shared with your consent.
        </p>
      </div>
    </div>
  );
};
