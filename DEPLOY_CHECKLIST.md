# Deploy Checklist (Production Safety)

## Before push to `main`
1. Run `npm run predeploy:check`.
2. Verify `netlify.toml` contains the canonical redirects (`/api/* -> /.netlify/functions/:splat`, `/* -> /index.html 200`).
3. Ensure there is no `public/_redirects` and no `_netlify.toml` (single source of truth: `netlify.toml`).
4. Confirm auth env vars exist in Netlify (Production context):
   - `AUTH0_DOMAIN`
   - `AUTH0_CLIENT_ID`
   - `AUTH0_ISSUER`
   - `AUTH0_AUDIENCE`
   - `SITE_ORIGIN`
5. For admin role assignment, confirm Management API vars exist:
   - `AUTH0_MGMT_CLIENT_ID`
   - `AUTH0_MGMT_CLIENT_SECRET`
   - `AUTH0_MGMT_AUDIENCE`
   - `AUTH0_MGMT_DOMAIN`
6. Optional bootstrap admin (first access control owner):
   - `AUTH_BOOTSTRAP_ADMIN_EMAIL` (single mail) or
   - `AUTH_BOOTSTRAP_ADMIN_EMAILS` (comma-separated list)

## After deploy (smoke test)
1. Open `/` and `/login`.
2. Open `/api/health` and verify `ok: true` and expected host.
3. Open `/.netlify/functions/auth-config` and verify `ok: true`.
4. Open `/auth/call` and verify it resolves to callback page (legacy-safe alias).
5. Open `/signup` and confirm redirect to Auth0 works.
6. Complete login and confirm callback `/auth/callback` returns to app.
7. Test new user without role:
   - redirected to `/access-request`
   - no sensitive pages visible.
8. Test admin flow:
   - `/admin` loads users
   - role assignment works.

## Rollback plan
1. Netlify: publish previous successful deploy immediately.
2. Git: revert offending commit(s) on `main`.
3. Re-run `npm run predeploy:check` before redeploy.
