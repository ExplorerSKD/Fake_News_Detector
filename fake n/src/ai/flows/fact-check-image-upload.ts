'use server';
/**
 * @fileOverview Image fact-checking flow.
 *
 * - factCheckImageUpload - A function that accepts an image, extracts text using OCR, fact-checks the text with Gemini API, and returns a fact-checked result with a truth percentage and sources.
 * - FactCheckImageUploadInput - The input type for the factCheckImageUpload function.
 * - FactCheckImageUploadOutput - The return type for the factCheckImageUpload function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {extractTextFromImage} from '@/services/ocr-service';

const FactCheckImageUploadInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image data URI to extract text from and fact-check.  It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type FactCheckImageUploadInput = z.infer<typeof FactCheckImageUploadInputSchema>;

const FactCheckImageUploadOutputSchema = z.object({
  truthPercentage: z
    .number()
    .describe('The percentage of truthfulness of the image content.'),
  correctedContent: z
    .string()
    .describe('The fact-checked and corrected version of the image content.'),
  sources: z.array(
    z.string().describe('Credible sources/references for the fact-check.')
  ),
});
export type FactCheckImageUploadOutput = z.infer<typeof FactCheckImageUploadOutputSchema>;

export async function factCheckImageUpload(
  input: FactCheckImageUploadInput
): Promise<FactCheckImageUploadOutput> {
  return factCheckImageUploadFlow(input);
}

const factCheckPrompt = ai.definePrompt({
  name: 'factCheckImagePrompt',
  input: {schema: z.object({
    imageDataUri: FactCheckImageUploadInputSchema.shape.imageDataUri,
    extractedText: z.string().describe('The text extracted from the image.'),
  })},
  output: {schema: FactCheckImageUploadOutputSchema},
  prompt: `Fact-check the text extracted from the image.  Provide a truth percentage, a corrected version of the content if it's false, and a list of credible sources.\n\nText: {{{extractedText}}}`,
});

const factCheckImageUploadFlow = ai.defineFlow(
  {
    name: 'factCheckImageUploadFlow',
    inputSchema: FactCheckImageUploadInputSchema,
    outputSchema: FactCheckImageUploadOutputSchema,
  },
  async input => {
    const extractedText = await extractTextFromImage(input.imageDataUri);

    if (!extractedText) {
        return {
            truthPercentage: 0,
            correctedContent: "Could not extract any text from the image. Please try another image.",
            sources: [],
        }
    }

    const {output} = await factCheckPrompt({
      ...input,
      extractedText,
    });
    return output!;
  }
);
