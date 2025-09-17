"use server";

import { z } from "zod";
import { factCheckText } from "@/ai/flows/fact-check-text";
import { factCheckArticleFromURL } from "@/ai/flows/fact-check-article-from-url";
import { factCheckImageUpload } from "@/ai/flows/fact-check-image-upload";
import type { DisplayableResult } from "@/lib/types";

const textSchema = z.object({
  text: z.string().min(10, { message: "Please enter more text to check." }),
});

const urlSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export async function checkText(formData: FormData): Promise<{ data: DisplayableResult | null, error: string | null }> {
  const validatedFields = textSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return { data: null, error: validatedFields.error.errors.map((e) => e.message).join(', ') };
  }

  try {
    const result = await factCheckText({ text: validatedFields.data.text });
    return { data: { ...result, correctedContent: result.correctedText, type: 'text' }, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "An error occurred while checking the text. Please try again." };
  }
}

export async function checkUrl(formData: FormData): Promise<{ data: DisplayableResult | null, error: string | null }> {
  const validatedFields = urlSchema.safeParse({
    url: formData.get('url'),
  });

  if (!validatedFields.success) {
    return { data: null, error: validatedFields.error.errors.map((e) => e.message).join(', ') };
  }

  try {
    const result = await factCheckArticleFromURL({ url: validatedFields.data.url });
    return { data: { ...result, correctedContent: result.corrections, type: 'url' }, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "An error occurred while checking the URL. It might be invalid or inaccessible." };
  }
}

export async function checkImage(imageDataUri: string): Promise<{ data: DisplayableResult | null, error: string | null }> {
  if (!imageDataUri) {
    return { data: null, error: "No image data provided." };
  }

  try {
    const result = await factCheckImageUpload({ imageDataUri });
    return { data: { ...result, type: 'image' }, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "An error occurred while analyzing the image. The image might not contain readable text." };
  }
}
