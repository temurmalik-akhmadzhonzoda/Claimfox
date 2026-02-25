#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/4] Build check"
npm run build >/tmp/predeploy-build.log 2>&1 || {
  echo "Build failed. Last lines:"
  tail -n 80 /tmp/predeploy-build.log
  exit 1
}

echo "[2/4] Netlify config check"
if [[ ! -f "netlify.toml" ]]; then
  echo "Missing netlify.toml"
  exit 1
fi

if ! rg -q "from = \"/\*\"" netlify.toml || ! rg -q "to = \"/index.html\"" netlify.toml; then
  echo "netlify.toml is missing SPA fallback rule (/* -> /index.html)"
  exit 1
fi

if rg -q "from = \"/\.netlify/" netlify.toml; then
  echo "Invalid redirect source '/.netlify/*' found in netlify.toml"
  exit 1
fi

if [[ -f "public/_redirects" ]]; then
  if ! rg -q "^/\* /index\.html 200$" public/_redirects; then
    echo "public/_redirects missing canonical SPA fallback: '/* /index.html 200'"
    exit 1
  fi

  if rg -q "^/\.netlify/" public/_redirects; then
    echo "Invalid redirect source '/.netlify/*' found in public/_redirects"
    exit 1
  fi
fi

echo "[3/4] Auth runtime check (static sanity)"
if [[ ! -f "netlify/functions/auth-config.js" ]]; then
  echo "Missing netlify/functions/auth-config.js"
  exit 1
fi

if ! rg -q "AUTH0_DOMAIN" netlify/functions/auth-config.js || ! rg -q "AUTH0_CLIENT_ID" netlify/functions/auth-config.js; then
  echo "auth-config.js does not reference required AUTH0 env vars"
  exit 1
fi

echo "[4/4] Checklist file present"
if [[ ! -f "DEPLOY_CHECKLIST.md" ]]; then
  echo "Missing DEPLOY_CHECKLIST.md"
  exit 1
fi

echo "Predeploy check passed."
