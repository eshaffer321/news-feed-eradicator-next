# Guidelines for AI Contributors

Welcome to the **News Feed Eradicator** project. This repository contains a TypeScript browser extension built with Rollup.

## Coding conventions

- **Indentation:** Tabs (see `.editorconfig`).
- **Quotes:** Single quotes.
- **Semicolons:** Required.
- **Trailing commas:** Use ES5 style (see `.prettierrc.js`).

Run `npm run format` (or `npm run lint:fix`) before committing to apply Prettier formatting automatically.

## Linting and tests

- Lint the code with `npm run lint`.
- Run the test suite with `npm test` (uses [Vitest](https://vitest.dev)).
- Both lint and tests should pass before committing.

If commands fail due to environment restrictions, mention this in your PR description.

## Build output

`build/` and `dist/` folders are generated artifacts and are ignored by Git. Do not commit files from these directories.

## Development hints

- Source TypeScript lives in `src/`.
- Assets are in `assets/` and copied using `npm run copy-assets` during the build.
- Use `npm run dev` to watch and rebuild during development.

Follow these guidelines to keep contributions consistent and maintainable.
