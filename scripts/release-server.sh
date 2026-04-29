#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# release-server.sh — bump server version, build & push Docker image,
#                     package & push Helm chart (OCI)
#
# Usage:
#   ./scripts/release-server.sh --patch
#   ./scripts/release-server.sh --minor
#   ./scripts/release-server.sh --major
#   ./scripts/release-server.sh --patch --skip-push
#   ./scripts/release-server.sh --minor --chart-bump minor
#   ./scripts/release-server.sh --minor --registry ghcr.io/myorg/myimage
# ──────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

SERVER_PKG="$ROOT_DIR/apps/server/package.json"
CHART_DIR="$ROOT_DIR/helm/freezer-tracker-chart"
CHART_YAML="$CHART_DIR/Chart.yaml"
REGISTRY="ghcr.io/supporterino/freezer-tracker"
CHART_REGISTRY="oci://ghcr.io/supporterino"
BUMP=""
CHART_BUMP=""
SKIP_PUSH=false

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
  --skip-push          Build artifacts but do not push to any registry
  --registry URL       Override Docker image registry
                       (default: $REGISTRY)
  --chart-registry URL Override Helm OCI registry
                        (default: $CHART_REGISTRY)
                        The chart name from Chart.yaml is appended automatically.
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
    --major)          BUMP="major"; shift ;;
    --minor)          BUMP="minor"; shift ;;
    --patch)          BUMP="patch"; shift ;;
    --chart-bump)     CHART_BUMP="$2"; shift 2 ;;
    --skip-push)      SKIP_PUSH=true; shift ;;
    --registry)       REGISTRY="$2"; shift 2 ;;
    --chart-registry) CHART_REGISTRY="$2"; shift 2 ;;
    -h|--help)        usage ;;
    *)                die "Unknown argument: $1" ;;
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

echo "==> Created commit and tag server/v${NEW_VERSION}"

# ── Docker build ──────────────────────────────────────────────

IMAGE_VERSIONED="${REGISTRY}:v${NEW_VERSION}"
IMAGE_LATEST="${REGISTRY}:latest"

echo "==> Building Docker image: ${IMAGE_VERSIONED}"

docker build \
  --platform linux/amd64 \
  -f apps/server/Dockerfile \
  -t "$IMAGE_VERSIONED" \
  -t "$IMAGE_LATEST" \
  .

echo "==> Built: ${IMAGE_VERSIONED}"

# ── Helm package ──────────────────────────────────────────────

echo "==> Packaging Helm chart (version: ${NEW_CHART_VERSION}, appVersion: ${NEW_VERSION})..."

HELM_PKG_DIR=$(mktemp -d)
helm package "$CHART_DIR" --destination "$HELM_PKG_DIR"

CHART_TGZ=$(ls "$HELM_PKG_DIR"/*.tgz)
echo "    Packaged: $CHART_TGZ"

# ── Push ──────────────────────────────────────────────────────

if [[ "$SKIP_PUSH" == true ]]; then
  echo "==> Skipping push (--skip-push)"
  echo "    Chart package: $CHART_TGZ"
else
  # ── Docker push ─────────────────────────────────────────────
  echo "==> Pushing Docker image to ${REGISTRY}..."

  # Ensure logged in to GHCR. Uses GITHUB_TOKEN if available,
  # otherwise relies on existing Docker credential store.
  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$(git config user.name || echo 'token')" --password-stdin
  fi

  docker push "$IMAGE_VERSIONED"
  docker push "$IMAGE_LATEST"

  DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' "$IMAGE_VERSIONED" 2>/dev/null || echo "n/a")
  echo "==> Pushed: ${IMAGE_VERSIONED}"
  echo "    Digest: ${DIGEST}"

  # ── Helm OCI push ──────────────────────────────────────────
  echo "==> Pushing Helm chart to ${CHART_REGISTRY}..."

  # helm expects the OCI registry login via `helm registry login`
  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    echo "$GITHUB_TOKEN" | helm registry login ghcr.io -u "$(git config user.name || echo 'token')" --password-stdin
  fi

  helm push "$CHART_TGZ" "$CHART_REGISTRY"

  echo "==> Pushed: ${CHART_REGISTRY}/freezer-tracker-chart:v${NEW_CHART_VERSION}"
fi

# ── Cleanup ───────────────────────────────────────────────────

rm -rf "$HELM_PKG_DIR"

echo ""
echo "Done. Don't forget to push the git tag:"
echo "  git push origin main --tags"
echo ""
echo "Users can install the chart via:"
echo "  helm install freezer-api ${CHART_REGISTRY}/freezer-tracker-chart --version v${NEW_CHART_VERSION}"
