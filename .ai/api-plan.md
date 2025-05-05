# REST API Plan

## 1. Resources
- **Users**  
  (Table: `users`) – Managed by Supabase Auth; holds id, email, encrypted_password, timestamps, etc.

- **Flashcards**  
  (Table: `flashcards`) – Represents study cards with fields such as id, front, back, source, user_id, generation_id, created_at, and updated_at.  
  *Relations:* Each flashcard belongs to a user; 

- **Generations**  
  (Table: `generations`) – Stores AI generation requests with fields: model, generated_count, source_text_hash, source_text_length (1000–10000), generation_duration,

- **Generation Error Logs**  
  (Table: `generation_error_logs`) – Captures error events with details such as error_code and error_message for a given generation process.

## 2. Endpoints

### Flashcards Endpoints
Endpoints for managing flashcards as per user stories US-007, US-008, US-009, US-010.

- **GET /api/flashcards**  
  *Description:* List user flashcards with pagination, filtering, and sorting.  
  *Query Parameters:*  
    - `page` (number), `limit` (number), `sort` (e.g., created_at desc), `order` (`asc` or `desc`)
  *Response:* 200 OK with JSON array of flashcards.

  ### Bulk Flashcards Endpoint
  - **POST /api/flashcards/**  
    *Description:* Create one or more flashcards in a single operation. This endpoint supports both full AI-generated flashcards and user-edited flashcards.  
    *Request Body:*  
    ```json
    {
        "flashcards": [
            {
                "front": "string (non-empty, max 200 characters)",
                "back": "string (non-empty, max 500 characters)",
                "generation_id": "string (required, associated generation record identifier)",
                "source": "string (required, must be one of: 'ai-full', 'ai-edited', 'manual')"
            }
        ]
    }
    ```  
    *Response:*  
    - **201 Created:** Returns an array of the newly created flashcards.  
    - **400 Bad Request:** Validation errors (e.g., missing fields, invalid text lengths).  
    - **500 Internal Server Error:** On unexpected failures.

- **GET /api/flashcards/{id}**  
  *Description:* Retrieve a flashcard by its id.  
  *Response:* 200 OK with flashcard info; 404 if not found.

- **PUT /api/flashcards/{id}**  
  *Description:* Update an existing flashcard (front/back editing).  
  *Request Body:* (Similar payload as POST)  
  *Response:* 200 OK on success; 400/404 on error.

- **DELETE /api/flashcards/{id}**  
  *Description:* Delete a specific flashcard.  
  *Response:* 200 OK on success; 404 if not found.

### Generations Endpoints
Endpoints to log and retrieve AI generation requests and their outcomes.

- **POST /api/generations**  
  *Description:* Initiate the AI generation prosess for flashcards proposals based on user-provided text
  *Request Body:*
  ```json
  {
      "source_text": "string (non-empty, max 10,000 characters)",
  }
  ```  

  *Response:*
    ```json
    {
      "generation_id": 123,
        "flashcards_proposals": [
            {
                "front": "string (non-empty, max 200 characters)",
                "back": "string (non-empty, max 500 characters)",
                "id": "string (required, associated generation record identifier)",
                "source": "ai-full"
            }
        ],
      "generated_count": 5
    }
  ```  
  *Errors:* 400 if text is empty or too long; 500 on generation error( logs recorder in `generation_error_logs`).

- **GET /api/generations**  
  *Description:* List generation history for the authenticated user.  
  *Response:* 200 OK with list of generation records.

- **GET /api/generations/{id}**  
  *Description:* Retrieve detailed information about a specific generation request.  
  *Response:* 200 OK; 404 if record not found.

### Generation Error Logs Endpoint
For diagnostics and monitoring purposes.

- **GET /api/generation-error-logs**  
  *Description:* Retrieve a list of generation error logs (accessible only to authorized users, e.g., admins).  
  *Response:* 200 OK with error log details.

## 3. Authentication and Authorization
- All endpoints (except registration and login) require a valid JWT token passed in the Authorization header.
- Use Supabase Auth, which enforces RLS policies in the DB (e.g., users only accessing records where auth.uid() matches user_id).
- Endpoints validate the authenticated user's id before performing operations.

## 4. Validation and Business Logic
- **General Validation:**  
  - Use Zod schemas on API endpoints to validate request payloads.
  - Validate required fields (e.g., non-empty flashcard front/back, email format, password length).

- **Flashcards Specific:**  
  - `front` must not exceed 200 characters.
  - `back` must not exceed 500 characters.
  - `source`: "string (required, must be one of: `ai-full`, `ai-edited`, `manual`)"
  - Use early returns for missing or invalid data.
  
- **Generations Specific:**  
  - `source_text_length` must be within the range 1000–10000.
  - Automatically update `updated_at` via trigger upon modifications.
  
- **Business Logic Mapping:**  
  - AI generation endpoint (/api/generations) 
  - Manual flashcard creation, update, and deletion endpoints cover US-007, US-008, US-009, and US-010.
  - Authentication endpoints mirror user stories US-001, US-002, US-003, and US-004.
  
- **Pagination and Sorting:**  
  - List endpoints support query parameters for pagination (`page`, `limit`) and sorting, ensuring scalability for large datasets.

- **Error Handling:**  
  - Return meaningful error messages (e.g., "Maksymalnie 10 000 znaków" for text length violations) with proper HTTP status codes.
  - Handle edge cases and unexpected failures with a fallback 500 Internal Server Error.

This API plan aligns with the database schema, product requirements, and the chosen tech stack (Astro, TypeScript, React, Tailwind, and Supabase) ensuring both secure and performant operations.
