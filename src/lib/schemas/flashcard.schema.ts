import { z } from "zod";
import type { Sources } from "../../types";

const sourceEnum = z.enum(["ai-full", "ai-edited", "manual"] as const) satisfies z.ZodType<Sources>;

export const flashcardCreateSchema = z.object({
  front: z.string().min(1).max(200),
  back: z.string().min(1).max(500),
  generation_id: z.number().int().positive(),
  source: sourceEnum,
});

export const createFlashcardsCommandSchema = z.object({
  flashcards: z.array(flashcardCreateSchema).min(1).max(100),
});

export type FlashcardCreateSchema = z.infer<typeof flashcardCreateSchema>;
export type CreateFlashcardsCommandSchema = z.infer<typeof createFlashcardsCommandSchema>;
