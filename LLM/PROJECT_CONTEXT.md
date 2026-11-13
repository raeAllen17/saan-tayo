# PROJECT_CONTEXT

This folder is the single source of truth that any AI assistant or LLM should read before writing or changing code in this repository. Read this file first, then follow the architecture and conventions below.

## 1. Project overview

A local food discovery platform for people who can't decide where to eat. Diners browse real restaurant menus from restaurants in their city and pick based on what looks good. Restaurants onboard so their menus can be found, either by entering the menu themselves or by having our team enter it for them. We are starting in one small city and want most local restaurants listed so the catalog feels complete. It is a multi-tenant SaaS.

## 2. Current phase (Phase 1)

Get restaurant menus (categories, items, descriptions, prices, images) into the system and publish them on public, mobile-friendly pages.

Out of scope for now:

- Online ordering
- Payments
- Reviews
- "Help me decide" features
- Multi-city expansion

## 3. Tech stack

- Backend: C# ASP.NET Core API on .NET 8+, EF Core, PostgreSQL (use JSONB for flexible fields like modifiers and dietary tags)
- Public diner site: Next.js (TypeScript), server-side rendered for SEO and fast mobile loads
- Dashboard (restaurants and our internal admin): React + TypeScript with Vite
- Images: S3-compatible object storage (Cloudflare R2), with resizing/optimization before serving
- Auth: TBD (ASP.NET Core Identity or an external provider)
- Styling: Tailwind CSS + shadcn/ui

## 4. Architecture

- Modular monolith: ONE backend API, ONE database. This is not a microservices architecture. Do not split into separate services.
- The API serves both frontends through separate endpoint groups (public vs. dashboard/admin).
- Frontends talk to the API over HTTP only. They never access the database directly.
- Backend code is organized into modules with clear boundaries: Restaurants, Menus, Media, Identity. Modules interact through defined interfaces, not by reaching into each other's internals.
- Multi-tenancy: every restaurant-owned record carries a `RestaurantId`. Enforce tenant isolation in the backend (e.g., EF Core global query filters). A restaurant must never read or edit another restaurant's data.
- Data shape: restaurant -> menu -> category -> item -> options/modifiers.

## 5. Repository structure

Monorepo with sibling folders, each deployed separately:

```
/api          C# ASP.NET Core API
/web          Next.js public diner site
/dashboard    React + Vite dashboard (restaurant + admin)
/LLM          AI/LLM reference docs (this folder)
/docs         Human-facing documentation
docker-compose.yml   Local Postgres and dev services
```

Each app has its own build and is deployed independently. Local run instructions: TBD (add per-app commands once each app is scaffolded).

## 6. Code conventions (KISS)

The guiding principle is KISS: Keep It Simple, Stupid. Always choose the simplest solution that works.

General rules:

- Write the simplest code that solves the problem. No clever tricks, no premature abstraction or optimization. *(proposed)*
- Keep functions and modules small and focused. Favor readability over cleverness. *(proposed)*
- Do not add a dependency unless it clearly removes more complexity than it introduces. *(proposed)*
- Prefer explicit, boring, obvious code over implicit magic. *(proposed)*
- Prefer duplication over the wrong abstraction; refactor only when the pattern is proven. *(proposed)*
