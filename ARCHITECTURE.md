# Architecture

## Current implementation

- `src/main.tsx` mounts the React application.
- `src/App.tsx` owns the current dashboard shell and demonstration data.
- `src/index.css` contains Tailwind directives, semantic UI styles, and responsive layouts.
- `index.html`, `vite.config.ts`, and the TypeScript/Tailwind/PostCSS config form the Vite build foundation.

The current UI is a single-page visual foundation. Its navigation, displayed analytics, assistant health, and customer conversations do not connect to a backend. Mock interactions are not real records.

## Planned boundaries

1. **Browser app:** React pages and forms; public Supabase URL and anon key only. Never trust the browser for authorization or usage enforcement.
2. **Supabase Auth + PostgreSQL:** Identity and tenant-owned business, knowledge, customer, conversation, and message records. Every tenant-owned table must use explicit ownership relationships and RLS policies.
3. **Trusted AI endpoint:** Supabase Edge Function (or equivalent server-side endpoint) validates the user/session, rate-limits requests, retrieves only authorized business context, invokes a replaceable AI provider adapter, and persists the exchange safely. Gemini credentials remain in server-side secret storage.
4. **Subscription readiness:** Server-side plan entitlements and usage accounting before any payment integration.

## Data-safety principles

- Derive tenant identity from the authenticated session and verified database relationships, never a caller-supplied tenant ID alone.
- Use least privilege, input validation, bounded context, safe errors, and explicit unknown-answer behavior.
- Keep secrets out of source control and browser bundles.
- Do not claim secure multi-tenancy until RLS policies and cross-tenant access tests are implemented and pass.
