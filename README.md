# ATELIER — Commerce Bag State & SCSS System

ATELIER modernizes a 2023 React/SCSS webshop mockup into a focused commerce-state engineering project.

The legacy app had navigation links to routes that were never registered, decorative Search/Login/Sign Up/basket controls, BUY NOW and RESERVE buttons without behavior, Lorem Ipsum catalog copy, a fixed four-column layout, Create React App boilerplate, React Router for a single implemented route, icon/typewriter dependencies, and a large Google Fonts import.

## Engineering focus

ATELIER intentionally stops before checkout and concentrates on state that can be made correct on the client:

- stock-bounded line quantities
- duplicate-line recovery
- unknown-product recovery
- localStorage persistence
- corrupted persistence recovery
- deterministic subtotal calculation
- demo shipping threshold policy
- explicit item/line counts
- quantity update and removal transitions
- React UI driven by pure commerce rules
- structured SCSS tokens and mixins

## Architecture

```text
src/data/products.js
        │
        ▼
src/lib/bagState.js
        ├─ persisted-state sanitization
        ├─ duplicate-line merge
        ├─ stock bounds
        ├─ add/update/remove transitions
        ├─ subtotal/shipping/total policy
        └─ money formatting
        │
        ▼
src/App.jsx
        ├─ React state
        ├─ localStorage integration
        └─ catalog + bag rendering

src/styles/
        ├─ _tokens.scss
        ├─ _mixins.scss
        └─ main.scss
```

## Commerce boundaries

ATELIER does **not** implement or claim:

- checkout
- payments
- real inventory reservation
- authentication
- accounts
- tax calculation
- order submission
- shipping-provider integration
- a backend

The price, stock, and shipping values are static demo data used to exercise bag invariants.

## SCSS architecture

SCSS is intentionally preserved as part of this repository's engineering identity.

- `_tokens.scss` contains reusable design decisions.
- `_mixins.scss` contains shared focus/surface behavior.
- `main.scss` consumes those layers and owns responsive presentation.

The modernization removes scattered component imports and the oversized multi-family Google Fonts request without flattening the project back to plain CSS.

## Modernization summary

- Create React App → Vite
- React 18 → React 19
- preserved and modernized Sass/SCSS
- removed React Router
- removed React Icons
- removed react-simple-typewriter
- removed Web Vitals
- removed fake Login / Sign Up / Search / basket navigation
- removed fake BUY NOW / RESERVE actions
- removed unregistered routes
- removed Lorem Ipsum
- removed fixed four-column catalog layout
- removed CRA public/test boilerplate
- removed legacy lockfile
- removed oversized Google Fonts import
- removed unused logo and hero image
- retained five original catalog assets
- added Vitest, CI, Pages deployment, and professional documentation

## Local development

Requirements:

- Node.js 22+
- npm

```bash
npm install --legacy-peer-deps --no-audit --no-fund
npm run dev
```

## Tests

```bash
npm test
```

The suite covers persisted-state recovery, unknown products, invalid quantities, stock caps, duplicate-line merging, add transitions, increment limits, quantity updates, removal, empty totals, shipping policy, free-shipping threshold, line/item counts, and money formatting.

## Quality gate

```bash
npm run check
```

Runs syntax checks, Vitest, Sass/Vite compilation, and the production build.

## CI

`.github/workflows/quality.yml` runs on pull requests and pushes to `main`.

## Deployment

ATELIER includes a manual GitHub Pages workflow.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy Pages**.
4. Run the workflow.

## Security review

No API keys, tokens, passwords, credentials, backend endpoints, authentication assumptions, unsafe HTML injection, or sensitive browser data are required.

The only persisted value is a sanitized list of public demo product IDs and quantities.

## License

MIT. See [LICENSE](./LICENSE).
