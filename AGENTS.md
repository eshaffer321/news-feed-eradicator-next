# AI Agent Guidelines for Contributing to News Feed Eradicator

Welcome to the News Feed Eradicator project — a TypeScript-based browser extension built with Rollup. This guide is optimized for AI agents and sandboxed environments like OpenAI Codex, where the environment must be set up explicitly and deterministically.

---

## 🚀 Quickstart for Codex and Sandbox Environments

To run builds or tests in Codex, you must install the following before executing any commands:

# Install project dependencies
npm install

# Install Playwright browser binaries (required for E2E tests)
npx playwright install

# Install xvfb to simulate a display for headless browser tests
apt-get update && apt-get install -y xvfb

# Run E2E tests in a headless-safe way
xvfb-run --auto-servernum -- npm run test:e2e

These steps are non-optional. Skipping any of them will cause Playwright tests to fail due to missing browser binaries or display environment.

---

## 🔧 Development Conventions

### Formatting

- Indentation: Tabs (see .editorconfig)
- Quotes: Single
- Semicolons: Required
- Trailing commas: ES5-style (see .prettierrc.js)

Format your code before committing:

npm run format
# or
npm run lint:fix

---

## ✅ Linting and Tests

Run these commands to verify changes:

npm run lint      # Lint the code
npm test          # Run unit tests (Vitest)
npm run test:e2e  # Run end-to-end tests (Playwright)

All checks must pass before merging. If tests fail due to sandbox constraints, describe the limitation in your PR.

---

## 📦 Build Artifacts

- build/ and dist/ are generated directories.
- These are ignored by Git. Do not commit them.

---

## 🗂️ Project Structure

src/       - TypeScript source code  
assets/    - Static files copied during build  
build/     - Intermediate dev build artifacts  
dist/      - Final browser extension bundle  

Start the dev watcher with:

npm run dev

---

## 🤖 Agent Best Practices

- Always assume a clean, ephemeral shell session.
- Never assume browser binaries or packages are pre-installed.
- Use npm scripts as defined — avoid custom invocation logic.
- Be explicit and fail-fast when required setup is missing.

Following these guidelines ensures all contributors — human or agentic — work consistently across environments.
