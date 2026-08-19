#!/usr/bin/env bash
# One-time cleanup + install. Run from the repo root:  bash finish-setup.sh
set -e
cd "$(dirname "$0")"

echo "→ clearing the leftover git lock (the sandbox mount couldn't remove it)"
rm -f .git/index.lock

echo "→ removing retired files"
rm -rf _to_delete

echo "→ reinstalling dependencies (supabase out, motion + fontsource in)"
rm -rf node_modules
npm install

echo "→ verifying the build"
npm run build

echo
echo "Done. Start the dev server with:  npm run dev"
echo "Then review and commit:"
echo "    git add -A"
echo "    git commit -m 'Rebuild as a personal portfolio site'"
echo "    git push"
rm -f finish-setup.sh
