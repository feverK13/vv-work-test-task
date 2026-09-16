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

## M11 — Visual polish + responsive pass ✅

Added: hooks/use-scroll-reveal.ts (IntersectionObserver, reveal once, no
re-trigger); components/ui/section-label.tsx (brand rule + label, replaces the
all-caps eyebrows); components/ui/button-styles.ts (buttonClassName, so Link and
anchor CTAs get the button look without nesting a <button> inside an <a>).
Tokens in index.css: --color-muted, --color-line, --shadow-card, --shadow-elevated,
fade-in-up keyframes with a prefers-reduced-motion opt-out, .no-scrollbar.
Component API additions: Button gained size ('md' | 'lg') and an 'inverted'
variant; Badge gained size ('sm' | 'md'). Both default to the previous look.
Responsive: header switches to a right-side slide-in menu below 1024px (closes on
link click, backdrop click and Escape, locks body scroll); category rows scroll
horizontally with snap below 768px instead of wrapping; every grid steps
3 -> 2 -> 1 column; footer columns stack with separators on mobile.
Fixed: the mobile overlay lived inside the header, whose backdrop-blur made it the
containing block for position:fixed, so the panel and backdrop were clipped to the
header's height. The overlay is now a sibling of <header>.
Verified in Chrome at 375 / 768 / 1536 CSS px.
Open: lucide-react v1 ships no brand icons, so the Facebook and Instagram marks in
the footer are local inline SVGs; Telegram uses lucide's Send.

## M12 — Navigation, scroll and expand/collapse fixes ✅

Added: components/layout/scroll-to-top.tsx (mounted in App, inside BrowserRouter);
utils/scroll.ts (getHashTarget / scrollToSection / scrollToTop);
hooks/use-active-section.ts (IntersectionObserver over #partners, #categories,
#employer; the active section is the last one whose top crossed the 120px line, so
at most one nav link is ever highlighted); hooks/use-grid-column-count.ts
(ResizeObserver + callback ref, reads gridTemplateColumns).
Fixed: header and footer hash links now scroll even when the hash does not change;
route changes scroll to top (instant) while hash targets smooth-scroll to the
section; the active nav state comes from scroll position on Home and from the
pathname elsewhere (only "Партнери" on /partners/*, only "Контакти" on /контакти).
location.pathname is decoded before comparison — the Cyrillic /контакти route
never matched before.
Vacancy form: openVacancyId lifted to VacancyList (one form open at a time), the
form is no longer a child of the card. It renders as a col-span-full grid item
after the last card of the clicked card's row, so the grid keeps uniform rows.
VacancyCard API: added isOpen and onToggle props; the toggle callback is memoized
so the memo on the card still holds.
Data: vacancies.ts grew from 9 to 21 entries (budprofi 6 across 3 categories,
logitrans-ua 4, zlagoda-hotel 4, metalvyroboka 3, itcore-solutions 4).
Tests: pages/partner/vacancy-list-expand.test.tsx (one form at a time, collapse,
form rendered outside the card). 22 tests total.
Open: collapse is instant — only the expand is animated (CSS keyframes on mount);
an exit animation would need a closing-state machine that makes the toggle callback
unstable and breaks the card memoization.
