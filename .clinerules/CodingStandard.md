## Next.js Best Practices and Conventions

### 1. Component Naming and Structure

-   PascalCase for classes, interfaces, types and react components.
-   **Reusability:** Store shared, project-wide components in a central `src/components` directory.
-   When making API calls, integrate them into the existing classes in the src/api folder. If no suitable class exists, create a new, appropriately named class with methods designed to handle the specific API endpoint.

### 2. Next.js Features and Patterns

-   **Server vs. Client Components:** Prefer **Server Components** by default for static UI and server-side data fetching. Use the `"use client"` directive only when client-side interactivity is required (e.g., state, event handlers).
    Data Fetching: When making API calls, use fetch() directly within Server Components or Route Handlers. For client-side data fetching with caching and revalidation, always use our custom hook, UseSwr(), which is already configured with SWR.
-   **Image Optimization:** Use the `next/image` component for all images to ensure optimal performance. Our project is configured to use **imgix as a custom loader**, so the component will automatically leverage imgix's optimizations (resizing, formatting, etc.). A standard `<img>` tag is only to be used in rare cases where a third-party library or specific styling requirements cannot be met by the `next/image` component.
-   **Routing:** All new routes should be created using the **App Router** (`app` directory).

### 3. Code Quality and Maintenance

-   **TypeScript:** Write all new code in TypeScript for enhanced type safety and developer experience.
-   **Readability:** Use **early returns** to simplify conditional logic and avoid deeply nested code blocks.
-   **Descriptive Naming:** Use clear and descriptive names for all variables, functions, and components. Custom hooks should always use the `use` prefix (e.g., `useAuth`).

-   Avoid comments for each line of code.
