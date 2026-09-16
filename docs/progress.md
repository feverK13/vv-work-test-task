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

## M8 — Search + category filter (partner page) ✅

Added: hooks/use-debounce.ts (generic, 400ms default, cleans timeout on value
change and unmount); hooks/use-vacancy-filters.ts (useMemo, AND logic, returns
original vacancy object references); search Input + category chips row in
pages/partner/vacancy-list.tsx; "Нічого не знайдено." empty-filter state;
pages/partner/vacancy-list.test.tsx (re-render guard, empty-filter state, memo check).
Removed: `data-initial-category` workaround from M7 — `?category=` is now real
filter state (validated against data/categories, unknown id falls back to "all").
Query/category state lives in VacancyList so it survives a vacancy-fetch retry.
Changed shared module (approved by dev): components/ui/badge.tsx gained
`variant?: 'solid' | 'outline'` (default 'solid' = previous style, so existing
call sites are unaffected). Category chips use `variant`, no `!important`.
Open: "Відгукнутись" still inert (M9).

## M9 — Application form ✅

Added: utils/validators.ts (validateName / validateContact / validateMessage,
pure, no React); hooks/use-form-validation.ts (values, errors, handleChange,
handleBlur, handleSubmit(onValid), isSubmitting; validates per-field on blur and
all fields on submit; handleChange clears that field's stale error on the first
keystroke, validation triggers themselves unchanged); components/ui/application-form.tsx (optimistic success
state, background submitApplication, inline failure notice with a "back to form"
button that keeps the entered values).
Wired: "Відгукнутись" in pages/partner/vacancy-card.tsx now toggles the form
inline inside the card, passing vacancyTitle; pages/contacts/index.tsx replaced
the placeholder with a static contact block + ApplicationForm without vacancyTitle.
Tests: utils/validators.test.ts, components/ui/application-form.test.tsx
(invalid submit blocked, blur validation, optimistic UI before resolve,
single request on double submit, failure retry keeps values, counter).
Message field passes maxLength=500 to Input for the counter, so validateMessage
is a safety net rather than a reachable UI error.
Open: mock contact details (address/phone/email/hours) are placeholder copy.

## M10 — Not-found page ✅

Added: pages/not-found/index.tsx (centered 404 message + Link to Home wrapping
the existing Button); App.tsx got a catch-all `path="*"` route nested inside the
Layout route, so Header and Footer still render on an unmatched URL.
Open: 404 body copy is placeholder wording.
