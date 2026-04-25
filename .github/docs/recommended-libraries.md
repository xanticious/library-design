# Recommended Libraries

These are approved MIT licensed libraries for use in SPA webapps built with `create-spa-webapp`.

## Approved MIT Licensed Libraries

### Animation

- **[PixiJS](https://pixijs.com/)** (`pixi.js`) — 2D WebGL rendering engine for games and interactive graphics
- **[GSAP](https://greensock.com/gsap/)** (`gsap`) — High-performance animation library for DOM, SVG, and canvas
- **[Anime.js](https://animejs.com/)** (`animejs`) — Lightweight JavaScript animation library for CSS, SVG, and JS objects
- **[Motion](https://motion.dev/)** (`motion`) — Animation library with a simple API, successor to Framer Motion's core

### State Machines

- **[XState](https://xstate.js.org/)** (`xstate`) — Finite state machines and statecharts for robust application logic
- **[@xstate/react](https://xstate.js.org/docs/packages/xstate-react/)** (`@xstate/react`) — React hooks for XState actors and machines

### HTTP Requests

- **[fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** — Built-in browser API for HTTP requests; prefer over third-party clients when possible
- **[ky](https://github.com/sindresorhus/ky)** (`ky`) — Tiny, elegant HTTP client built on Fetch with retries and hooks
- **[ofetch](https://github.com/unjs/ofetch)** (`ofetch`) — Lightweight fetch wrapper with smart defaults and JSON handling

### Data Fetching & Caching

- **[TanStack Query](https://tanstack.com/query)** (`@tanstack/react-query`) — Async data fetching, caching, and synchronization for React
- **[SWR](https://swr.vercel.app/)** (`swr`) — React hooks for data fetching with stale-while-revalidate strategy

### Routing

- **[React Router](https://reactrouter.com/)** (`react-router`) — Declarative client-side routing for React SPAs
- **[TanStack Router](https://tanstack.com/router)** (`@tanstack/react-router`) — Type-safe router with built-in search param management

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** (`@radix-ui/react-*`) — Accessible, unstyled headless UI primitives for React
- **[shadcn/ui](https://ui.shadcn.com/)** — Copy-paste component collection built on Radix UI and Tailwind CSS
- **[Headless UI](https://headlessui.com/)** (`@headlessui/react`) — Fully accessible headless UI components for React

### Styling

- **[Tailwind CSS](https://tailwindcss.com/)** (`tailwindcss`) — Utility-first CSS framework for rapid UI development
- **[clsx](https://github.com/lukeed/clsx)** (`clsx`) — Tiny utility for constructing class name strings conditionally
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** (`tailwind-merge`) — Merge Tailwind CSS classes without style conflicts

### Forms

- **[React Hook Form](https://react-hook-form.com/)** (`react-hook-form`) — Performant forms with easy validation and minimal re-renders
- **[Zod](https://zod.dev/)** (`zod`) — TypeScript-first schema validation with static type inference

### Utilities

- **[date-fns](https://date-fns.org/)** (`date-fns`) — Modular date utility library with tree-shakeable functions
- **[lodash-es](https://lodash.com/)** (`lodash-es`) — ESM build of Lodash utilities (array, object, string helpers)
- **[uuid](https://github.com/uuidjs/uuid)** (`uuid`) — RFC-compliant UUID generation
- **[immer](https://immerjs.github.io/immer/)** (`immer`) — Immutable state updates using plain mutable JavaScript
- **[nanoid](https://github.com/ai/nanoid)** (`nanoid`) — Tiny, secure, URL-friendly unique string ID generator

### Math & Physics (Games)

- **[Matter.js](https://brm.io/matter-js/)** (`matter-js`) — 2D rigid body physics engine for the browser
- **[Howler.js](https://howlerjs.com/)** (`howler`) — Audio library for the modern web supporting Web Audio and HTML5 Audio
- **[Tween.js](https://github.com/tweenjs/tween.js)** (`@tweenjs/tween.js`) — JavaScript tweening engine for smooth value interpolation

### Internationalization

- **[i18next](https://www.i18next.com/)** (`i18next`) — Internationalization framework with powerful plugin ecosystem
- **[react-i18next](https://react.i18next.com/)** (`react-i18next`) — React bindings for i18next

### Charts & Data Visualization

- **[Recharts](https://recharts.org/)** (`recharts`) — Composable charting library built on React and D3
- **[Chart.js](https://www.chartjs.org/)** (`chart.js`) — Simple yet flexible JavaScript charting library

### Drag & Drop

- **[dnd kit](https://dndkit.com/)** (`@dnd-kit/core`) — Lightweight, performant drag-and-drop toolkit for React

### Virtual Lists

- **[TanStack Virtual](https://tanstack.com/virtual)** (`@tanstack/react-virtual`) — Headless UI for virtualizing large lists and tables in React

### Testing

- **[Vitest](https://vitest.dev/)** (`vitest`) — Fast unit test framework powered by Vite, compatible with Jest API
- **[Testing Library](https://testing-library.com/)** (`@testing-library/react`) — Simple and complete React component testing utilities
