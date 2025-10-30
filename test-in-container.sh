#!/bin/bash

# Run Playwright tests in Docker container to bypass Cold Turkey

echo "Running Playwright tests in container (bypasses Cold Turkey)..."

docker run --rm \
  -v $(pwd):/work \
  -w /work \
  mcr.microsoft.com/playwright:v1.52.0-jammy \
  /bin/bash -c "npm install && npm run build && npm run test:e2e"

echo ""
echo "Screenshots should be in test-results/"
ls -lh test-results/
