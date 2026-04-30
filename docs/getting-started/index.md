# Getting Started

Welcome to **FreezerMan** — a self-hosted household freezer inventory tracker. This section walks you through everything you need to get the server running and the client app connected so you can start tracking what's in your freezer.

## What You'll Learn

- **[Installation](installation.md)** — Set up the FreezerMan server using Docker Compose (recommended) or a manual Bun + PostgreSQL setup.
- **[Quick Start](quick-start.md)** — Go from zero to a working app in five steps.
- **[Troubleshooting](troubleshooting.md)** — Solutions to common problems you might hit along the way.

---

## System Requirements

### Server

You can run the FreezerMan server with **Docker Compose** (recommended) or set it up manually.

**Docker Compose (recommended):**

- Docker Engine 20.10+
- Docker Compose v2.0+
- ~512 MB RAM, ~1 GB disk

**Manual setup:**

- Bun 1.3+
- PostgreSQL 17+
- ~256 MB RAM for the server process

### Client

The desktop and mobile apps are distributed as pre-built binaries via [GitHub Releases](https://github.com/Supporterino/FreezerTracker/releases). You can also build from source if your platform isn't covered.

**Pre-built binaries:**

- macOS 12 Monterey or later (`.dmg`)
- iOS 16 or later (via TestFlight or sideloading)

**Build from source:**

- Rust toolchain (latest stable)
- Xcode 15+ and Xcode Command Line Tools (macOS / iOS)
- Bun 1.3+
- Node.js 20+ (for certain Tauri CLI operations)

---

## Platform Support

| Platform        | Method              | Minimum Version      | Status       |
| --------------- | ------------------- | -------------------- | ------------ |
| Linux (server)  | Docker Compose      | Docker 20.10+        | Recommended  |
| Linux (server)  | Manual (Bun)        | Bun 1.3+, PG 17+    | Supported    |
| macOS (server)  | Docker / Manual     | macOS 12+ / Bun 1.3+ | Supported    |
| macOS (client)  | Pre-built `.dmg`    | macOS 12+            | Supported    |
| iOS (client)    | TestFlight / sideload | iOS 16+            | Supported    |
| Windows (client)| Build from source   | Windows 10+          | Experimental |

!!! note
    The server is designed to run on a home server or NAS. The client connects to the server over your local network or the internet — they don't need to be on the same machine.

---

## Next Steps

1. **[Installation](installation.md)** — Get the server and client set up.
2. **[Quick Start](quick-start.md)** — Create your first household and start tracking items.
3. **[Troubleshooting](troubleshooting.md)** — Fix common issues.
