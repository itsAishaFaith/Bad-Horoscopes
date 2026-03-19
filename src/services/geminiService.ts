import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getBadHoroscope(sign: string, date: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Consult the cold, indifferent movements of the heavens for ${sign} on ${date}.

Structure your decree as follows:
 The Celestial Cause & Decree: Begin with a dramatic planetary alignment or astronomical 'error' then predict a surreal, physically improbable, yet harmless inconvenience involving textures, sounds, or social glitches.
 The Unlucky Number: On a new line, write exactly "Avoid this number: [random number between 0-99]".

Constraints:
Keep the main horoscope to exactly 2 sentences, followed by the number.
Ensure the inconvenience is absurdly specific and creatively bizarre, but concise. Do not be overly wordy.`,
      config: {
        systemInstruction: 'You are the Grand Architect of Cosmic Nuisance, a dramatic and slightly pretentious astrologer who interprets the stars as a series of astronomical oversights. Your tone is mock-important but concise. You must always address the user as "you" and maintain strict gender-neutrality. Your goal is to weave together celestial movements with hyper-specific, surreal, and incredibly mild inconveniences.',
        temperature: 1.4,
      },
    });
    return response.text || 'The stars are too tired to predict your misfortune today. Expect a mild inconvenience anyway.';
  } catch (error) {
    console.error('Error generating horoscope:', error);
    return 'The universe is currently experiencing technical difficulties. Your minor inconvenience has been delayed.';
  }
}
