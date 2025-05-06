import type { APIRoute } from "astro";
import { z } from "zod";
import { GenerationsService } from "../../lib/services/generations.service";

export const prerender = false;

const generationInputSchema = z.object({
  sourceText: z.string().min(1).max(10000),
  model: z.enum(["gpt-3.5-turbo", "gpt-4"]),
});

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Input validation
    const body = await request.json();
    const validatedInput = generationInputSchema.safeParse(body);

    if (!validatedInput.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid input",
          details: validatedInput.error.issues,
        }),
        { status: 400 }
      );
    }

    const generationsService = new GenerationsService(locals.supabase);
    const result = await generationsService.startGeneration(validatedInput.data);

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Generation error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
};
