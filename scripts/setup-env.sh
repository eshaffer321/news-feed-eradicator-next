#!/bin/bash
set -euo pipefail

# Ensure running on Linux with apt-get
if [[ "$(uname -s)" != "Linux" ]]; then
echo "This script is intended for Linux environments."
exit 1
fi

if ! command -v apt-get >/dev/null; then
echo "apt-get not found. Please run on an Ubuntu-based system."
exit 1
fi

# Install xvfb for headless browser tests
if ! dpkg -s xvfb >/dev/null 2>&1; then
sudo apt-get update
sudo apt-get install -y xvfb
fi

# Install Node dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run lints and tests using xvfb for e2e
npm run lint
npm test
xvfb-run --auto-servernum -- npm run test:e2e
