
import { GoogleGenAI } from "@google/genai";
import { MoodEntry } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry<T>(fn: () => Promise<T>, maxRetries: number = 2): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error.message?.includes("429") || error.status === 429 || error.message?.toLowerCase().includes("quota");
      if (isRateLimit && i < maxRetries - 1) {
        await delay(Math.pow(2, i) * 1000);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export const summarizeMoodForTherapist = async (entries: MoodEntry[]): Promise<string> => {
  if (entries.length === 0) return "No entries to summarize.";

  const prompt = `
    I am a patient preparing for a session with a human therapist. 
    Below are my journal entries for the past period. 
    Please summarize the main emotional themes, recurring patterns, and significant events to help me explain my state to my licensed human therapist.
    
    CRITICAL INSTRUCTION: Do not provide medical advice or therapeutic intervention. 
    Format as a structured summary that I can read to my doctor.

    Entries:
    ${entries.map(e => `[${e.date}] Mood: ${e.mood}. Note: ${e.note}`).join('\n')}
  `;

  try {
    const response = await fetchWithRetry(async () => {
      return await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional administrative assistant helping a patient prepare data for their human, licensed therapist. You do not provide clinical advice or therapy. You remain objective and concise."
        }
      });
    });

    return response.text || "Could not generate summary.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("429")) {
      return "The system is currently overwhelmed with requests. Please try summarizing again in a few minutes.";
    }
    throw new Error("Failed to generate clinical summary.");
  }
};
