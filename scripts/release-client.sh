#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# release-client.sh — bump client version, build Tauri macOS/iOS, upload
#
# Usage:
#   ./scripts/release-client.sh --patch
#   ./scripts/release-client.sh --minor --target macos
#   ./scripts/release-client.sh --major --target ios --apple-id you@example.com
#   ./scripts/release-client.sh --patch --skip-build
# ──────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CLIENT_DIR="$ROOT_DIR/apps/client"

CLIENT_PKG="$CLIENT_DIR/package.json"
TAURI_CONF="$CLIENT_DIR/src-tauri/tauri.conf.json"
CARGO_TOML="$CLIENT_DIR/src-tauri/Cargo.toml"

BUMP=""
TARGET="all"          # macos | ios | all
SKIP_BUILD=false

# Apple credentials — flags take precedence over env vars
APPLE_ID="${APPLE_ID:-}"
APPLE_APP_PASSWORD="${APPLE_APP_PASSWORD:-}"
APPLE_TEAM_ID="${APPLE_TEAM_ID:-}"

# ── Helpers ───────────────────────────────────────────────────

usage() {
  cat <<EOF
Usage: $(basename "$0") [--major | --minor | --patch] [OPTIONS]

SemVer bump (exactly one required):
  --major              Bump major version (X.0.0)
  --minor              Bump minor version (x.Y.0)
  --patch              Bump patch version (x.y.Z)

Build target:
  --target TARGET      macos | ios | all (default: all)
  --skip-build         Bump version and commit only, skip build & upload

Apple upload credentials (or set via env vars APPLE_ID, APPLE_APP_PASSWORD, APPLE_TEAM_ID):
  --apple-id EMAIL     Apple ID for notarytool / altool
  --app-password PASS  App-specific password
  --team-id ID         Apple Developer Team ID

  -h, --help           Show this help message
EOF
  exit 1
}

die() { echo "ERROR: $*" >&2; exit 1; }

bump_semver() {
  local version="$1" part="$2"
  local major minor patch
  IFS='.' read -r major minor patch <<< "$version"
  case "$part" in
    major) echo "$(( major + 1 )).0.0" ;;
    minor) echo "${major}.$(( minor + 1 )).0" ;;
    patch) echo "${major}.${minor}.$(( patch + 1 ))" ;;
  esac
}

get_version() {
  grep '"version"' "$1" | head -1 | sed 's/.*"version": *"\([^"]*\)".*/\1/'
}

set_json_version() {
  local file="$1" new_version="$2"
  local tmp
  tmp=$(mktemp)
  sed "s/\"version\": *\"[^\"]*\"/\"version\": \"${new_version}\"/" "$file" > "$tmp"
  mv "$tmp" "$file"
}

set_cargo_version() {
  local file="$1" new_version="$2"
  local tmp
  tmp=$(mktemp)
  # Only replace the version line in the [package] section (first occurrence)
  awk -v nv="$new_version" '
    !done && /^version *= *"/ {
      sub(/"[^"]*"/, "\"" nv "\"")
      done = 1
    }
    { print }
  ' "$file" > "$tmp"
  mv "$tmp" "$file"
}

require_apple_creds() {
  [[ -n "$APPLE_ID" ]]           || die "Missing --apple-id (or APPLE_ID env var)"
  [[ -n "$APPLE_APP_PASSWORD" ]] || die "Missing --app-password (or APPLE_APP_PASSWORD env var)"
  [[ -n "$APPLE_TEAM_ID" ]]      || die "Missing --team-id (or APPLE_TEAM_ID env var)"
}

# ── Parse args ────────────────────────────────────────────────

while [[ $# -gt 0 ]]; do
  case "$1" in
    --major)        BUMP="major"; shift ;;
    --minor)        BUMP="minor"; shift ;;
    --patch)        BUMP="patch"; shift ;;
    --target)       TARGET="$2"; shift 2 ;;
    --skip-build)   SKIP_BUILD=true; shift ;;
    --apple-id)     APPLE_ID="$2"; shift 2 ;;
    --app-password) APPLE_APP_PASSWORD="$2"; shift 2 ;;
    --team-id)      APPLE_TEAM_ID="$2"; shift 2 ;;
    -h|--help)      usage ;;
    *)              die "Unknown argument: $1" ;;
  esac
done

[[ -n "$BUMP" ]]                                 || die "Specify one of --major, --minor, or --patch"
[[ "$TARGET" =~ ^(macos|ios|all)$ ]]             || die "Invalid --target: $TARGET (must be macos, ios, or all)"
[[ -f "$CLIENT_PKG" ]]                           || die "Cannot find $CLIENT_PKG — run from repo root"

