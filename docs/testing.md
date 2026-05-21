# Testing

Vitest is the chosen test runner. **Not yet installed** — this doc captures the setup recipe and conventions so the moment we add the dependency, tests can be written without re-deciding anything.

## Why Vitest (and not Jest)

- ESM-native — matches Next.js 15 + React 19 + the Tailwind v4 toolchain.
- Faster cold start and watch loop than Jest under modern bundling.
- TypeScript out of the box (Vite transforms TS without a separate `ts-jest`).
- API is Jest-compatible (`describe`/`it`/`expect`), so any future migration is mechanical.
- Already part of Arshad's working stack (Totara DevOps tooling uses Vitest; listed in [`src/data/stack.ts`](../src/data/stack.ts)).

If the user later opts for Jest, replace this doc — the testing *conventions* below are framework-agnostic.

## Setup recipe (run when ready to install)

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Add a `vitest.config.ts` at the repo root:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: false,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

(Also install `@vitejs/plugin-react` alongside the deps above.)

Add `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add scripts to `package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run",
  "test:ui": "vitest --ui"
}
```

## File layout

- **Co-locate** component tests next to source: `src/components/Chip.tsx` → `src/components/Chip.test.tsx`.
- **Co-locate** data-utility tests next to data: `src/data/sidebar.ts` → `src/data/sidebar.test.ts`.
- No `__tests__/` subfolders. No `tests/` root folder. Vitest picks up `*.test.{ts,tsx}` everywhere under `src/`.

## What to test

**Yes:**

- **Pure data utilities** — these are the easiest, most valuable tests. Start here.
  - `resolveActiveLabel(pathname, activeSection)` in `src/data/sidebar.ts` — covers home root, home-with-section, dedicated route prefix match, unknown route.
  - `getProject(slug)` in `src/data/projects.ts` — found and not-found.
- **Pure components** — render snapshot or assertion-on-output. `Chip`, `SectionEyebrow`, `StatusPulse`.
- **Behavioural contracts** — `useActiveSection` should set the first id by default when enabled; `RevealObserver` should add `is-visible` once.
- **Accessibility surface** — `TopNavPill` renders `aria-current` correctly on the active item; `MobileMenuOverlay` traps focus / closes on Escape.

**No:**

- **Framework behaviour** — Next.js routing, `generateStaticParams`, ISR. Don't test the framework.
- **Animation timings** — CSS transitions and the `status-pulse` keyframe don't need test coverage.
- **Visual regressions** — that's the `designer` agent's job (Playwright), not unit tests.
- **The PhotographyGallery lightbox** unless the interaction logic regresses. Then write a focused test.

## Mocking patterns

### `next/navigation`

`usePathname` is used in `TopNavPill` and `MobileMenuOverlay`. Mock it per test:

```ts
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));
```

Override the return value inside a test via `vi.mocked(usePathname).mockReturnValue("/photography")`.

### `IntersectionObserver`

jsdom doesn't ship one. Provide a stub in `vitest.setup.ts`:

```ts
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
// @ts-expect-error - test stub
global.IntersectionObserver = MockIntersectionObserver;
```

Tests that exercise observer-driven behaviour (`useActiveSection`, `RevealObserver`) should instantiate the hook then manually invoke the observer callback the hook stored — wire that via a Vitest-friendly subclass that captures the callback.

### `localStorage`

jsdom has it natively. Clear between tests with `localStorage.clear()` in a `beforeEach`.

## Conventions

- One `describe` per unit, descriptive name. One `it` per scenario, sentence-form name (`it("returns null when pathname is unknown and not on home", …)`).
- Use Testing Library queries (`getByRole`, `getByLabelText`) over DOM internals. Accessibility-tree assertions catch real regressions.
- Don't assert on Tailwind classes unless a class change is the entire point of the test. Assert on rendered text, roles, attributes.
- Keep test files under 200 lines. If a file balloons, the unit under test is probably doing too much.

## Smoke test for the data layer (when Vitest lands)

The very first test should be `src/data/sidebar.test.ts` covering `resolveActiveLabel`. It's pure, deterministic, and exercises the most important runtime contract (sidebar/nav active-state correctness). One unit, six cases:

1. `pathname = "/"`, no active section → `"home"`
2. `pathname = "/"`, active section `"work"` → `"work"`
3. `pathname = "/photography"`, any section → `"photography"`
4. `pathname = "/projects/pixxellent"`, any section → `"projects"` (prefix match)
5. `pathname = "/thoughts"` → `"thoughts"`
6. `pathname = "/unknown"` → `null`

Once that passes, expand to `getProject` and the rest.
