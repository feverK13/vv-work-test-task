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

## M13 — Interaction polish ✅

Press feedback: buttonClassName (used by Button and every button-styled link) gets
active:scale-[0.97] + active:shadow-none with a 0s duration while pressed, so the
press snaps and the release eases back; partner and vacancy cards press to 0.98;
category chips on Home and Partner press to 0.95; header nav links press to 0.97.
Fixed: Tailwind v4 moves translate/scale utilities to the standalone `translate` /
`scale` properties, so the old transition-[transform,...] lists never animated the
hover lift — the lists on buttons and cards now name translate and scale.
Header: desktop nav links draw a brand-500 underline from the center on hover
(::after scale-x 0 -> 1); the active link keeps it.
Hero: decorative composition of three brand-100/200/300 shapes on the right, clipped
by the section, floating on a 6-8s translateY ±12px loop; hidden below 768px.
Stagger: .stagger-children (index.css) delays each child's entrance by 80ms via
nth-child once the parent section has revealed — partners grid, category chips,
employer benefits.
Footer: 1px transparent -> brand-500/30 -> transparent line on top; social icons
scale to 1.1 and turn brand-400 on hover; "Вгору" back-to-top button in the bottom
bar (smooth scroll, instant under reduced motion); the © line moved from center to
the left to make room.
Contacts: info list and form share one card style (white, rounded-2xl, border,
shadow-card) with a short brand-500 accent bar at the top.
Reduced motion: every new transform is reset by motion-reduce variants, the
underline transition is removed, stagger and float animations are disabled in the
existing prefers-reduced-motion block.
Open: hero shapes sit behind the heading between 768 and 1023px; not yet checked
visually in the browser. (Resolved in M17: they did overlap; hero decor now starts
at 1024px.)

## M14 — Bug fixes and final polish ✅

Fixed: useActiveSection highlighted "Партнери" while categories/employer were on
screen — the observer only fired when a section edge crossed a thin top band, so a
section boundary passing the 120px line often produced no callback. The observer now
watches a centre band (rootMargin -45% 0px -45% 0px) and the active section is the one
that contains the viewport's centre line; nothing is highlighted while the hero or
footer is at the centre.
Mobile: html gets -webkit-tap-highlight-color: transparent; button, a and
[role="button"] get touch-action: manipulation.
Mock API: REJECTION_RATE lowered from 0.2 to 0.1 — deliberate deviation from the
brief's "1 in 5"; with parallel fetches 0.2 made the first visit fail too often.
Still to be documented in README.
Favicon: public/favicon.svg is now a stroked "VV" in brand-500; the unused
src/assets/vite.svg was removed (index.html already pointed at /favicon.svg).
Added hooks/use-parallax.ts: rAF-throttled passive scroll/resize listener that
translates a decor layer by 30% of its section's distance from the viewport centre;
active only at min-width 768px with prefers-reduced-motion: no-preference and
re-evaluated on media query change. (removed in M16)
Decor: parallax on the hero shapes, plus new clipped shape layers (-z-10 inside an
isolated section, hidden below 768px) in partners preview (brand-200/100), employer
CTA (brand-500/10) and contacts (brand-200/100). (parallax and the partners preview
layer removed in M16)
Open: not verified in a browser — the automation browser could not reach the local
dev server; nav highlighting, parallax feel and tap feedback need a manual pass
(tap feedback on a real iOS/Android device). src/assets/react.svg, hero.png and
public/icons.svg are unused template leftovers.

## M15 — Navigation restructure, parallax and favicon fixes ✅

Header nav (desktop and mobile): Знайти роботу -> /#partners, Для роботодавців ->
/#employer, Категорії -> /#categories, Контакти -> /контакти. "Партнери" removed, so
no two items share a target.
Active state: Home — the item whose section intersects the centre band
(rootMargin -40% 0px -40% 0px); while two sections overlap the band the current one
is kept until it leaves, so at most one item is highlighted. /partners/:slug — none.
/контакти — Контакти. The partner-page special case was removed from the header.
Fixed: the previous hook recomputed "section under the centre line" only when an
edge crossed the band, so a section could sit in the centre for ~700px of scroll
without being highlighted. It now tracks which sections intersect the band.
Footer columns: Для кандидатів (Знайти роботу, Категорії), Для роботодавців
(Розмістити вакансію), Компанія (Контакти + email, phone, socials); the duplicate
"Вакансії" and "Наші партнери" links were removed; link lists share a local
FooterLinkList component.
Parallax: useParallax(speed) now returns { ref, transform } state; added
components/ui/parallax-shape.tsx, which applies the transform to one shape. Every
decor shape (hero, partners, employer, contacts) is a ParallaxShape with speed 0.2 /
0.3 / 0.4. The offset is speed x the distance between the shape layer's centre and
the viewport centre, so the shape shifts by speed x scroll delta. Hero shapes keep
the float animation on an inner element so the two transforms do not collide.
(removed in M16)
Favicon: text-based "VV" (Arial bold, #5465FF). public/vite.svg never existed; the
unused src/assets/vite.svg was removed in M14.
Verified in headless Chrome 1440x900 against the production build: nav items and
hrefs, footer text, active item while scrolling Home in 40px steps, none on
/partners/budprofi, Контакти on /контакти, shape transforms change with scroll in all
four sections (hero shape at 0.4 moves 240px on screen for 400px of scroll), no
transforms under prefers-reduced-motion: reduce (parallax checks removed in M16),
decor display:none at 375px,
/favicon.svg served as image/svg+xml and rendered as "VV".
Open: tap feedback still unverified on a real iOS/Android device; README note about
REJECTION_RATE 0.1 still to be written.

## M16 — Parallax removed ✅

Removed: hooks/use-parallax.ts and components/ui/parallax-shape.tsx. Hero, employer
CTA and contacts keep their static decor shapes as plain divs (hero shapes keep the
float animation); the decor layer in the partners preview section was removed along
with the relative/isolate classes it needed.

## M17 — Small fixes (backfill) ✅

Form: the textarea in Input gets h-32 and resize-none, so the message field keeps a
fixed height and scrolls inside instead of being dragged out of the form layout.
Scrollbar: index.css styles every scrollable element with a thin brand-300 thumb
(brand-400 on hover) on a transparent track — scrollbar-width/scrollbar-color plus
::-webkit-scrollbar rules; .no-scrollbar rows stay hidden.
Category chips (Home and Partner page): below 768px snap-mandatory + snap-start
aligned the first chip to the scroll container's edge and ignored its padding, so
the row loaded pre-scrolled by 16px and chips touched the screen edge. Added
scroll-px-4 / sm:scroll-px-6 to match the section padding; measured at 375px, the
first chip now starts at 16px, level with the section heading.
Hero decor: measured in headless Chrome (768-1920px, 8px steps, float range
included) — the shapes overlapped the heading and the paragraph at 768-824px and the
heading at 1024-1080px. The decor is now hidden below 1024px and sits at -right-32
(lg) / -right-16 (xl); the scan reports no overlap at any width.
