# Roadmap

The work is intentionally incremental; phases are not considered complete until implemented and verified.

- [x] **Phase 1 — Foundation (initial UI only):** React/TypeScript/Vite scaffold, Tailwind setup, responsive dashboard shell and shared visual language. Verify the foundation with `npm run build`.
- [x] **Phase 2 — Authentication foundation:** Supabase registration, login, recovery, session handling, workspace bootstrap migration, and RLS policies are implemented locally.
- [ ] **Phase 2 verification:** Configure the hosted Supabase project, apply the migration, and test email redirects plus unauthenticated and cross-tenant access.
- [ ] **Phase 3 — Dashboard data:** Replace mock metrics/activity with tenant-scoped, real data and empty/loading/error states.
- [ ] **Phase 4 — Knowledge base:** Tenant-scoped PostgreSQL schema, RLS, products, FAQs, and business information CRUD.
- [ ] **Phase 5 — AI integration:** Server-side Gemini adapter, approved-context retrieval, safe fallback, conversation persistence, and abuse controls.
- [ ] **Phase 6 — Customer management:** Minimize customer data; add access-controlled customer and inquiry workflows.
- [ ] **Phase 7 — Subscription preparation:** Plans, entitlements, usage accounting and tested access controls. No real payments until these controls are ready.
- [ ] **Phase 8 — Testing and deployment:** RLS/authorization tests, functional and responsive checks, production build, deployment configuration and operational review.

Next recommended task: configure a Supabase development project, then implement the authentication phase with RLS-first tenant ownership. Do not use real customer data until access boundaries have been tested.
