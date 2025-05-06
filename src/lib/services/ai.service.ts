interface FlashCard {
  front: string;
  back: string;
}

export class AiService {
  async generateFlashcards(text: string, model: string): Promise<FlashCard[]> {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

    return [
      {
        front: "What is the capital of France?",
        back: "Paris is the capital of France",
      },
      {
        front: "Who wrote Romeo and Juliet?",
        back: "William Shakespeare wrote Romeo and Juliet",
      },
    ];
  }
}
