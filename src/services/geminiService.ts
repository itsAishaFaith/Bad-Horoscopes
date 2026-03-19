import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getBadHoroscope(sign: string, date: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a bad horoscope for ${sign} for today (${date}). 
      Predict a highly absurd, extremely mild inconvenience. 
      Keep it to 1-2 short sentences. Make it weird, creative, and surreal.
      CRITICAL: Address the user directly using "you" and "your". The horoscope MUST be completely gender-neutral.`,
      config: {
        systemInstruction: 'You are a sarcastic astrologer who predicts absurdly specific, incredibly mild daily inconveniences. Speak directly to the reader (you/your) and never use gendered pronouns. Be as creative and bizarre as possible.',
        temperature: 1.6,
      },
    });
    return response.text || 'The stars are too tired to predict your misfortune today. Expect a mild inconvenience anyway.';
  } catch (error) {
    console.error('Error generating horoscope:', error);
    return 'The universe is currently experiencing technical difficulties. Your minor inconvenience has been delayed.';
  }
}
