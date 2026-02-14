
import { StressSignal } from "../types";

export const getMockStressSignal = (): StressSignal => {
  const hr = 60 + Math.random() * 40;
  const hrv = 20 + Math.random() * 80;
  // Simulate a spike if HR is high and HRV is low
  const isSpike = hr > 95 && hrv < 30;
  
  return {
    heartRate: Math.round(hr),
    hrv: Math.round(hrv),
    timestamp: Date.now(),
    isSpike
  };
};

export const subscribeToStressSpikes = (callback: (signal: StressSignal) => void) => {
  const interval = setInterval(() => {
    const signal = getMockStressSignal();
    if (signal.isSpike) {
      callback(signal);
    }
  }, 10000); // Check every 10s
  return () => clearInterval(interval);
};
