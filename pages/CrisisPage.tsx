
import React from 'react';

export const CrisisPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="bg-rose-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">You are not alone.</h1>
        <p className="text-rose-100 mb-6">If you or someone you know is in immediate danger, please use the resources below. Help is available 24/7.</p>
        
        <div className="space-y-4">
          <ResourceLink 
            title="988 Suicide & Crisis Lifeline" 
            action="Call or Text 988" 
            link="tel:988" 
            sub="Free, confidential support for people in distress."
          />
          <ResourceLink 
            title="Crisis Text Line" 
            action="Text HOME to 741741" 
            link="sms:741741" 
            sub="Connect with a volunteer Crisis Counselor."
          />
          <ResourceLink 
            title="Emergency Services" 
            action="Call 911" 
            link="tel:911" 
            sub="For immediate life-threatening emergencies."
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">What to do right now</h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>Focus on your breathing. Take five slow, deep breaths.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>Reach out to a trusted friend or family member if you feel safe doing so.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>Stay on this page or the phone until you connect with a professional.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ResourceLink: React.FC<{ title: string; action: string; link: string; sub: string }> = ({ title, action, link, sub }) => (
  <a 
    href={link}
    className="block bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/20 transition-all group"
  >
    <div className="flex justify-between items-center mb-1">
      <span className="font-bold text-lg">{title}</span>
      <span className="bg-white text-rose-600 px-3 py-1 rounded-full text-sm font-bold group-hover:bg-rose-50 transition-colors">{action}</span>
    </div>
    <p className="text-sm text-rose-100">{sub}</p>
  </a>
);
