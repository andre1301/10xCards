import type { SupabaseClient } from "../../db/supabase.client";
import type { FlashcardDTO, FlashcardCreateDTO } from "../../types";

export class FlashcardService {
  constructor(private readonly supabase: SupabaseClient) {}

  async createMany(userId: string, flashcards: FlashcardCreateDTO[]): Promise<FlashcardDTO[]> {
    const { data, error } = await this.supabase
      .from("flashcards")
      .insert(
        flashcards.map((card) => ({
          ...card,
          user_id: userId,
        }))
      )
      .select();

    if (error) {
      throw new Error(`Failed to create flashcards: ${error.message}`);
    }

    return data;
  }
}
