# Code Conventions

## TypeScript

- Enable `strict: true` in `tsconfig.json`
- Prefer `interface` for object shapes, `type` for unions/aliases
- Use explicit return types on exported functions
- Avoid `any`; use `unknown` when the type is truly unknown

## React

- Functional components only — no class components
- One component per file
- File name matches component name (PascalCase)
- Use `import type` for type-only imports

## CSS

- Global styles in `src/global.css` (resets, fonts, variables)
- Component styles use **CSS Modules** — name files `ComponentName.module.css` and import as `import styles from "./ComponentName.module.css"`
- Use CSS custom properties (`--var-name`) for design tokens

## XState

- Machine definitions live in `src/machines/`
- Use `createMachine` from `xstate` v5
- Use `useMachine` from `@xstate/react` in components

## Testing

- Tests live in `test/`
- Vitest is the test runner
- File naming: `<feature>.test.ts` or `<feature>.test.tsx`

## Assets

- This project is deployed to **GitHub Pages**, which serves the app under a subpath (e.g. `https://user.github.io/repo/`)
- Always use **relative paths** when referencing images, fonts, scripts, or other static assets — never hardcoded absolute paths starting with `/`
- In Vite, import assets via ES module imports (`import logo from './assets/logo.png'`) so Vite resolves them correctly for any base path
- For assets referenced in CSS, use relative URLs (e.g. `url('./fonts/myfont.woff2')`) rather than root-relative ones
- The `base` option in `vite.config.ts` controls the public base path; do not assume it is always `/`

## Git

- Commit messages use imperative mood: "Add feature" not "Added feature"
- One logical change per commit
