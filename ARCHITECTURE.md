# Architecture

## Current implementation

- `src/main.tsx` mounts the React application, restores Supabase Auth sessions, and chooses between the sign-in flow and dashboard.
- `src/lib/supabase.ts` creates the browser client only when public Supabase configuration is valid.
- `src/pages/AuthPage.tsx` implements email/password registration, login, reset, and password recovery.
- `src/App.tsx` owns the current dashboard shell and demonstration data.
- `src/index.css` contains Tailwind directives, semantic UI styles, and responsive layouts.
- `index.html`, `vite.config.ts`, and the TypeScript/Tailwind/PostCSS config form the Vite build foundation.
- `package.json` defines the React, TypeScript, Vite, and Tailwind toolchain. Keep the npm lockfile in version control for reproducible installs.
- `supabase/migrations/` contains the initial database schema, signup trigger, and tenant RLS policies.

The dashboard's displayed analytics, assistant health, and customer conversations do not connect to a backend. Mock interactions are not real records. Authentication screens and RLS policies are implemented, but they are not usable until a Supabase project is configured and the migration is applied. Treat RLS as the data authorization boundary; hiding a page in the browser is not access control.

## Planned boundaries

1. **Browser app:** React pages and forms; public Supabase URL and anon key only. Never trust the browser for authorization or usage enforcement.
2. **Supabase Auth + PostgreSQL:** Authenticated identity plus profile, workspace, and membership tables are defined in the initial migration. Future tenant-owned business, knowledge, customer, conversation, and message tables must use explicit workspace relationships and RLS policies.
3. **Trusted AI endpoint:** Supabase Edge Function (or equivalent server-side endpoint) validates the user/session, rate-limits requests, retrieves only authorized business context, invokes a replaceable AI provider adapter, and persists the exchange safely. Gemini credentials remain in server-side secret storage.
4. **Subscription readiness:** Server-side plan entitlements and usage accounting before any payment integration.

## Data-safety principles

- Derive tenant identity from the authenticated session and verified database relationships, never a caller-supplied tenant ID alone.
- Use least privilege, input validation, bounded context, safe errors, and explicit unknown-answer behavior.
- Keep secrets out of source control and browser bundles.
- Do not claim secure multi-tenancy until RLS policies and cross-tenant access tests are implemented and pass.
- The initial migration creates workspaces on signup and prevents members from reading unrelated workspaces. Add RLS and cross-tenant tests for every future tenant-owned table.
