import type { FactCheckArticleFromURLOutput } from '@/ai/flows/fact-check-article-from-url';
import type { FactCheckImageUploadOutput } from '@/ai/flows/fact-check-image-upload';
import type { FactCheckTextOutput } from '@/ai/flows/fact-check-text';

export type FactCheckResult =
  | (FactCheckTextOutput & { type: 'text' })
  | (FactCheckArticleFromURLOutput & { type: 'url' })
  | (FactCheckImageUploadOutput & { type: 'image' });

export type DisplayableResult = {
    truthPercentage: number;
    correctedContent: string;
    sources: string[];
    type: 'text' | 'url' | 'image';
};
