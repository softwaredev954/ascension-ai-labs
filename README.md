# Ascension AI Labs — AI Business Assistant

A React + TypeScript SaaS starter for a business-focused AI customer assistant. The current repository contains **Phase 1 foundation work only**: a responsive dashboard shell and design system. Dashboard numbers and conversations are illustrative UI data; authentication, persistence, real AI, and customer operations are not implemented yet.

## Technology

- React 19, TypeScript, Vite 6
- Tailwind CSS 3 (with a small amount of custom CSS for the dashboard's chart and responsive layout)
- Supabase is planned; no Supabase client or credentials are wired up yet.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

1. Clone this repository and enter its folder.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local URL printed by Vite.
5. Verify a production bundle with `npm run build`.

There is no lockfile yet. Commit the `package-lock.json` produced by `npm install` so deployments use reproducible dependency versions.

## Current foundation

- Responsive dashboard layout with sidebar navigation on desktop and a mobile drawer.
- Dashboard overview, illustrative business metrics, activity visualization, assistant health, and recent interaction list.
- Client-side conversation search filters the sample rows.
- Keyboard-visible browser-native controls and reduced-motion support.

Navigation labels are a design foundation, not completed modules. Metrics and sample customer names/messages are mock data and must not be used as real business or customer records.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for staged implementation and [ARCHITECTURE.md](ARCHITECTURE.md) for planned system boundaries. Security constraints and current limitations are in [SECURITY.md](SECURITY.md).

## Environment variables

Copy `.env.example` to `.env.local` only when wiring Supabase in a later phase. Do not put Gemini API credentials in a `VITE_*` variable: Vite exposes those variables to browser code. Gemini calls must be made from a trusted server/edge function.

## Verification status

The source was added to GitHub, but this environment does not provide a Node.js shell, so `npm install` and `npm run build` have **not** been run here. Please run the commands above locally and share any output if a correction is needed. No production-readiness or security-test claim is made.
