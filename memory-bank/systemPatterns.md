# System Patterns

## Architecture Overview

### Next.js App Router Architecture

The project follows Next.js 15's App Router pattern, providing file-system-based routing with a server-first architecture.

```
src/app/
├── layout.tsx          # Root layout (server component)
├── page.tsx           # Home page (server component)
├── favicon.ico        # App icon
└── (routes below as Phase 2 builds them)
    ├── work/
    │   ├── page.tsx           # Project index
    │   └── [slug]/page.tsx    # Case study
    └── photography/
        └── page.tsx           # Masonry gallery
```

### Component Hierarchy

```
RootLayout (layout.tsx)
├── HTML structure with fonts (Geist Sans, Geist Mono)
├── No-FOUC theme script
├── Header (multi-page nav, no avatar)
├── {children} — page content
└── Footer
```

## Key Technical Decisions

### Server-First Approach

- **Default to Server Components**: All components are server components unless client interactivity is needed
- **"use client" directive**: Only added when client-side features are required (state, events, browser APIs)
- **Data fetching**: Server components handle initial data loading

### Styling Strategy

- **Global CSS with Tailwind v4**: Modern Tailwind integration via `@import "tailwindcss"`
- **CSS custom properties**: Comprehensive theme variable system for colors, borders, and surfaces
- **Tailwind @theme inline tokens**: Maps CSS variables to Tailwind utility classes
- **Mobile-first responsive**: Tailwind's responsive design system; test at 375 / 768 / 1280
- **Dark/Light theme system**: Class-based theming with `html.dark` overrides
- **Typography system**: Geist Mono for body/nav/labels (default state); Geist Sans heavy for hero and section display moments only

### Type Safety Patterns

- **TypeScript strict mode**: All code must pass strict type checking
- **Next.js types**: Import types from 'next' for framework-specific typing
- **Component props**: Explicitly type all React component props
- **Path aliases**: Use `@/*` for clean import statements

## Design Patterns in Use

### Layout Pattern

```tsx
// Root layout wraps all pages
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="font-variables">{children}</body>
		</html>
	);
}
```

### Font Optimization Pattern

```tsx
// Font loading with next/font — both Geist variants needed for v2
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});
```

### Theme System Patterns

```tsx
// Theme toggle component pattern
"use client";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const shouldBeDark =
			savedTheme === "dark" || (!savedTheme && prefersDark);

		setIsDark(shouldBeDark);
		document.documentElement.classList.toggle("dark", shouldBeDark);
	}, []);

	const toggleTheme = () => {
		const newIsDark = !isDark;
		setIsDark(newIsDark);
		document.documentElement.classList.toggle("dark", newIsDark);
		localStorage.setItem("theme", newIsDark ? "dark" : "light");
	};
}
```

### CSS Styling Patterns

```css
/* Theme variables — v2 palette */
:root {
	--bg: #f8f5ee; /* warm off-white */
	--text: #1a1a1a;
	--text-muted: #5c5c5c;
	--border: #e8e2d4;
	--accent: #4d7619; /* moss */
}

html.dark {
	--bg: #0b0b0c; /* warm near-black */
	--text: #eaeaea;
	--text-muted: #888888;
	--border: #1a1a1c;
	--accent: #b5d827; /* sage-lime */
}

/* Example: tech chip — Geist Mono, subtle */
.chip {
	font-family: var(--font-geist-mono);
	font-size: 0.75rem;
	color: var(--text-muted);
	border: 1px solid var(--border);
	padding: 0.25rem 0.5rem;
	border-radius: 0.25rem;
}

/* Example: link with accent underline */
.link-accent {
	color: var(--text);
	text-decoration: underline;
	text-decoration-color: var(--accent);
	text-underline-offset: 0.2em;
	text-decoration-thickness: 0.1em;
	transition: color 0.2s ease;
}

.link-accent:hover {
	color: var(--accent);
}
```

### No-FOUC Theme Pattern

```tsx
// Inline script in layout.tsx prevents theme flash
<script
	dangerouslySetInnerHTML={{
		__html: `
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      }
    } catch {}
  `,
	}}
/>
```

### Image Optimization Pattern

```tsx
// Use next/image for all images, especially the photography gallery
import Image from "next/image";

<Image
	src="/photography/sunset.jpg"
	alt="Coastal sunset, Wellington"
	width={1200}
	height={800}
	sizes="(max-width: 768px) 100vw, 50vw"
/>;
```

### Metadata Pattern

```tsx
// Page-level metadata
export const metadata: Metadata = {
	title: "Page Title",
	description: "Page description",
};
```

### Decorative Element Patterns

v2 allows decorative elements but only when earned by the section. Patterns include:

- **Dot grids** — small (4×4 or 6×6) dot fields used as spatial anchors near hero or section breaks
- **Bracket frames** — `[ ]` style frames around emphasis blocks (quotes, callouts)
- **`#section` heading prefixes** — Geist Mono `#` prefix on section labels
- **Monospace caret** — blinking or static `|` accent, used at most once per page

