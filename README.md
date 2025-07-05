# 🥾 TidyTrek Frontend

> React app for backpacking gear management with drag-and-drop, real-time updates, and solid testing coverage.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.18-red.svg)](https://tanstack.com/query)

## Overview

A React frontend for managing backpacking gear. Built with TypeScript, TanStack Query for state management, and includes drag-and-drop functionality for organizing pack items. Features a custom component library and comprehensive testing with Vitest and Playwright.

**Live Demo**: [TidyTrek App](https://tidytrek.co/)

## Key Features

### Architecture

- Feature-based organization with components, hooks, and types co-located
- TanStack Query for server state with optimistic updates
- Custom components with migration from Radix Themes to Radix UI primitives
- Code splitting and performance optimizations
- Strict TypeScript configuration

### Tech Stack

**Core**

- React 18 with modern hooks and Suspense
- TypeScript with strict configuration
- Vite for fast development and builds
- TanStack Query for server state management
- React Router v6

**UI & Styling**

- Radix Themes for most components (migrating to Radix UI primitives)
- Custom components: Table, TextField, TextArea with tree-shakable exports
- CSS Modules for scoped styling
- React Beautiful DnD for drag-and-drop
- Chart.js for data visualization

**Development**

- Vitest for unit testing
- Playwright for end-to-end testing
- Storybook for component documentation
- ESLint + Prettier for code quality

## Notable Features

### Drag & Drop with Optimistic Updates

Drag-and-drop reordering for pack items and categories with immediate UI feedback. Uses TanStack Query's optimistic updates to show changes instantly, then syncs with the database. Includes rollback on failure.

### Caching Strategy

TanStack Query setup with hierarchical query keys, automatic cache invalidation, and error handling. Optimizes network requests and keeps the UI responsive.

### Custom Components

Building out custom components with tree-shakable exports, migrating from Radix Themes to Radix UI primitives for better styling control and customization.

```typescript
// Current custom components with tree-shakable exports
export * as TextField from './textfield/textfield';
export * as TextArea from './textarea/textarea';
export * as Table from './table/table';

// Usage: <TextField.Root><TextField.Input /></TextField.Root>
```

### Performance Optimizations

```typescript
// Manual chunk splitting for optimal loading
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'vendor-react': ['react', 'react-dom', 'react-router-dom'],
					'vendor-ui': ['@radix-ui/themes', '@radix-ui/react-form'],
					'vendor-query': ['@tanstack/react-query'],
					'vendor-chart': ['chart.js', 'react-chartjs-2'],
					'vendor-dnd': ['react-beautiful-dnd'],
				},
			},
		},
	},
});
```

## Testing

**Unit Tests** (Vitest + Testing Library)

- Component and hook testing
- Query/mutation testing with mocks
- Form validation and error handling

**End-to-End Tests** (Playwright)

- Full user workflows including auth, CRUD operations, and drag-and-drop
- Cross-browser testing
- Real database interactions

**Documentation**

- Storybook for component examples
- TypeScript for self-documenting code

## Development Patterns

### Custom Hooks

Custom hooks for form handling, table interactions, and validation. Includes error handling and optimized re-rendering.

### Error Boundaries

Error handling with recovery mechanisms and retry logic for failed operations.

### Form Validation

Type-safe validation with Zod schemas, real-time feedback, and error messaging.

## Performance

### Code Splitting

Feature-based lazy loading with manual chunk splitting. Custom loading states to improve user experience.

### Optimizations

Memoization for table components to prevent unnecessary re-renders during drag operations.

## Security

### Authentication

Supabase authentication with session management, route protection, and Google OAuth integration.

## Bundle Optimization

Code splitting strategy:

- Core React and routing
- UI components (Radix UI)
- Data fetching (TanStack Query)
- Feature-specific chunks (lazy loaded)

## CI/CD & Deployment

### GitHub Actions Workflows

**Unit Testing Pipeline** (`unit-test.yml`)

- Runs on all pushes to main and pull requests
- Node.js 20 with npm caching
- Vitest unit tests

**Deployment Pipeline** (`deploy.yml`)

- Triggered on main branch pushes
- TypeScript compilation and Vite build
- AWS S3 deployment with CloudFront invalidation

### AWS Infrastructure

**S3 + CloudFront Hosting**

- Static site hosting via S3 bucket
- CloudFront CDN for global distribution
- Automatic cache invalidation on deployments

## Technical Challenges

### Complex State Management

**Challenge**: Managing hierarchical pack data with real-time updates, optimistic mutations, and error rollback across drag-and-drop operations.

**Solution**: Implemented hierarchical TanStack Query keys with selective cache invalidation. Custom hooks abstract optimistic update patterns with automatic rollback on failure.

### Performance at Scale

**Challenge**: Table rendering performance with 100+ pack items during drag operations.

**Solution**: Memoized table components and manual chunk splitting. Lazy loading for feature-specific code.

### Component Library Migration

**Challenge**: Migrating from Radix Themes to Radix UI primitives while maintaining design consistency and accessibility.

**Solution**: Gradual migration with tree-shakable exports, CSS Modules for style isolation, and comprehensive testing.

## Architecture Decisions

### TanStack Query Over Redux

**Why**: Automatic caching, optimistic updates, background refetching, and excellent TypeScript support. Eliminates boilerplate and provides better developer experience for server state management.

**Trade-offs**: Less control over client-side state, but significantly reduced complexity for API interactions.

### Radix Themes → Radix UI Migration

**Why**: Started with Radix Themes for rapid prototyping, migrating to Radix UI primitives for better customization and styling control without losing accessibility.

**Trade-offs**: More implementation work, but greater design flexibility and smaller bundle size.

## Production Considerations

### Authentication & Security

- Supabase authentication with session management
- Google OAuth integration
- Error boundaries for graceful failure handling

### Deployment & Performance

- CDN distribution via CloudFront
- Optimized bundle splitting for fast initial loads
- Progressive loading strategies

---

**Author**: Ryan Brockhoff  
**Email**: ryanbrockhoff@protonmail.com
**Website**: [Developer Website](https://ryanbrockhoff.com/)
