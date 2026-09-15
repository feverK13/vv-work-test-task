# CLAUDE.md — VV Work test assignment

## Stack

Vite + React 18 + TypeScript + Tailwind CSS v4.
No UI kits (no shadcn/Radix/MUI). No Redux/Zustand.
React Router for routing.
Vitest + @testing-library/react + @testing-library/user-event for testing.
Package manager: npm.

## Conventions

- Functional components + hooks only.
- File naming: kebab-case (e.g. `vacancy-card.tsx`).
- Import alias `@/` → `src/`.
- Domain types (Vacancy, Partner, Category) live in `src/types/`;
  component-local prop types stay inline in the component file.
- No code comments, except where a manual decision/value is required
  from the developer (placeholder text, brand color, etc.) — flag every
  such spot explicitly in the CLI output: what it is and why.
- ESLint (Vite react-ts default + eslint-plugin-react-hooks,
  exhaustive-deps as error) + Prettier. Do not change their config
  without asking.

## Hard rules

- Never `git commit` or `git push` without explicit approval.
- Never add a new npm dependency unless required by this brief.
  Explain why first, wait for confirmation.
- Never add UI kits or state management libraries — forbidden by the brief.
- Never edit shared modules (Header, Footer, mock API wrapper, types,
  hooks) without flagging what changes and why, and waiting for a reply.
- Never change folder/file structure without proposing it and getting
  confirmation.
- Before any import, verify the package actually exists in
  package.json/npm — never assume a library "probably exists".
- Never change ESLint/Prettier config without explanation.

## Workflow

- This file and code/comments: English. All site copy (UI text):
  Ukrainian. Respond to the developer in the CLI in Ukrainian.
- Commands: `npm run dev` / `build` / `lint` / `test`.
- Commit after every completed and approved module — never mid-module.
- Conventional Commits, English, imperative, lowercase, no trailing
  period, ≤72 chars: `<type>(<scope>): <description>`
  Types: feat, fix, refactor, test, chore, docs, style, perf.
  Example: `feat(api): add mock fetch wrapper with delay and error simulation`
- After completing a module, append an entry to docs/progress.md:
  module name, status, what was added/removed, what's still open.
  - Before reporting a module as done: run `npm run lint && npm run format:check && npm run build`
    (add `&& npm run test` once test files exist) yourself, and report the output.
- Self-check the result against the relevant section of docs/specs.md (acceptance criteria,
  edge cases) before reporting — list explicitly what was covered and what wasn't.
- Only surface code for review when asked, or when you deviated from specs/CLAUDE.md and need
  a decision.
