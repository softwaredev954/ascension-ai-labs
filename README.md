# Ascension AI Labs — AI Business Assistant

A React + TypeScript SaaS starter for a business-focused AI customer assistant. The repository contains a responsive dashboard, Supabase email/password authentication, and a first tenant/workspace schema with RLS. Dashboard numbers and conversations are still illustrative UI data; live analytics, AI, and customer operations are not implemented yet.

## Technology

- React 19, TypeScript, Vite 6
- Tailwind CSS 3 (with a small amount of custom CSS for the dashboard's chart and responsive layout)
- Supabase JavaScript client for browser authentication. The hosted project URL and public anon key are configured locally by the developer.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

1. Clone this repository and enter its folder.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local URL printed by Vite.
5. Verify a production bundle with `npm run build`.

Keep `package-lock.json` committed so local installs and deployments use reproducible dependency versions.

## Current foundation

- Responsive dashboard layout with sidebar navigation on desktop and a mobile drawer.
- Dashboard overview, illustrative business metrics, activity visualization, assistant health, and recent interaction list.
- Client-side conversation search filters the sample rows.
- Keyboard-visible browser-native controls and reduced-motion support.
- Email/password sign-up, sign-in, email confirmation, password reset and sign-out.
- New accounts receive a private workspace through a database trigger. Workspace and profile tables have RLS policies in the initial migration.

Navigation labels are a design foundation, not completed modules. Metrics and sample customer names/messages are mock data and must not be used as real business or customer records.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for staged implementation and [ARCHITECTURE.md](ARCHITECTURE.md) for planned system boundaries. Security constraints and current limitations are in [SECURITY.md](SECURITY.md).

## Connect Supabase

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/migrations/20261113000000_initial_tenant_auth.sql`](supabase/migrations/20261113000000_initial_tenant_auth.sql).
3. Copy `.env.example` to `.env.local`; set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the project URL and public anon/publishable key from Supabase. Never use the service-role key in the browser.
4. In Supabase Auth URL Configuration, set the local site URL to `http://localhost:5173` and add your local and production app URLs to the redirect allow list.
5. Run `npm run dev`, create a test account, and confirm the email if email confirmation is enabled.

The migration creates profiles, workspaces, and workspace membership with restrictive RLS. It does not configure your hosted Supabase project, verify deployment URLs, or replace testing access policies against that project. Do not use real customer data until those checks pass.

## Early test deployment on Railway

This deploys the Vite frontend only. Supabase remains a separate service, and `vite preview` is suitable for an early test deployment—not a production static hosting strategy.

1. Commit and push the app, `package.json`, and `package-lock.json` to GitHub. Railway can only deploy code that has been pushed.
2. In Railway, choose **New Project → Deploy from GitHub repo**, authorize GitHub if prompted, and select this repository and branch.
3. Open the service's **Settings → Build** and set the build command to `npm run build`. In **Settings → Deploy**, set the start command to `npm run preview -- --host 0.0.0.0 --port $PORT`. Keep the repository root as the service root.
4. In the service's **Variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's API settings. These public values must be present at build time; redeploy after changing them. Do not add a service-role key or a Gemini key.
5. In **Settings → Networking**, generate a Railway domain. Add its exact HTTPS origin (for example, `https://your-app.up.railway.app`) to Supabase Auth's allowed redirect URLs. Set the Supabase Site URL to that domain. Keep `http://localhost:5173` allowed for local development.
6. Deploy, open the Railway domain, and test registration, email confirmation, sign-in, password reset, and sign-out. Check Railway's deployment logs if the build or server fails.

The Supabase migration must be applied before sign-up can create a workspace. Test with non-customer accounts first; do not treat a successful frontend deployment as proof that tenant access policies have been tested.

## Environment variables

`.env.local` is ignored by Git. Supabase URL and anon/publishable key are intended for the browser; RLS is the security boundary. Do not put a Supabase service-role key or Gemini API credentials in a `VITE_*` variable. Gemini calls must be made from a trusted server/edge function.

## Verification

Run `npm run build` to type-check the app and create a production bundle. A passing build does not verify a hosted Supabase configuration or the migration's policies against real database roles.
