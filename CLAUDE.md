# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:4200 (auto-reloads)
npm run build      # production build → dist/
npm run watch      # incremental dev build (watch mode)
npm test           # unit tests via Vitest
```

## Architecture

Angular 21 standalone-component app (no NgModules). Entry point is `src/main.ts` → bootstraps `App` from `src/app/app.ts`.

**Data flow**
1. User types in the search input and presses Enter.
2. `App` component calls `SearchService.search(query)` which returns an `Observable<SearchResult>`.
3. Results are rendered in `app.html` — a single glassmorphism card with three language sections.

**Key files**

| File | Purpose |
|---|---|
| `src/app/app.ts` | Root component — holds `searchQuery`, `results`, `isLoading` state; calls `SearchService` on Enter |
| `src/app/search.service.ts` | `SearchService` — wraps HTTP search; currently returns a dummy `Observable<SearchResult>` with a 300 ms delay. Replace the `of(dummy)` line with a real `this.http.get<SearchResult>(...)` call when the API is ready |
| `src/app/app.html` | Template — search input, skeleton loader, result card |
| `src/app/app.css` | All component styles (glassmorphism card, badges, skeleton shimmer) |
| `src/styles.css` | Global styles — body gradient background, Bootstrap import, Google Fonts import |
| `src/app/app.config.ts` | `ApplicationConfig` — provides `HttpClient` via `provideHttpClient()` |

**`SearchResult` interface** (defined in `search.service.ts`)
```ts
interface SearchResult {
  assyrian: string[];
  english: string[];
  arabic: string[];
}
```

## Styling conventions

- Bootstrap 5 is available globally but used sparingly (mostly utilities replaced by custom CSS).
- Component styles use CSS custom properties and `backdrop-filter: blur()` (glassmorphism).
- Prettier is configured: `printWidth: 100`, `singleQuote: true`, Angular parser for HTML files.
- The Arabic result list uses `direction: rtl` via the `.rtl` class.
