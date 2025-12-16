# ClaimFox / Insurfox — React SPA

This project is a Vite + React + TypeScript single-page application scaffold that reproduces the ClaimFox / Insurfox UI using a legacy stylesheet and mock data. It's ready for Netlify deployment.

Quick commands

```bash
npm install
npm run dev
npm run build
```

Files you must provide after generation
- Place your legacy stylesheet at `src/styles/legacy.css` (will be imported globally).
- Unzip your assets into `src/assets/` preserving folder structure.
- Provide translations at `src/i18n/en.json` and `src/i18n/de.json` (example files exist but replace them).

Demo credentials
- exec / exec → ROLE_EXEC
- broker / broker → ROLE_BROKER
- insurer / insurer → ROLE_INSURER

Netlify deploy

1. Build: `npm run build` (produces `dist/`)
2. Upload `dist/` to Netlify (or connect repo and set `npm run build` as build command)
3. In Netlify site settings set domain to `www.claimfox.app`
4. Ensure `_redirects` file in `public/` contains SPA rule (already present):

```
/*  /index.html  200
```

CI/CD (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

Switching to Keycloak later

The project uses an adapter pattern for authentication. By default `LocalAuthAdapter` is active. To switch to Keycloak:

1. Provide Keycloak config in environment variables: `VITE_KEYCLOAK_URL`, `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID`.
2. Update `src/auth/useAuthStore.ts` to initialize `_adapter` with `KeycloakAuthAdapter` (instructions in file).

Notes
- All routes except `/login` are protected by `RequireAuth`.
- Session persistence is in `sessionStorage` via Zustand persist middleware.
