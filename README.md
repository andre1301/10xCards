# 10x-cards

## Project Description
10x-cards is a web application designed for quick creation and management of educational flashcards with AI assistance. The MVP allows users to:
- Generate flashcard suggestions from pasted notes (up to 10,000 characters).
- Manually create, review, edit, and delete flashcards.
- Register and authenticate via email and password.
- Integrate with an open-source spaced repetition algorithm.
- Ensure data security with HTTPS and compliance with privacy regulations.

## Tech Stack
- **Astro 5**: Fast, modern static site generation with integrated server-side rendering.
- **React 19**: For interactive components in the frontend.
- **TypeScript 5**: Adds type safety and developer tooling.
- **Tailwind CSS 4**: Efficient styling with utility-first classes.
- **Shadcn/ui**: Pre-built accessible React components.
- **Supabase**: Backend services including PostgreSQL database and authentication.
- **Openrouter.ai**: For AI-powered flashcard generation.
- **CI/CD**: Managed by GitHub Actions with deployment via DigitalOcean.

## Getting Started Locally
1. **Prerequisites:**
   - Node.js v22.14.0 (as specified in `.nvmrc`)
   - Git

2. **Installation:**
   ```bash
   git clone https://github.com/andre1301/10xCards.git
   cd 10x-cards
   npm install
   ```

3. **Running the application:**
   ```bash
   npm run dev
   ```
   Open your browser to [http://localhost:3000](http://localhost:3000) (or the port specified by Astro).

## Available Scripts
- **dev**: Runs the application in development mode.
- **build**: Builds the project for production.
- **preview**: Previews the production build.
- **lint**: Checks the code for linting errors.
- **lint:fix**: Automatically fixes linting errors.
- **format**: Formats the code using Prettier.

## Project Scope
The project focuses on delivering a minimal viable product (MVP) with the following functionality:
- AI-generated flashcards from user-provided text.
- Manual flashcard creation and management.
- User authentication and account management.
- Integration with a spaced repetition algorithm for efficient learning.
- Basic usage statistics and reporting.

## Project Status
This project is in the MVP stage and actively under development.

## License
This project is licensed under the MIT License.
