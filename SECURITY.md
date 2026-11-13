# Security

## Current security status

The repository includes Supabase email/password authentication code and an initial SQL migration for profiles, workspaces, memberships, and RLS. These are not active until a developer configures a Supabase project and applies the migration. Dashboard values and conversation records remain mock content. The project is not production-ready and must not be used with real customer data.

## Required before customer use

- Keep Gemini credentials exclusively in server/edge-function secret storage. Never use `VITE_GEMINI_API_KEY` or commit secrets.
- Configure Supabase Auth, apply the initial migration, verify email/redirect settings, and test unauthenticated and cross-tenant access before exposing real data.
- Test denied unauthenticated access, cross-tenant reads/writes, privilege escalation, and revoked sessions.
- Validate and bound all server-side inputs; add endpoint rate limits and safe error responses.
- Minimize customer data collection and retention; avoid logging sensitive message contents unnecessarily.
- Apply authorization and plan entitlements on trusted server/database boundaries, not only in the UI.
- Review dependency updates, deployment headers, backups, incident response, and applicable privacy obligations before launch.

`.env.example` contains only placeholder Supabase browser configuration. Public anon/publishable keys are not service-role secrets; protect data with RLS. Do not add a service role key or Gemini key to client-side environment variables.
