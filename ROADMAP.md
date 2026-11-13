# Roadmap

The work is intentionally incremental; phases are not considered complete until implemented and verified.

- [x] **Phase 1 — Foundation (initial UI only):** React/TypeScript/Vite scaffold, Tailwind setup, responsive dashboard shell and shared visual language. Local build still needs verification.
- [ ] **Phase 2 — Authentication:** Supabase project/configuration, registration, login, recovery, session handling, and protected routes.
- [ ] **Phase 3 — Dashboard data:** Replace mock metrics/activity with tenant-scoped, real data and empty/loading/error states.
- [ ] **Phase 4 — Knowledge base:** Tenant-scoped PostgreSQL schema, RLS, products, FAQs, and business information CRUD.
- [ ] **Phase 5 — AI integration:** Server-side Gemini adapter, approved-context retrieval, safe fallback, conversation persistence, and abuse controls.
- [ ] **Phase 6 — Customer management:** Minimize customer data; add access-controlled customer and inquiry workflows.
- [ ] **Phase 7 — Subscription preparation:** Plans, entitlements, usage accounting and tested access controls. No real payments until these controls are ready.
- [ ] **Phase 8 — Testing and deployment:** RLS/authorization tests, functional and responsive checks, production build, deployment configuration and operational review.

Next recommended task: configure a Supabase development project, then implement the authentication phase with RLS-first tenant ownership. Do not use real customer data until access boundaries have been tested.
