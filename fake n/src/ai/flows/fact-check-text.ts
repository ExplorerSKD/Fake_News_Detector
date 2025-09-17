'use server';

/**
 * @fileOverview Fact-checks text input using the Gemini API.
 *
 * - factCheckText - A function that takes text as input and returns a fact-checked result with a truth percentage and credible sources.
 * - FactCheckTextInput - The input type for the factCheckText function.
 * - FactCheckTextOutput - The return type for the factCheckText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FactCheckTextInputSchema = z.object({
  text: z.string().describe('The text to fact-check.'),
});
export type FactCheckTextInput = z.infer<typeof FactCheckTextInputSchema>;

const FactCheckTextOutputSchema = z.object({
  truthPercentage: z
    .number()
    .min(0)
    .max(100)
    .describe('The percentage of truthfulness in the text.'),
  correctedText: z.string().describe('The corrected version of the text, if applicable.'),
  sources: z.array(z.string()).describe('Credible sources for the fact-check.'),
});
export type FactCheckTextOutput = z.infer<typeof FactCheckTextOutputSchema>;

export async function factCheckText(input: FactCheckTextInput): Promise<FactCheckTextOutput> {
  return factCheckTextFlow(input);
}

const factCheckTextPrompt = ai.definePrompt({
  name: 'factCheckTextPrompt',
  input: {schema: FactCheckTextInputSchema},
  output: {schema: FactCheckTextOutputSchema},
  prompt: `Analyze the following text and provide a fact-checked result.  Indicate the truthfulness as a percentage, provide a corrected version if applicable, and list credible sources.

Text: {{{text}}}`,
});

const factCheckTextFlow = ai.defineFlow(
  {
    name: 'factCheckTextFlow',
    inputSchema: FactCheckTextInputSchema,
    outputSchema: FactCheckTextOutputSchema,
  },
  async input => {
    const {output} = await factCheckTextPrompt(input);
    return output!;
  }
);