Rule: pick what each section needs. Never stack all four in one place.

## Component Relationships

### Current Structure (start of Phase 2 v2)

- **RootLayout**: HTML structure, fonts, theme script, global CSS
- **ThemeToggle**: Client component for theme switching with persistence
- **Icon**: Typed wrapper around lucide-react
- **Global Styles**: CSS with Tailwind v4 integration and theme variables (v2 palette pending swap in first Phase 2 chunk)

### Implemented Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with theme script
│   └── page.tsx          # Currently boilerplate, replaced by v2 home in Phase 2
├── components/
│   ├── ThemeToggle.tsx   # Theme switching component
│   ├── Header.tsx        # Currently minimal, rebuilt in Phase 2
│   └── Icon.tsx          # Lucide wrapper
└── styles/
    └── globals.css       # Global CSS with Tailwind v4 and theme vars
```

### Planned v2 Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Home
│   ├── work/
│   │   ├── page.tsx             # Project index
│   │   └── [slug]/page.tsx      # Case study (first: pixxellent)
│   └── photography/
│       └── page.tsx             # Masonry gallery
└── components/
    ├── Layout/
    │   ├── Header.tsx           # Multi-page nav, no avatar
    │   ├── Footer.tsx
    │   └── Nav.tsx
    ├── Home/
    │   ├── Hero.tsx             # Oversized typography, no headshot
    │   ├── About.tsx
    │   ├── ExperienceTimeline.tsx
    │   └── ContactStrip.tsx
    ├── Work/
    │   ├── WorkIndex.tsx        # Project cards
    │   └── CaseStudy.tsx        # /work/[slug] layout
    ├── Photography/
    │   └── PhotoGrid.tsx        # Masonry, mixed aspect
    ├── UI/
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   ├── Chip.tsx
    │   └── Typography.tsx
    └── Decorative/
        ├── DotGrid.tsx
        └── BracketFrame.tsx
```

## Critical Implementation Paths

### Routing Patterns

- **File-based routing**: Pages created by file structure in `app/` directory
- **Dynamic routes**: `[slug]` for `/work/[slug]` case studies
- **Layout nesting**: Shared header/footer at root layout level

### Data Fetching Patterns

- **Server Components**: Fetch data directly in server components
- **Static Generation**: Pre-render pages at build time where possible (most of this portfolio is static)
- **Client Components**: Reserved for interactive UI only (ThemeToggle, future contact form)

### Error Handling Patterns

- **Error boundaries**: `error.tsx` files for route-level error handling
- **Not found pages**: `not-found.tsx` for 404 errors
- **Loading states**: `loading.tsx` for async route transitions

### Performance Patterns

- **Code splitting**: Automatic via Next.js App Router
- **Image optimization**: Use `next/image` with proper sizing (especially critical for `/photography`)
- **Font optimization**: Use `next/font` for both Geist variants
- **Bundle analysis**: Monitor bundle size; add no new dependencies without approval

### Motion Patterns

v2 motion is purposeful or absent. Allowed:

- Scroll-triggered fades for section entry
- Hover states on nav, links, cards
- Subtle page transitions
- Hover-dim on experience cards (active card emphasized, others dimmed)

Disallowed: parallax, decorative animation, gratuitous motion, particle effects.

## Code Organization Principles

### File Naming Conventions

- **Pages**: `page.tsx` for route pages
- **Layouts**: `layout.tsx` for shared layouts
- **Components**: PascalCase for component files (e.g., `Hero.tsx`)
- **Styles**: `globals.css` for global stylesheets
- **Utilities**: camelCase for utility functions
- **Constants**: SCREAMING_SNAKE_CASE for constants

### Import Organization

```tsx
// 1. React and Next.js imports
import React from "react";
import Image from "next/image";

// 2. Third-party library imports
import clsx from "clsx";

// 3. Internal imports (using path alias)
import { Button } from "@/components/UI/Button";
```

### Component Structure Pattern

```tsx
// Type definitions first
interface ComponentProps {
	title: string;
	optional?: boolean;
}

// Component implementation
export default function Component({ title, optional }: ComponentProps) {
	// Early returns for conditional rendering
	if (!title) return null;

	// Main component JSX
	return <div className="component-styles">{/* Component content */}</div>;
}
```

## Future Architecture Considerations

- **State management**: Likely none needed for current scope; Context API or Zustand only if a real need emerges
- **API integration**: Custom hooks if contact form or dynamic content is added
- **CMS**: MDX-based content for case studies if catalog grows beyond Pixxellent
- **Testing**: Jest + React Testing Library if interactive components multiply
- **Monitoring**: out of scope per CLAUDE.md (no analytics or third-party scripts); revisit if constraint lifts
