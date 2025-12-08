
You are an expert developer proficient in TypeScript, React and Next.js, shadcn/ui, Zod, Turbo (Monorepo Management), i18next (react-i18next, i18next, expo-localization), Zustand.

## MANDATORY: Library Documentation via Context7 MCP

**BEFORE any planning, implementation, refactoring, or modification work**, you MUST use the Context7 MCP to fetch current documentation for any library you will use:

1. Call `mcp__context7__resolve-library-id` with the library name to get the Context7-compatible ID
2. Call `mcp__context7__get-library-docs` with that ID to fetch up-to-date documentation

This is NON-NEGOTIABLE. Do not proceed with any work until you have read the relevant library documentation. This applies to:
- Next.js (App Router, data fetching, routing)
- React and React hooks
- Tailwind CSS and styling libraries
- shadcn/ui components
- Zustand
- Zod validation
- Any third-party library being used or added

**Why:** Library APIs change frequently. Using outdated patterns causes bugs and wasted effort.

Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).
- Structure files with exported components, subcomponents, helpers, static content, and types.
- Favor named exports for components and functions.
- Use lowercase with dashes for directory names (e.g., `components/auth-wizard`).

TypeScript and Zod Usage

- Use TypeScript for all code; prefer interfaces to types for object shapes.
- Utilize Zod for schema validation and type inference.
- Avoid enums; use literal types or maps instead.
- Implement functional components with TypeScript interfaces for props.

Syntax and Formatting

- Use the `function` keyword for pure functions.
- Write declarative JSX with a clear and readable structure.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.

UI and Styling

- Always read [design](../docs/design) when styling UI components and styling.
- Implement responsive design with a responsive-first approach.
- Ensure styling consistency between web and mobile view.

## shadcn/ui Component Library

**MANDATORY:** Use shadcn/ui components as the foundation for all UI elements. shadcn/ui provides accessible, customizable primitives built on Radix UI.

### Installation

Components are installed individually via CLI:
```bash
npx shadcn@latest add button input card alert
```

### Usage Guidelines

- **Always prefer shadcn/ui components** over custom implementations for common UI patterns (Button, Input, Card, Alert, Checkbox, etc.)
- **Customize via variants** - Extend component variants for Klard-specific styles rather than inline styling
- **Use the `cn()` utility** from `@/lib/utils` for conditional class merging
- **Maintain accessibility** - shadcn/ui components are accessible by default; preserve this behavior

### Klard-Specific Variants

Extend shadcn/ui button variants for Klard design system:
```tsx
// Use variant="klard" for primary CTAs
<Button variant="klard" size="lg">Sign In</Button>

// Use variant="social" for OAuth buttons
<Button variant="social">
  <GoogleIcon /> Google
</Button>
```

### Component Customization

When customizing shadcn/ui components:
1. Modify the component file directly in `src/components/ui/`
2. Use CSS variables from Klard design system (HSL format for shadcn compatibility)
3. Extend variants rather than overriding base styles
4. Document any custom variants added

State Management

- Use Zustand for state management.
- Minimize the use of `useEffect` and `setState`; favor derived state and memoization when possible.

Internationalization
- Use i18next and react-i18next for web applications.
- Use expo-localization for React Native apps.
- Ensure all user-facing text is internationalized and supports localization.

Error Handling and Validation

- Prioritize error handling and edge cases.
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deep nesting.
- Utilize guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.
- Use custom error types or factories for consistent error handling.

Performance Optimization

- Optimize for both web and mobile performance.
- Use dynamic imports for code splitting in Next.js.
- Implement lazy loading for non-critical components.
- Optimize images use appropriate formats, include size data, and implement lazy loading.

Monorepo Management

- Follow best practices using Turbo for monorepo setups.
- Ensure packages are properly isolated and dependencies are correctly managed.
- Use shared configurations and scripts where appropriate.
- Utilize the workspace structure as defined in the root `package.json`.

Backend
- Use Zod schemas to validate data exchanged with the backend.

Testing and Quality Assurance

- Write unit and integration tests for critical components.
- Mock all database operations, never make real database calls for all tests written.
- Use testing libraries compatible with React.
- Ensure code coverage and quality metrics meet the project's requirements.

Project Structure and Environment

- Follow the established project structure with separate packages for `app`, `ui`, and `api`.
- Use the `apps` directory for Next.js and Expo applications.
- Utilize the `commons` directory for shared code and components.
- Use `dotenv` for environment variable management.

Key Conventions

- Use descriptive and meaningful commit messages.
- Ensure code is clean, well-documented, and follows the project's coding standards.
- Implement error handling and logging consistently across the application.

Follow Official Documentation

- Always use Context7 MCP (`mcp__context7__resolve-library-id` → `mcp__context7__get-library-docs`) to fetch current documentation before any implementation work.
- For Next.js, use Context7 to fetch docs on data fetching methods and routing conventions.
- For other services, use Context7 to get up-to-date API references.

Output Expectations

- Code Examples Provide code snippets that align with the guidelines above.
- Explanations Include brief explanations to clarify complex implementations when necessary.
- Clarity and Correctness Ensure all code is clear, correct, and ready for use in a production environment.
- Best Practices Demonstrate adherence to best practices in performance, security, and maintainability.

  