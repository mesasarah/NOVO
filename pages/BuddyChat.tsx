
import React, { useState, useEffect, useRef } from 'react';
import { getBuddyResponse } from '../services/buddyService';
import { subscribeToStressSpikes } from '../services/stressService';
import { ChatMessage, UserSettings } from '../types';

interface BuddyChatProps {
  settings: UserSettings;
  onNavigate: (page: string) => void;
}

export const BuddyChat: React.FC<BuddyChatProps> = ({ settings, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          role: 'model',
          text: "I'm here. Below the surface, it's quiet. How are you navigating your day?",
          timestamp: Date.now()
        }]);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    return subscribeToStressSpikes((signal) => {
      setMessages(prev => [...prev, {
        role: 'model',
        text: "I noticed a slight ripple in your signals. Take a breath with me—how are you feeling right now?",
        timestamp: Date.now()
      }]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const buddyText = await getBuddyResponse(input.trim(), messages, settings);
      setMessages(prev => [...prev, { role: 'model', text: buddyText, timestamp: Date.now() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "The signal is a bit murky. Let's refocus.", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col p-6 max-w-2xl mx-auto">
      <div className="flex-grow overflow-y-auto space-y-8 pb-10 scrollbar-hide">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[85%] p-5 rounded-3xl ${
              m.role === 'user' 
                ? 'bg-teal-500 text-slate-900 font-medium rounded-tr-none shadow-xl' 
                : 'glass text-teal-50 border border-teal-500/10 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="glass p-5 rounded-3xl rounded-tl-none flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="pt-6">
        <div className="relative flex items-center group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share your thoughts..."
            className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-6 pr-20 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none text-white shadow-2xl transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-3 p-3.5 bg-teal-500 text-slate-900 rounded-2xl hover:bg-teal-400 disabled:bg-white/10 disabled:text-white/20 transition-all shadow-lg active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        <div className="flex justify-center gap-8 mt-6">
          <QuickAction label="Panic Recovery" onClick={() => setInput("I'm feeling panicked.")} icon="🚨" />
          <QuickAction label="Calm Breath" onClick={() => setInput("Guide me through breathing.")} icon="🌬️" />
          <QuickAction label="Reflect Day" onClick={() => setInput("Summarize my trends.")} icon="📊" />
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ label: string; onClick: () => void; icon: string }> = ({ label, onClick, icon }) => (
  <button onClick={onClick} className="flex items-center gap-2 text-[9px] font-black text-teal-500/40 uppercase tracking-[0.2em] hover:text-teal-400 transition-colors">
    <span className="text-xs">{icon}</span>
    {label}
  </button>
);
