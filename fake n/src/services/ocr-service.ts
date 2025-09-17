/**
 * @fileOverview A service for extracting text from images using Optical Character Recognition (OCR).
 *
 * - extractTextFromImage - Extracts text from a base64-encoded image data URI.
 */
import { ai } from '@/ai/genkit';

/**
 * Extracts text from an image using the Gemini model.
 * @param imageDataUri - A base64-encoded image data URI.
 * @returns A promise that resolves to the extracted text.
 */
export async function extractTextFromImage(imageDataUri: string): Promise<string> {
  if (!imageDataUri) {
    throw new Error('Image data URI is required.');
  }

  const response = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    prompt: [
      { text: 'Extract all text from this image.' },
      { media: { url: imageDataUri } },
    ],
  });

  return response.text;
}
