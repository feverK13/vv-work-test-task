# Progress

## M0 — Scaffold ✅

Vite + React + TS + Tailwind v4, ESLint/Prettier, Vitest — all configured, verified.

## M1 — CLAUDE.md ✅

## M2 — Specs (docs/specs.md) ✅

## M3 — Mock API ✅

Added: types/domain.ts, api/mock-fetch.ts, api/partners.ts, api/vacancies.ts,
api/applications.ts, data/{categories,partners,vacancies}.ts.
Open: none — matches specs.md fully.

## M4 — UI primitives ✅

Added: `@theme` brand/ink/paper tokens in index.css; components/ui/{button,input,skeleton,retry-block,badge}.tsx.
Open: none — matches specs.md; ambiguities noted in CLI report (Input multiline mode, Badge shade).

## M5 — Header/Footer + routing ✅

Added: react-router@7 (approved dep); components/layout/{header,footer,layout}.tsx;
pages/{home,partner,contacts}/index.tsx (placeholders); App.tsx wired with
BrowserRouter + Layout + routes (/, /partners/:slug, /контакти).
Open: home/partner/contacts still placeholders (next modules); "Про нас" has no
target section yet — nav link points at home for now, see CLI report.
