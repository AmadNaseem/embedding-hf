# Contributing to embedding-hf

Thanks for your interest in contributing!

## Quick start
- Node.js 18+ required
- Clone and install deps:
  - `npm install`
- Try the example (downloads model on first run):
  - `npm run example -- "Hello from contributors"`

## Development
This package ships small prebuilt JS files in `dist/` with TypeScript typings.
There is no build step. Keep changes minimal and focused.

- Public APIs live in:
  - `dist/index.cjs` (CommonJS)
  - `dist/index.mjs` (ESM)
  - `dist/index.d.ts` (types)
- Keep both CJS and ESM entries in sync.
- First-call model download is large (~90MB); avoid hitting the network in CI.

## Testing
- Local smoke test: `npm run example -- "your text"`
- Minimal CI only checks module imports and exported functions (no model download).

## Commit style
- Prefer Conventional Commits (e.g., `feat: ...`, `fix: ...`, `docs: ...`).

## Pull requests
- Target the `main` branch.
- Keep PRs small and focused.
- Ensure CI passes.

## Releases
- Maintainers: bump version in `package.json` and `npm publish`.
- Tag the release (e.g., `v0.2.4`) and push tags.

## Branch protection (maintainers)
Enable protections in GitHub:
1. Settings → Branches → Add rule → Branch name pattern: `main`.
2. Check “Require a pull request before merging”.
3. Check “Require approvals” (recommend 1+).
4. Check “Require status checks to pass before merging” and select the `ci` workflow.
5. Optional: Require code owner reviews (with CODEOWNERS).
6. Save.

## Contact
- Author/Maintainer: https://github.com/AmadNaseem
