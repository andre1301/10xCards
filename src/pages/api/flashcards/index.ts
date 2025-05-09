import type { APIRoute } from "astro";
import { FlashcardService } from "../../../lib/services/flashcard.service";
import { createFlashcardsCommandSchema } from "../../../lib/schemas/flashcard.schema";
import { DEFAULT_USER_ID } from "../../../db/supabase.client";
import { rateLimiter } from "../../../lib/services/rate-limiter.service";
import { ApiError, ValidationError } from "../../../lib/errors/api-error";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    rateLimiter.checkLimit(DEFAULT_USER_ID);

    const body = await request.json();
    const validatedData = createFlashcardsCommandSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError("Invalid request data", validatedData.error);
    }

    const flashcardService = new FlashcardService(locals.supabase);
    const createdFlashcards = await flashcardService.createMany(DEFAULT_USER_ID, validatedData.data.flashcards);

    return new Response(JSON.stringify(createdFlashcards), { status: 201 });
  } catch (error) {
    console.error("Error creating flashcards:", error);

    if (error instanceof ApiError) {
      return new Response(JSON.stringify({ error: error.message, details: error.details }), {
        status: error.statusCode,
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
};
