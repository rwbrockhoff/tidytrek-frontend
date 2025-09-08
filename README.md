# 🥾 TidyTrek Frontend

## Overview

React frontend for managing backpacking gear with drag-and-drop pack organization, real-time updates, and comprehensive testing. Users can create gear closets, build packs with categories, and share public pack lists.

**Live Demo**: [TidyTrek App](https://tidytrek.co/)

## Related Repos

- **[Backend](https://github.com/rwbrockhoff/tidytrek-backend)** - Node.js API
- **[Landing](https://github.com/rwbrockhoff/tt-landing)** - Marketing site

## Tech Stack

**Core**: React, TypeScript (strict mode), TanStack Query, Vite  
**UI**: Radix UI (migrating from Radix Themes), CSS Modules, dnd-kit  
**Data**: Chart.js for weight visualization  
**Auth**: Supabase with Google OAuth  
**Payments**: Stripe subscription management (Pro/Free tiers)  
**Testing**: Vitest (unit) + Playwright (e2e)  
**Deployment**: AWS S3 + CloudFront, GitHub Actions CI/CD

## Key Features

### Drag & Drop with Cache Updates

Drag-and-drop reordering for pack items and categories. Updates cache with fractional indexing, and falls back to full refetch when API rebalances indexes.

### Custom Component Library

Building custom components with migration from Radix Themes to Radix UI primitives for better customization and bundle optimization.

### Authentication & Security

- Supabase authentication with session management and route protection
- Google OAuth integration
- Secure cookie handling for cross-domain auth detection

### Development & Deployment

- Feature-based code splitting and bundle optimization
- Comprehensive unit and e2e test coverage
- Automated deployments with CloudFront cache invalidation
- Storybook component documentation

---

**Author**: Ryan Brockhoff  
**Email**: ryanbrockhoff@protonmail.com
**Website**: [Developer Website](https://ryanbrockhoff.com/)
