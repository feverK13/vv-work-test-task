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
Open: partner/contacts pages still placeholders (next modules).

## M6 — Home page sections ✅

Added: pages/home/{hero,partners-preview,categories-block,employer-cta}.tsx,
composed in pages/home/index.tsx. Removed "Про нас" from header nav (no target
page in scope — flagged deviation from brief's nav example, approved by dev).
Open: none — matches specs.md (Hero, Partners preview, Categories, Employer CTA
sections); mock copy flagged in CLI report.

## M7 — Partner page ✅

Added: lucide-react (approved dep); pages/partner/{partner-header,vacancy-list,vacancy-card}.tsx,
composed in pages/partner/index.tsx. Partner and vacancy fetches run in parallel
(sibling components, independent effects); retries are independent.
Open: `?category=` is read and passed as `initialCategory` but not applied yet (M8
filtering); "Відгукнутись" button is inert until ApplicationForm (M9).
