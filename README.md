# **PROJECT_NAME**

A modern Single Page Application built with:

- **TypeScript** — static typing
- **React 19** — UI framework
- **Vite** — dev server & bundler
- **Vitest** — unit testing
- **XState v5** — state machines
- **PixiJS v8** — 2D WebGL rendering
- **CSS Modules** — scoped component styles
- **OxLint** — fast Rust-based linter
- **Oxfmt** — code formatter
- **FontAwesome** — icons
- **Google Fonts** — typography

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start Vite dev server              |
| `npm run build`      | Production build                   |
| `npm run preview`    | Preview production build           |
| `npm run test`       | Run tests once                     |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run lint`       | Run OxLint                         |
| `npm run linter`     | Alias for `lint`                   |
| `npm run fmt`        | Run Oxfmt formatter                |
| `npm run format`     | Alias for `fmt`                    |
| `npm run validate`   | Format, lint, and test in sequence |

## Deployment

This project is configured for **GitHub Pages** deployment. Asset paths use `base: './'` in
`vite.config.ts` so the built output works correctly at any URL path.

A GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy
on every push to `main`.
