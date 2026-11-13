# Security

## Current security status

This repository is currently a frontend-only visual scaffold. It has no authentication, backend, database, AI endpoint, rate limiting, or access-control tests. Dashboard values and conversation records are mock content. It is not production-ready and must not be used with real customer data.

## Required before customer use

- Keep Gemini credentials exclusively in server/edge-function secret storage. Never use `VITE_GEMINI_API_KEY` or commit secrets.
- Configure Supabase Auth and enable RLS for every tenant-owned table before exposing data access.
- Test denied unauthenticated access, cross-tenant reads/writes, privilege escalation, and revoked sessions.
- Validate and bound all server-side inputs; add endpoint rate limits and safe error responses.
- Minimize customer data collection and retention; avoid logging sensitive message contents unnecessarily.
- Apply authorization and plan entitlements on trusted server/database boundaries, not only in the UI.
- Review dependency updates, deployment headers, backups, incident response, and applicable privacy obligations before launch.

`.env.example` contains only placeholder Supabase browser configuration. Public anon keys are not service-role secrets; protect data with RLS. Do not add a service role key or Gemini key to client-side environment variables.
