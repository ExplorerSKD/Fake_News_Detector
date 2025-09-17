'use server';
/**
 * @fileOverview Fact checks an article from a given URL using the Gemini API.
 *
 * - factCheckArticleFromURL - A function that accepts a URL, fetches the article content, and returns a fact-checked result with a truth percentage and credible sources.
 * - FactCheckArticleFromURLInput - The input type for the factCheckArticleFromURL function.
 * - FactCheckArticleFromURLOutput - The return type for the factCheckArticleFromURL function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FactCheckArticleFromURLInputSchema = z.object({
  url: z.string().describe('The URL of the article to fact-check.'),
});
export type FactCheckArticleFromURLInput = z.infer<
  typeof FactCheckArticleFromURLInputSchema
>;

const FactCheckArticleFromURLOutputSchema = z.object({
  truthPercentage: z
    .number()
    .min(0)
    .max(100)
    .describe('The estimated truth percentage of the article.'),
  corrections: z.string().describe('The corrected version of the content.'),
  sources: z.array(z.string()).describe('Credible sources for the fact-check.'),
});
export type FactCheckArticleFromURLOutput = z.infer<
  typeof FactCheckArticleFromURLOutputSchema
>;

export async function factCheckArticleFromURL(
  input: FactCheckArticleFromURLInput
): Promise<FactCheckArticleFromURLOutput> {
  return factCheckArticleFromURLFlow(input);
}

const getArticleContent = ai.defineTool({
  name: 'getArticleContent',
  description: 'Retrieves the content of an article from a given URL.',
  inputSchema: z.object({
    url: z.string().describe('The URL of the article.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  try {
    const response = await fetch(input.url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching article content:', error);
    return `Error fetching article content from ${input.url}: ${error}`;
  }
});

const factCheckPrompt = ai.definePrompt({
  name: 'factCheckArticlePrompt',
  tools: [getArticleContent],
  input: {schema: FactCheckArticleFromURLInputSchema},
  output: {schema: FactCheckArticleFromURLOutputSchema},
  prompt: `You are an expert fact-checker. Given an article, you will determine the truth percentage, provide corrections if necessary, and list credible sources.

  First, use the getArticleContent tool to retrieve the content of the article from the given URL.
  Article URL: {{{url}}}

  Then, analyze the article content and provide the following:

  - truthPercentage: The estimated truth percentage of the article (0-100).
  - corrections: The corrected version of the content. If the article is already accurate, this should be the same as the original content. If the article contains statements that are true but incomplete, add the missing information here.
  - sources: A list of credible sources that support the fact-check and corrections.

  Return the information in JSON format.
`,
});

const factCheckArticleFromURLFlow = ai.defineFlow(
  {
    name: 'factCheckArticleFromURLFlow',
    inputSchema: FactCheckArticleFromURLInputSchema,
    outputSchema: FactCheckArticleFromURLOutputSchema,
  },
  async input => {
    const {output} = await factCheckPrompt(input);
    return output!;
  }
);
