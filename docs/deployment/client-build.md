# Building the Client

The FreezerMan client is a Tauri v2 application targeting macOS (`.dmg`) and iOS (App Store).

---

## Pre-built Binaries

Pre-built binaries are available on the [GitHub Releases](https://github.com/Supporterino/FreezerTracker/releases) page. Download the `.dmg` for macOS -- no build tools required.

iOS builds are distributed through App Store Connect.

---

## Building from Source

### Prerequisites

| Dependency | Version | Install |
|------------|---------|---------|
| Bun | 1.3+ | [bun.sh](https://bun.sh) |
| Rust toolchain | Latest stable | [rustup.rs](https://rustup.rs) |
| Xcode | Latest (macOS/iOS) | Mac App Store |
| Xcode Command Line Tools | Latest | `xcode-select --install` |

For iOS builds, you also need a valid Apple Developer account and provisioning profile configured in Xcode.

### Install Dependencies

From the monorepo root:

```bash
bun install
```

### Development Builds

```bash
# macOS development (hot-reload)
bun run dev:client

# iOS development (simulator)
bun run dev:client_ios
```

### Production Builds

```bash
# macOS -- produces a .dmg in apps/client/src-tauri/target/release/bundle/
bun run --cwd apps/client tauri build

# iOS -- produces an .ipa for App Store submission
bun run --cwd apps/client tauri ios build
```

---

## Release Scripts

FreezerMan uses two release scripts to automate versioning, building, and publishing.

### Server Release: `scripts/release-server.sh`

```bash
./scripts/release-server.sh <major|minor|patch> [--chart-bump <major|minor|patch>]
```

What it does:

1. Bumps the version in `package.json`
2. Syncs `appVersion` in `Chart.yaml`
3. Optionally bumps the Helm chart version (with `--chart-bump`)
4. Creates a git commit and tag (`server/vX.Y.Z`)
5. Push the tag to trigger CI

CI (GitHub Actions) handles the rest:
- Builds and pushes the Docker image to `ghcr.io/supporterino/freezer-tracker`
- Packages and pushes the Helm chart to `oci://ghcr.io/supporterino/freezer-tracker-chart`

**Examples:**

```bash
# Patch release (e.g. 1.2.3 -> 1.2.4), no chart version change
./scripts/release-server.sh patch

# Minor release with chart bump
./scripts/release-server.sh minor --chart-bump minor
```

### Client Release: `scripts/release-client.sh`

```bash
./scripts/release-client.sh <major|minor|patch> [--target macos|ios|both] [--skip-build]
```

What it does:

1. Bumps the version in `package.json`, `tauri.conf.json`, and `Cargo.toml`
2. Builds platform artifacts:
   - **macOS**: `.dmg` with optional notarization (requires Apple Developer credentials)
   - **iOS**: `.ipa` with App Store Connect upload
3. Creates a git commit and tag (`client/vX.Y.Z`)

**Examples:**

```bash
# Patch release for macOS only
./scripts/release-client.sh patch --target macos

# Minor release for both platforms
./scripts/release-client.sh minor --target both

# Bump version without building (useful for CI-only builds)
./scripts/release-client.sh patch --skip-build
```

---

## CI Pipeline

The CI pipeline is triggered by git tags:

| Tag pattern | Trigger |
|-------------|---------|
| `server/v*` | Docker image build + push, Helm chart package + push |
| `client/v*` | (Manual release via `release-client.sh`) |

The server CI workflow:
1. Checks out the tagged commit
2. Builds a multi-arch Docker image (`amd64` + `arm64`)
3. Pushes to `ghcr.io/supporterino/freezer-tracker`
4. Packages the Helm chart and pushes to `oci://ghcr.io/supporterino/freezer-tracker-chart`

---

## Next Steps

- [Docker Compose](docker-compose.md) -- deploy the server you just built
- [Security Hardening](security.md) -- review the production checklist
