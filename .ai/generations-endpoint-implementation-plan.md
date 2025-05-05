# API Endpoint Implementation Plan: POST /api/generations

## 1. Przegląd punktu końcowego
Endpoint służy do inicjowania procesu generacji propozycji fiszek AI na podstawie tekstu wejściowego użytkownika.

## 2. Szczegóły żądania
- **Metoda HTTP:** POST  
- **URL:** /api/generations  
- **Parametry:**
  - Wymagane: `source_text` (string, niepusty, max 10,000 znaków)
  - Opcjonalne: Brak  
- **Request Body Example:**
```json
{
  "source_text": "Przykładowy tekst do generacji..."
}
```

## 3. Wykorzystywane typy
- **DTOs:**
  - GenerationResponseDTO – zawiera `generation_id`, `flashcards_proposals` oraz `generated_count`
  - FlashcardProposalDTO – zawiera `id`, `front`, `back` i `source` ("ai-full")
- **Command Models:**
  - GenerationRequestCommand – zawiera `source_text`

## 4. Przepływ danych
1. Klient wysyła żądanie POST z `source_text`.
2. Middleware autoryzuje użytkownika.
3. Warstwa walidacyjna (np. z użyciem zod) sprawdza poprawność danych wejściowych:
   - Niepusty `source_text`
   - Długość w zakresie (1, max 10,000 znaków)
4. Logika biznesowa wywołuje service(np. `generation.service`) odpowiedzialny za:
   - Inicjację procesu generacji,
   - Obliczenie hasha oraz określenie długości tekstu,
   - Zapis rekordu w tabeli generations.
5. Funkcja generująca propozycje fiszek tworzy listę FlashcardProposalDTO.
6. W przypadku błędu, logi błędów zapisywane są do tabeli generation_error_logs.
7. Na końcu serwer zwraca GenerationResponseDTO.

## 5. Względy bezpieczeństwa
- Weryfikacja tokenu/autoryzacja użytkownika przed wykonaniem operacji.
- Walidacja danych wejściowych przy użyciu zod.
- Ograniczenie długości tekstu wejściowego.
- Zabezpieczenie przed atakami typu SQL Injection przez korzystanie z Supabase parametrized queries.

## 6. Obsługa błędów
- **400 Bad Request:** Gdy `source_text` jest pusty lub przekracza 10,000 znaków.
- **500 Internal Server Error:** W przypadku wystąpienia błędu w procesie generacji lub zapisie logów błędów.
- Dodatkowo: Logowanie błędów z informacjami, które mogą zostać zapisane w tabeli generation_error_logs.

## 7. Rozważania dotyczące wydajności
- Asynchroniczna obsługa długotrwałych operacji, ewentualnie z użyciem kolejek.
- Wykorzystanie cache’owania lub innych technik optymalizacji, jeśli generacja jest czasochłonna.
- Skalowalność bazy danych i poprawne indeksowanie tabel związanych z operacją generacji.

## 8. Etapy wdrożenia
1. Utworzenie walidacji wejścia (GenerationRequestCommand) przy użyciu zod.
2. Implementacja middleware autoryzacji użytkownika.
3. Wyodrębnienie logiki generacji do osobnej warstwy service (np. `src/lib/services/generation.service.ts`):
   - Inicjacja rekordu w tabeli generations.
   - Wywołanie usługi AI do generacji fiszek.
4. Utworzenie logiki logowania błędów do tabeli generation_error_logs.
5. Integracja wszystkich elementów w API endpoint (/api/generations).

