# API Endpoint Implementation Plan: POST /api/flashcards/

## 1. Przegląd punktu końcowego
Endpoint umożliwia tworzenie jednego lub wielu rekordów flashcard w jednym żądaniu. Obsługuje zarówno fiszki generowane przez AI, jak i te edytowane przez użytkownika.

## 2. Szczegóły żądania
- **Metoda HTTP:** POST
- **Struktura URL:** /api/flashcards/
- **Parametry:**
  - **Wymagane:** Obiekt JSON zawierający tablicę "flashcards". Każdy element musi posiadać:
    - front: string (non-empty, max 200 characters)
    - back: string (non-empty, max 500 characters)
    - generation_id: string (identyfikator rekord generacji; wymagany)
    - source: string (jedna z: 'ai-full', 'ai-edited', 'manual')
  - **Opcjonalne:** Brak

## 3. Wykorzystywane typy
- FlashcardCreateDTO oraz CreateFlashcardsCommand z pliku `src/types.ts` definiują strukturę wejściową.
- DTO wyjściowe: FlashcardDTO, zwracane po pomyślnym utworzeniu fiszek.

## 4. Szczegóły odpowiedzi
- **201 Created:** Zwraca tablicę nowo utworzonych fiszek.
- **400 Bad Request:** Walidacja danych wejściowych (brak wymaganych pól, błędne długości tekstu).
- **500 Internal Server Error:** Błąd po stronie serwera, niespodziewane wyjątki.

## 5. Przepływ danych
1. Odbiór żądania w API endpoint (/api/flashcards/).
2. Uwierzytelnienie użytkownika (np. przez Supabase Auth).
3. Walidacja danych wejściowych z użyciem Zod lub podobnego narzędzia.
4. Wywołanie serwisu (np. `flashcardService`) do:
   - Walidacji logiki biznesowej.
   - Wstawienia danych do tabeli "flashcards".
5. Automatyczna aktualizacja kolumny `updated_at` dzięki triggerowi w DB.
6. Zwrócenie nowo utworzonych rekordów jako odpowiedź.

## 6. Względy bezpieczeństwa
- Uwierzytelnienie i autoryzacja: Sprawdzenie, czy użytkownik jest zalogowany i czy `user_id` pasuje do kontekstu.
- Walidacja danych wejściowych: Zapewnienie, że długości pól "front" i "back" są poprawne oraz że "source" należy do dozwolonego zestawu.
- Ochrona przed SQL Injection: Użycie parametrów w zapytaniach, korzystanie z Supabase SDK.

## 7. Obsługa błędów
- **400 Bad Request:** Gdy dane wejściowe nie spełniają warunków walidacji.
- **500 Internal Server Error:** Niespodziewane błędy podczas przetwarzania, logowanie błędów (opcjonalnie zapis do tabeli generation_error_logs w razie wystąpienia błędów związanych z generacją).
- Wstępne sprawdzanie warunków (guard clauses) i wczesne zwracanie błędów aby zapobiec zagnieżdżeniu logiki.

## 8. Rozważenia dotyczące wydajności
- Obsługa wielu fiszek w jednym żądaniu, aby ograniczyć liczbę wywołań do bazy danych.
- Wykorzystanie operacji batch insert, aby zoptymalizować zapis danych.
- Minimalizacja logiki w kontrolerze – przeniesienie logiki biznesowej do serwisu.
- Pamiętanie o możliwościach Supabase dla optymalizacji zapytań.

## 9. Etapy wdrożenia
1. Utworzenie endpointu API w katalogu `/src/pages/api/flashcards/` obsługującego metodę POST.
2. Implementacja walidacji danych wejściowych (np. przy użyciu Zod).
3. Utworzenie lub rozszerzenie serwisu flashcard (np. w `/src/lib/services/flashcardService.ts`) do obsługi logiki wstawiania rekordów do bazy.
4. Integracja uwierzytelniania z Supabase (uzyskanie `user_id` z kontekstu autoryzacyjnego).
5. Wykonanie logiki wstawiania rekordów z wykorzystaniem batch insert.
6. Obsługa sukcesu (201 Created) oraz błędów (400, 500) zgodnie z planem.
7. Testowanie endpointu, w tym przypadków brzegowych oraz walidacyjnych.
8. Przegląd kodu i wdrożenie dodatkowych logów przy niespodziewanych błędach.

