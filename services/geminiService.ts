import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a background image tailored for a marketing flyer.
 * It instructs the model to keep the subject on the right side to leave room for text.
 */
export const generateMarketingBackground = async (niche: string): Promise<string> => {
  try {
    const prompt = `Professional, high-quality marketing background image for the niche: "${niche}". 
    The composition MUST have negative space or a dark gradient on the LEFT side for text overlay. 
    The main subject or visual interest should be on the RIGHT side. 
    Cinematic lighting, 4k resolution, photorealistic advertising style. 
    No text in the image itself.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          numberOfImages: 1, 
        }
      }
    });

    // Extract the image from the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${base64Data}`;
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};