# System Patterns

## Architecture Overview

### Next.js App Router Architecture

The project follows Next.js 15's App Router pattern, providing a file-system-based routing with server-first architecture.

```
src/app/
├── layout.tsx          # Root layout (server component)
├── page.tsx           # Home page (server component)
├── favicon.ico        # App icon
└── globals.css        # Global styles (moved to src/styles/)
```

### Component Hierarchy

```
RootLayout (layout.tsx)
├── HTML structure with fonts
├── Body with CSS variables
└── {children} - page content
    └── Home (page.tsx) - landing page
```

## Key Technical Decisions

### Server-First Approach

-   **Default to Server Components**: All components are server components unless client interactivity is needed
-   **"use client" directive**: Only added when client-side features are required (state, events, browser APIs)
-   **Data fetching**: Server components handle initial data loading

### Styling Strategy

-   **Global CSS with Tailwind v4**: Modern Tailwind integration via `@import "tailwindcss"`
-   **CSS custom properties**: Comprehensive theme variable system for colors, spacing, shadows
-   **Tailwind @theme inline tokens**: Maps CSS variables to Tailwind utility classes
-   **Mobile-first responsive**: Tailwind's responsive design system
-   **Dark/Light theme system**: Class-based theming with html.dark overrides
-   **Component utility classes**: Custom .btn-\*, .card classes in global CSS

### Type Safety Patterns

-   **TypeScript strict mode**: All code must pass strict type checking
-   **Next.js types**: Import types from 'next' for framework-specific typing
-   **Component props**: Explicitly type all React component props
-   **Path aliases**: Use `@/*` for clean import statements

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
// Font loading with next/font
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
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
		// Check localStorage and system preference
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
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
/* Theme variables with CSS custom properties */
:root {
	--primary: #2563eb;
	--background: #f9fafb;
	/* ... other light theme vars */
}

html.dark {
	--primary: #60a5fa;
	--background: #0f172a;
	/* ... other dark theme vars */
}

/* Component utility classes */
.btn-primary {
	background: var(--primary);
	color: white;
	border: none;
	border-radius: 0.5rem;
	padding: 0.75rem 1.5rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
}

.btn-primary:hover {
	opacity: 0.9;
	transform: translateY(-1px);
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
// Use next/image for all images
import Image from "next/image";

<Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />;
```

### Metadata Pattern

```tsx
// Page-level metadata
export const metadata: Metadata = {
	title: "Page Title",
	description: "Page description",
};
```

## Component Relationships

### Current Structure

-   **RootLayout**: Provides HTML structure, fonts, theme script, and global CSS styles
-   **Home Page**: Comprehensive themed landing page with feature showcase
-   **ThemeToggle**: Client component for theme switching with persistence
-   **Global Styles**: CSS with Tailwind v4 integration and theme variables
-   **Static Assets**: SVG icons and images in `/public`

### Implemented Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with theme script
│   └── page.tsx          # Themed home page
├── components/
│   └── ThemeToggle.tsx   # Theme switching component
└── styles/
    └── globals.css       # Global CSS with Tailwind v4 and theme vars
```

### Planned Future Structure

```
Components/
├── Layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
├── Portfolio/
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   └── ProjectDetail.tsx
├── UI/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Typography.tsx
└── Forms/
    ├── ContactForm.tsx
    └── Input.tsx
```

## Critical Implementation Paths

### Routing Patterns

-   **File-based routing**: Pages created by file structure in `app/` directory
-   **Route groups**: Use `(group)` folders for organization without affecting URLs
-   **Dynamic routes**: `[slug]` for dynamic portfolio project pages
-   **Layout nesting**: Shared layouts at different route levels

### Data Fetching Patterns

-   **Server Components**: Fetch data directly in server components
-   **Client Components**: Use React Query/SWR for client-side data fetching
-   **Static Generation**: Pre-render pages at build time where possible
-   **Incremental Static Regeneration**: Update static content without full rebuilds

### Error Handling Patterns

-   **Error boundaries**: `error.tsx` files for route-level error handling
-   **Not found pages**: `not-found.tsx` for 404 errors
-   **Loading states**: `loading.tsx` for async route transitions

### Performance Patterns

-   **Code splitting**: Automatic by Next.js App Router
-   **Image optimization**: Use `next/image` with proper sizing
-   **Font optimization**: Use `next/font` for web font loading
-   **Bundle analysis**: Monitor bundle size and optimization opportunities

## Code Organization Principles

### File Naming Conventions

-   **Pages**: `page.tsx` for route pages
-   **Layouts**: `layout.tsx` for shared layouts
-   **Components**: PascalCase for component files (e.g., ThemeToggle.tsx)
-   **Styles**: `globals.css` for global stylesheets
-   **Utilities**: camelCase for utility functions
-   **Constants**: SCREAMING_SNAKE_CASE for constants

### Import Organization

```tsx
// 1. React and Next.js imports
import React from "react";
import Image from "next/image";

// 2. Third-party library imports
import clsx from "clsx";

// 3. Internal imports (using path alias)
import { Button } from "@/components/ui/Button";
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

-   **State management**: Context API or Zustand for global state
-   **API integration**: Custom hooks for external API calls
-   **Authentication**: Next-auth or similar for user management
-   **Database**: Prisma with PostgreSQL for data persistence
-   **Testing**: Jest and React Testing Library for component testing
-   **Monitoring**: Error tracking and performance monitoring
