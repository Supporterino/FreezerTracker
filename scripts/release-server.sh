#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# release-server.sh — bump server + chart versions, commit, tag
#
# Docker image build/push and Helm chart packaging/push are
# handled by GitHub Actions (see .github/workflows/server-release.yml).
#
# Usage:
#   ./scripts/release-server.sh --patch
#   ./scripts/release-server.sh --minor
#   ./scripts/release-server.sh --major
#   ./scripts/release-server.sh --minor --chart-bump minor
# ──────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

SERVER_PKG="$ROOT_DIR/apps/server/package.json"
CHART_DIR="$ROOT_DIR/helm/freezer-tracker-chart"
CHART_YAML="$CHART_DIR/Chart.yaml"
BUMP=""
CHART_BUMP=""

# ── Helpers ───────────────────────────────────────────────────

usage() {
  cat <<EOF
Usage: $(basename "$0") [--major | --minor | --patch] [OPTIONS]

SemVer bump (exactly one required):
  --major              Bump major version (X.0.0)
  --minor              Bump minor version (x.Y.0)
  --patch              Bump patch version (x.y.Z)

Options:
  --chart-bump TYPE    Also bump the Helm chart version (major|minor|patch).
                       If omitted the chart version stays unchanged; only
                       appVersion is updated to match the new server version.
  -h, --help           Show this help message

After running this script, push the commit and tag:
  git push origin main --tags

GitHub Actions will then build the Docker image and push the Helm chart.
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

# Update a YAML field in Chart.yaml (top-level scalar only).
# Usage: set_chart_field <file> <field> <value>
set_chart_field() {
  local file="$1" field="$2" value="$3"
  local tmp
  tmp=$(mktemp)
  sed "s/^${field}:.*/${field}: \"${value}\"/" "$file" > "$tmp"
  mv "$tmp" "$file"
}

get_chart_field() {
  local file="$1" field="$2"
  sed -n "s/^${field}: *\"\{0,1\}\([^\"]*\)\"\{0,1\}/\1/p" "$file" | head -1
}

# ── Parse args ────────────────────────────────────────────────

while [[ $# -gt 0 ]]; do
  case "$1" in
    --major)      BUMP="major"; shift ;;
    --minor)      BUMP="minor"; shift ;;
    --patch)      BUMP="patch"; shift ;;
    --chart-bump) CHART_BUMP="$2"; shift 2 ;;
    -h|--help)    usage ;;
    *)            die "Unknown argument: $1" ;;
  esac
done

[[ -n "$BUMP" ]] || die "Specify one of --major, --minor, or --patch"
[[ -f "$SERVER_PKG" ]] || die "Cannot find $SERVER_PKG — run from repo root"
[[ -f "$CHART_YAML" ]] || die "Cannot find $CHART_YAML"

if [[ -n "$CHART_BUMP" ]]; then
  [[ "$CHART_BUMP" =~ ^(major|minor|patch)$ ]] || die "Invalid --chart-bump: $CHART_BUMP"
fi

# ── Version bump — server ─────────────────────────────────────

CURRENT_VERSION=$(get_version "$SERVER_PKG")
NEW_VERSION=$(bump_semver "$CURRENT_VERSION" "$BUMP")

echo "==> Server version: $CURRENT_VERSION → $NEW_VERSION ($BUMP bump)"

set_json_version "$SERVER_PKG" "$NEW_VERSION"
echo "    Updated apps/server/package.json"

# ── Version bump — Helm chart ─────────────────────────────────

# Always sync appVersion with the server release
set_chart_field "$CHART_YAML" "appVersion" "$NEW_VERSION"
echo "    Updated Chart.yaml appVersion → $NEW_VERSION"

# Optionally bump the chart's own version
CHART_VERSION=$(get_chart_field "$CHART_YAML" "version")
if [[ -n "$CHART_BUMP" ]]; then
  NEW_CHART_VERSION=$(bump_semver "$CHART_VERSION" "$CHART_BUMP")
  set_chart_field "$CHART_YAML" "version" "$NEW_CHART_VERSION"
  echo "    Updated Chart.yaml version → $NEW_CHART_VERSION ($CHART_BUMP bump)"
else
  NEW_CHART_VERSION="$CHART_VERSION"
fi

# ── Git commit + tag ──────────────────────────────────────────

cd "$ROOT_DIR"
git add apps/server/package.json helm/freezer-tracker-chart/Chart.yaml
git commit -m "chore(server): release v${NEW_VERSION}"
git tag "server/v${NEW_VERSION}"

echo ""
echo "==> Created commit and tag server/v${NEW_VERSION}"
echo ""
echo "Push to trigger CI:"
echo "  git push origin main --tags"
echo ""
echo "GitHub Actions will:"
echo "  • Build & push Docker image to ghcr.io (amd64 + arm64)"
echo "  • Package & push Helm chart to ghcr.io OCI registry"
echo ""
echo "Users can install the chart via:"
echo "  helm install freezer-api oci://ghcr.io/supporterino/freezer-tracker-chart --version ${NEW_CHART_VERSION}"
