import { DEFAULT_USER_ID, type SupabaseClient } from "../../db/supabase.client";
import { createHash } from "crypto";
import { AiService } from "./ai.service";
import { type GenerationResponseDTO } from "../../types";

export class GenerationsService {
  constructor(
    private supabase: SupabaseClient,
    private aiService = new AiService()
  ) {}

  async startGeneration(input: { sourceText: string; model: string }): Promise<GenerationResponseDTO> {
    const startTime = Date.now();
    const sourceTextHash = this.hashSourceText(input.sourceText);

    // Create generation record
    const generationData = {
      source_text_hash: sourceTextHash,
      source_text_length: input.sourceText.length,
      model: input.model,
      user_id: DEFAULT_USER_ID,
      generated_count: 0,
      generation_duration: 0,
    };

    const { data: generation, error: generationError } = await this.supabase
      .from("generations")
      .insert(generationData)
      .select()
      .single();

    if (generationError) {
      throw new Error(`Failed to create generation: ${generationError.message}`);
    }

    // Generate flashcards
    const flashcards = await this.aiService.generateFlashcards(input.sourceText, input.model);

    // Store flashcards
    // const { data: storedFlashcards, error: flashcardsError } = await this.supabase
    //   .from("flashcards")
    //   .insert(
    //     flashcards.map((card) => ({
    //       front: card.front,
    //       back: card.back,
    //       source: "ai-full",
    //       user_id: DEFAULT_USER_ID,
    //       generation_id: generation.id,
    //     }))
    //   )
    //   .select();

    // if (flashcardsError) {
    //   throw new Error(`Failed to store flashcards: ${flashcardsError.message}`);
    // }

    // Update generation with final stats
    const generationDuration = Date.now() - startTime;
    await this.supabase
      .from("generations")
      .update({
        generated_count: flashcards.length,
        generation_duration: generationDuration,
      })
      .eq("id", generation.id);

    // Return in the required format
    return {
      generation_id: generation.id,
      flashcards_proposals: flashcards.map((card) => ({
        front: card.front,
        back: card.back,
        source: "ai-full" as const,
      })),
      generated_count: flashcards.length,
    };
  }

  private hashSourceText(sourceText: string): string {
    return createHash("sha256").update(sourceText).digest("hex");
  }
}
