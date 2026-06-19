# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This project is a React learning sandbox and interview preparation environment targeting a **senior full-stack software engineer** role with a strong UI focus. Each component in `src/` demonstrates or exercises a distinct concept (custom hooks, debouncing, context, lazy loading, charting, etc.) that commonly appears in senior-level frontend interviews.

## UI Development Standards

All work in this project must follow current industry standards:

- **Accessibility (a11y):** semantic HTML elements, ARIA attributes where needed, keyboard navigability, sufficient color contrast.
- **Performance:** avoid unnecessary re-renders (prefer `useMemo`/`useCallback` when the cost justifies it), lazy-load heavy components, keep bundle size in mind.
- **Component design:** single responsibility, props clearly typed with PropTypes or JSDoc where beneficial, no prop drilling beyond two levels (use context or composition instead).
- **CSS:** use CSS custom properties for theming; avoid inline styles except for truly dynamic values.
- **Error handling:** use `ErrorBoundary` (already present) around route-level components; surface meaningful fallback UI.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

This is a React 19 + Vite app used as a component playground. There is no backend.

**Routing:** [src/App.jsx](src/App.jsx) owns all routing via `react-router-dom`. Each feature component maps to its own route (e.g. `/stopwatch` → `<Stopwatch />`). `VideoPlayer` is the only lazy-loaded route (via `React.lazy` + `Suspense`).

**Global state:** `GlobalContext` is created and provided in `App` (currently holds `{ user, setUser }`). Components consume it via `useContext(GlobalContext)`.

**Custom hooks:**
- [src/useLocalStorage.js](src/useLocalStorage.js) — `useState` wrapper that persists to `localStorage` with lazy initialization
- [src/useInterval.js](src/useInterval.js) — safe `setInterval` wrapper that uses a ref to always call the latest callback, and pauses when `delay` is `null`

**Component conventions:** All components are `.jsx` files in `src/` (flat, no subdirectories). Dependencies are `recharts` (for `SalesChart`) and `react-router-dom`. No CSS modules — global styles live in [src/index.css](src/index.css) and [src/App.css](src/App.css).

**ESLint:** JS/JSX only (no TypeScript). Rules: `eslint:recommended` + `react-hooks` + `react-refresh`.