# ── Version bump ──────────────────────────────────────────────

CURRENT_VERSION=$(get_version "$CLIENT_PKG")
NEW_VERSION=$(bump_semver "$CURRENT_VERSION" "$BUMP")

echo "==> Client version: $CURRENT_VERSION → $NEW_VERSION ($BUMP bump)"

set_json_version "$CLIENT_PKG"  "$NEW_VERSION"
echo "    Updated apps/client/package.json"

set_json_version "$TAURI_CONF"  "$NEW_VERSION"
echo "    Updated apps/client/src-tauri/tauri.conf.json"

set_cargo_version "$CARGO_TOML" "$NEW_VERSION"
echo "    Updated apps/client/src-tauri/Cargo.toml"

# ── Git commit + tag ──────────────────────────────────────────

cd "$ROOT_DIR"
git add \
  apps/client/package.json \
  apps/client/src-tauri/tauri.conf.json \
  apps/client/src-tauri/Cargo.toml

git commit -m "chore(client): release v${NEW_VERSION}"
git tag "client/v${NEW_VERSION}"

echo "==> Created commit and tag client/v${NEW_VERSION}"

if [[ "$SKIP_BUILD" == true ]]; then
  echo "==> Skipping build (--skip-build)"
  echo ""
  echo "Done. Don't forget to push the git tag:"
  echo "  git push origin main --tags"
  echo ""
  echo "Pushing the tag will trigger the client-release CI workflow,"
  echo "which builds unsigned binaries for Linux, Windows, and macOS"
  echo "and publishes them as a GitHub Release."
  exit 0
fi

# ── macOS build ───────────────────────────────────────────────

build_macos() {
  echo ""
  echo "==> Building macOS app..."

  cd "$CLIENT_DIR"
  bun run tauri build

  # Locate the built .dmg
  DMG=$(find src-tauri/target/release/bundle/dmg -name '*.dmg' 2>/dev/null | head -1)
  if [[ -z "$DMG" ]]; then
    die "macOS build succeeded but no .dmg found in src-tauri/target/release/bundle/dmg/"
  fi
  echo "    Built: $DMG"

  # Notarize
  if [[ -n "$APPLE_ID" && -n "$APPLE_APP_PASSWORD" && -n "$APPLE_TEAM_ID" ]]; then
    echo "==> Notarizing macOS .dmg..."
    xcrun notarytool submit "$DMG" \
      --apple-id "$APPLE_ID" \
      --password "$APPLE_APP_PASSWORD" \
      --team-id "$APPLE_TEAM_ID" \
      --wait

    echo "==> Stapling notarization ticket..."
    xcrun stapler staple "$DMG"
    echo "    Notarized and stapled: $DMG"
  else
    echo "    Skipping notarization (Apple credentials not provided)"
  fi
}

# ── iOS build ─────────────────────────────────────────────────

build_ios() {
  echo ""
  echo "==> Building iOS app..."

  require_apple_creds

  cd "$CLIENT_DIR"
  bun run tauri ios build --export-method app-store-connect

  # Locate the built .ipa
  IPA=$(find src-tauri/gen/apple/build -name '*.ipa' 2>/dev/null | head -1)
  if [[ -z "$IPA" ]]; then
    # Tauri may output .xcarchive; user may need to export IPA manually
    echo "    WARN: No .ipa found. Check src-tauri/gen/apple/build/ for the archive."
    echo "    You may need to export the IPA from the .xcarchive via Xcode Organizer."
    return
  fi
  echo "    Built: $IPA"

  echo "==> Uploading iOS IPA to App Store Connect..."
  xcrun altool --upload-app \
    -f "$IPA" \
    -t ios \
    --apiKey    "$APPLE_API_KEY" \
    --apiIssuer "$APPLE_API_ISSUER"

  echo "    Uploaded: $IPA"
}

# ── Execute target builds ────────────────────────────────────

case "$TARGET" in
  macos) build_macos ;;
  ios)   build_ios ;;
  all)
    build_macos
    build_ios
    ;;
esac

echo ""
echo "==> Release v${NEW_VERSION} complete."
echo "    Don't forget to push the git tag:"
echo "      git push origin main --tags"
echo ""
echo "    Pushing the tag will also trigger the client-release CI workflow,"
echo "    which builds unsigned binaries for Linux, Windows, and macOS"
echo "    and publishes them as a GitHub Release."
