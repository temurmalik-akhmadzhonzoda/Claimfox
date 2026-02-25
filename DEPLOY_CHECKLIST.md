# Deploy Checklist (Production Safety)

## Before push to `main`
1. Run `npm run predeploy:check`.
2. Verify `netlify.toml` contains only safe fallback redirect (`/* -> /index.html 200`) unless intentionally changed.
3. Verify `public/_redirects` contains `/* /index.html 200` and no `/.netlify/...` redirect sources.
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

## After deploy (smoke test)
1. Open `/` and `/login`.
2. Open `/.netlify/functions/auth-config` and verify `ok: true`.
3. Open `/signup` and confirm redirect to Auth0 works.
4. Complete login and confirm callback `/auth/callback` returns to app.
5. Test new user without role:
   - redirected to `/access-request`
   - no sensitive pages visible.
6. Test admin flow:
   - `/admin` loads users
   - role assignment works.

## Rollback plan
1. Netlify: publish previous successful deploy immediately.
2. Git: revert offending commit(s) on `main`.
3. Re-run `npm run predeploy:check` before redeploy.
