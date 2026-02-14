
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage, MoodEntry, UserSettings } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTIONS = (settings: UserSettings) => `
You are Nova, a calm, present, and emotionally intelligent companion. 
Your tone is ${settings.tone}.
CORE RULES:
1. Avoid clichés (e.g., "I hear you", "Stay strong").
2. Use reflective listening. Validate the emotion deeply before suggesting any grounding.
3. Be direct and concise. No fluff.
4. If the user expresses intense distress, gently suggest a grounding exercise or check if they want to talk to their human therapist.
5. If self-harm is detected, immediately trigger the safety protocol by starting with "I'm concerned about your safety right now."
6. Proactive: You initiate with a check-in that feels natural.
`;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry<T>(fn: () => Promise<T>, maxRetries: number = 3): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error.message?.includes("429") || error.status === 429 || error.message?.toLowerCase().includes("quota");
      if (isRateLimit && i < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s...
        const waitTime = Math.pow(2, i) * 1000;
        console.warn(`Rate limit hit. Retrying in ${waitTime}ms... (Attempt ${i + 1}/${maxRetries})`);
        await delay(waitTime);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export const getBuddyResponse = async (
  message: string, 
  history: ChatMessage[], 
  settings: UserSettings
): Promise<string> => {
  // Using gemini-3-flash-preview for better quota management and speed
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS(settings),
    }
  });

  try {
    const response = await fetchWithRetry(async () => {
      const result: GenerateContentResponse = await chat.sendMessage({ message });
      return result;
    });
    return response.text || "I'm here, but I'm having trouble finding the words. Can we try again?";
  } catch (error: any) {
    console.error("Nova Error:", error);
    
    const errorMessage = error.message || "";
    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return "The tide is currently too high for our connection (Rate limit exceeded). Please take a few deep breaths and try again in a moment.";
    }
    
    if (errorMessage.includes("safety")) {
      return "I'm concerned about what you're saying. Please reach out to a professional or use the crisis resources in the header.";
    }
    
    throw error;
  }
};

export const generateMatchingSummary = async (entries: MoodEntry[]): Promise<string> => {
  const prompt = `Analyze these mood entries and provide a 2-sentence summary of the user's current emotional state and primary needs for a therapist referral:
  ${JSON.stringify(entries)}`;

  try {
    const response = await fetchWithRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
    });
    return response.text || "";
  } catch (error) {
    console.error("Matching Summary Error:", error);
    return "";
  }
};
