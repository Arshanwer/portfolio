# Technical Context

## Technology Stack

### Core Framework

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.x** - Type-safe JavaScript development

### Styling & UI

- **TailwindCSS 4.x** - Utility-first CSS framework with @theme inline tokens
- **Global CSS** - Modern CSS with custom properties (no preprocessing)
- **PostCSS** - CSS processing with Tailwind integration
- **Geist Font** - Vercel's optimized font family (Sans & Mono variants)
- **CSS Custom Properties** - Theme variables for light/dark mode system

### Development Tools

- **ESLint 9.x** - Code linting with Next.js configuration
- **@eslint/eslintrc 3.x** - ESLint configuration utilities
- **TypeScript Compiler** - Strict mode enabled
- **PostCSS** - CSS processing for Tailwind v4 integration

## Development Setup

### Scripts Available

```bash
npm run dev    # Development server (http://localhost:3210)
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Project Structure

```
portfolio/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout with fonts and theme script
│   │   ├── page.tsx       # Themed home page
│   │   └── favicon.ico    # Site favicon
│   ├── components/        # React components
│   │   └── ThemeToggle.tsx # Theme switching component
│   └── styles/            # CSS stylesheets
│       └── globals.css    # Global styles with Tailwind v4 and theme vars
├── public/                # Static assets
├── memory-bank/          # Project documentation
└── configuration files
```

## Configuration Details

### TypeScript Configuration

- **Target:** ES2017 for broad browser support
- **Strict Mode:** Enabled for type safety
- **Path Mapping:** `@/*` resolves to `src/*`
- **JSX:** Preserve mode for Next.js processing
- **Module Resolution:** Bundler mode for modern tooling

### Next.js Configuration

- **next.config.ts:** Currently minimal (no custom config)
- **App Router:** Using new app directory structure
- **Server Components:** Default rendering strategy
- **Image Optimization:** Built-in Next.js image handling

### Code Quality

- **ESLint:** Next.js recommended configuration
- **TypeScript:** Strict type checking enabled
- **Import Resolution:** Supports both ES modules and CommonJS

## Technical Constraints

### Browser Support

- Modern browsers supporting ES2017+
- No Internet Explorer support
- Mobile-first responsive design approach

### Performance Requirements

- Server-side rendering for initial page loads
- Client-side hydration for interactivity
- Optimized font loading with next/font
- Image optimization through next/image component

### Development Environment

- **Node.js:** Required for Next.js development
- **Package Manager:** npm (lockfile present)
- **IDE:** VS Code with TypeScript support

## Deployment Context

### Recommended Platform

- **AWS** (pivoted from Vercel on 2026-05-13). Specific shape TBD — likely ECS or App Runner to keep parity with Pixxellent's ECS setup and to keep ISR working out of the box on a Node.js server. Pure static export (S3 + CloudFront with `output: 'export'`) is also viable but would disable `/photography` ISR.
- **Build Command:** `npm run build`
- **Start Command:** `npm run start` (Node.js host) — not applicable for pure static export

### Environment Considerations

- Static asset optimization
- Automatic image optimization
- Edge function deployment for API routes
- CDN distribution for global performance

## Current Technical State

### What's Configured

- Complete Next.js 15 setup with App Router
- TypeScript with strict mode
- Global CSS with Tailwind v4 integration (`@import "tailwindcss"`)
- TailwindCSS 4.x with @theme inline token mapping
- Comprehensive dark/light theme system
- Theme toggle component with localStorage persistence
- ESLint with Next.js rules
- Font optimization with Geist fonts
- Path aliases for clean imports
- No-FOUC theme loading script
- Hydration warning suppression for theme class

### What's Missing

- Custom Next.js configuration
- API routes or server functionality
- Database integration
- Authentication setup
- Additional custom components beyond ThemeToggle
- SEO optimization beyond defaults
- Performance monitoring
- Error handling and logging

## Future Technical Considerations

- Consider adding React Query/SWR for data fetching
- Implement custom API routes for contact forms
- Add Framer Motion for animations
- Analytics is currently out of scope per CLAUDE.md ("No analytics, tracking, or third-party scripts"). Revisit only if the no-tracking constraint is lifted.
- Set up automated testing (Jest/Testing Library)
- Configure CI/CD pipeline
