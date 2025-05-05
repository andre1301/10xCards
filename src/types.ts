import type { Database } from "./db/database.types";

// Flashcard DTO - represents a flashcard as stored in the DB
export type FlashcardDTO = Database["public"]["Tables"]["flashcards"]["Row"];

export type Sources = "ai-full" | "ai-edited" | "manual";
// Command Model for creating flashcards in bulk
export interface FlashcardCreateDTO {
  front: string; // non-empty, max 200 characters
  back: string; // non-empty, max 500 characters
  generation_id: number;
  source: Sources;
}
export interface CreateFlashcardsCommand {
  flashcards: FlashcardCreateDTO[];
}

// Command Model for updating a flashcard (front and back editing)
export type UpdateFlashcardCommand = Pick<Database["public"]["Tables"]["flashcards"]["Update"], "front" | "back">;

// Command Model for initiating AI generation for flashcard proposals
export interface GenerationRequestCommand {
  source_text: string; // non-empty, max 10,000 characters
}

// DTO representing a flashcard proposal returned from the generation process
export interface FlashcardProposalDTO {
  id: number;
  front: string; // non-empty, max 200 characters
  back: string; // non-empty, max 500 characters
  source: "ai-full";
}

// DTO for the response of the AI generation endpoint
export interface GenerationResponseDTO {
  generation_id: number;
  flashcardsProposals: FlashcardProposalDTO[];
  generated_count: number;
}

// DTO for a generation record
export type GenerationDTO = Database["public"]["Tables"]["generations"]["Row"];

// DTO for a generation error log
export type GenerationErrorLogDTO = Database["public"]["Tables"]["generation_error_logs"]["Row"];

export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
}

export interface FlashcardListResponse {
  flashcards: FlashcardDTO[];
  pagination: PaginationDto;
}
