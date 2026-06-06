#!/usr/bin/env bash
# build.sh — nb-quartz local build wrapper
#
# 1. Optimise images from content/images/ → image-cache/ (notebook is read-only)
# 2. Run quartz build (pass-through args: --serve, --concurrency, etc.)
# 3. Copy cached WebP variants into public/images/
#
# Usage:
#   ./build.sh            # full build
#   ./build.sh --serve    # build + dev server (image cache populated once at start)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Activate nvm node 22+ if the shell doesn't already have it
if ! command -v node &>/dev/null || \
   (( $(node --version 2>/dev/null | sed 's/v//' | cut -d. -f1) < 22 )); then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  [[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh"
  command -v nvm &>/dev/null && nvm use 22 --silent 2>/dev/null || true
fi

cd "$SCRIPT_DIR"

# ── Step 1: optimise images ───────────────────────────────────────────────────

if [[ -d "content/images" ]]; then
  echo "→ Optimising images..."
  node scripts/optimize-images.mjs
else
  echo "→ No content/images/ directory — skipping image optimisation"
fi

# ── Step 2: quartz build ──────────────────────────────────────────────────────

echo "→ Building site..."
npx quartz build "$@"

# ── Step 3: copy WebP cache into public/images/ ───────────────────────────────

if [[ -d "image-cache" ]] && [[ "$(ls -A image-cache 2>/dev/null)" ]]; then
  echo "→ Copying optimised images to public/images/..."
  mkdir -p public/images
  cp image-cache/* public/images/
fi
