
export enum MoodType {
  GREAT = 'great',
  GOOD = 'good',
  NEUTRAL = 'neutral',
  LOW = 'low',
  DISTRESSED = 'distressed'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface MoodEntry {
  id: string;
  date: string;
  score: number; // 1-10
  mood: MoodType;
  note: string;
}

export interface StressSignal {
  heartRate: number;
  hrv: number;
  timestamp: number;
  isSpike: boolean;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string[];
  bio: string;
  rating: number;
  imageUrl: string;
  location: string;
  insurance: string[];
}

export interface UserSettings {
  tone: 'Soft' | 'Direct' | 'Minimal';
  avatarTheme: 'Ocean' | 'Forest' | 'Twilight';
  checkInFrequency: 'High' | 'Medium' | 'Low';
}
