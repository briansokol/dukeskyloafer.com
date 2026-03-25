# dukeskyloafer.com

Personal website built with [React Router v7](https://reactrouter.com/) (SSR) and deployed on [Cloudflare Workers](https://developers.cloudflare.com/workers/). Displays GitHub projects, YouTube streams/videos, and playlists.

## Tech Stack

- **Framework**: React Router 7 with server-side rendering
- **Runtime**: Cloudflare Workers
- **Styling**: Tailwind CSS v4
- **Linting**: [Oxlint](https://oxc.rs/docs/guide/usage/linter) (not ESLint)
- **Formatting**: [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) (not Prettier)
- **Testing**: Vitest
- **Pre-commit**: Husky + lint-staged

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Linting and Formatting

```bash
npm run lint         # Run Oxlint
npm run lint:fix     # Run Oxlint with auto-fix
npm run format       # Format with Oxfmt
npm run format:check # Check formatting without writing
```

Pre-commit hooks automatically run `oxlint --fix` and `oxfmt` on staged files.

### Type Checking

```bash
npm run typecheck
```

## Building and Deployment

Build for production:

```bash
npm run build
```

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

Deploy a preview URL:

```bash
npx wrangler versions upload
```

Promote a version to production:

```bash
npx wrangler versions deploy
```

## License

The source code is licensed under the [MIT License](LICENSE). However, the name "Duke Skyloafer," logos, personal content, and branding are **not** licensed for reuse. Forks must remove or replace all personal branding before deployment.
