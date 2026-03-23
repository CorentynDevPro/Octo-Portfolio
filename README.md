# 🐙 Octo-Portfolio

> A **space-themed** developer portfolio built with **TurboRepo**, **PNPM**, **Nuxt.js**, and **Nitro** — featuring a parallax starfield, GitHub Dark aesthetics, and a fully automated CI/CD pipeline.

[![CI](https://github.com/CorentynDevPro/Octo-Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/CorentynDevPro/Octo-Portfolio/actions/workflows/ci.yml)

---

## ✨ Features

- 🚀 **TurboRepo** monorepo with PNPM workspaces
- 🌌 **Space theme** — GitHub Dark palette + Nuxt.js green + parallax starfield
- 🎨 **Parallax system** — multi-layer depth effect on the Hero section
- ⚡ **Nuxt.js 3** — SSR, server API routes, auto-imports
- 🔌 **Nitro API** — standalone API server with GitHub data proxy
- 🐳 **Docker** — multi-stage builds + `docker-compose` for dev & prod
- 🤖 **GitHub Actions** CI/CD — lint, build, and deploy on every push
- 🪝 **Husky + Commitlint** — conventional commits enforced on every commit
- 📦 **Zero TypeScript** — pure JavaScript throughout

---

## 🗂️ Project Structure

```
Octo-Portfolio/
├── apps/
│   ├── web/                    # Nuxt.js 3 portfolio frontend + server API
│   │   ├── components/         # Vue components (Hero, About, Skills, Projects, Contact)
│   │   ├── composables/        # useStarsCanvas, useParallax
│   │   ├── pages/              # index.vue (home)
│   │   ├── server/api/         # Nuxt server routes (GitHub proxy, contact form)
│   │   ├── assets/css/         # main.css (space + GitHub Dark theme)
│   │   ├── nuxt.config.js
│   │   ├── vercel.json
│   │   └── Dockerfile
│   └── api/                    # Nitro standalone API server
│       ├── src/routes/         # GitHub profile, repos endpoints
│       ├── nitro.config.js
│       ├── vercel.json
│       └── Dockerfile
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint + Build on every PR/push
│       ├── deploy-preview.yml  # develop → Vercel Preview
│       └── deploy-production.yml # main → Vercel Production
├── .husky/                     # Git hooks (pre-commit, commit-msg)
├── .commitlintrc.js            # Conventional commits rules
├── turbo.json                  # TurboRepo task graph
├── pnpm-workspace.yaml
├── package.json
├── docker-compose.yml          # Production
├── docker-compose.dev.yml      # Development (hot-reload)
└── .env.example
```

---

## 🚦 Branch Strategy

| Branch    | Purpose               | Deploys to              |
| --------- | --------------------- | ----------------------- |
| `main`    | Production-ready code | Vercel **Production**   |
| `develop` | Integration & preview | Vercel **Preview**      |
| `feat/*`  | Feature branches      | No automatic deployment |
| `fix/*`   | Bug-fix branches      | No automatic deployment |

**Workflow:**  
`feat/xxx` → PR → `develop` → Preview ✓ → PR → `main` → Production 🚀

---

## 🛠️ Local Development

### Prerequisites

| Tool   | Version |
| ------ | ------- |
| Node   | ≥ 20    |
| pnpm   | ≥ 9     |
| Docker | ≥ 24    |

### 1. Clone & Install

```bash
git clone https://github.com/CorentynDevPro/Octo-Portfolio.git
cd Octo-Portfolio

# Install all dependencies
pnpm install

# Setup Git hooks (Husky)
pnpm prepare
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env and add your GITHUB_TOKEN (optional, increases API rate limit)
```

### 3. Start development servers

```bash
# Option A – run everything with TurboRepo
pnpm dev

# Option B – run with Docker (hot-reload)
docker compose -f docker-compose.dev.yml up
```

| Service       | URL                   |
| ------------- | --------------------- |
| Web (Nuxt.js) | http://localhost:3000 |
| API (Nitro)   | http://localhost:4000 |

---

## 🏗️ Build

```bash
# Build all apps
pnpm build

# Build a specific app
pnpm --filter @octo-portfolio/web build
pnpm --filter @octo-portfolio/api build
```

---

## 🐳 Docker

### Production

```bash
# Build & start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Development (hot-reload)

```bash
docker compose -f docker-compose.dev.yml up
```

---

## 🤖 CI/CD with GitHub Actions

### Workflows

| File                    | Trigger                  | Actions                          |
| ----------------------- | ------------------------ | -------------------------------- |
| `ci.yml`                | Push/PR to main, develop | Lint, Build, Commitlint          |
| `deploy-preview.yml`    | Push to `develop`        | Build + Vercel Preview deploy    |
| `deploy-production.yml` | Push to `main`           | Build + Vercel Production deploy |

### Commit Convention (Conventional Commits)

```
<type>(<scope>): <subject>

feat(web): add dark mode toggle
fix(api): handle github rate limit error
docs: update readme with deployment guide
chore: bump nuxt to 3.15
```

**Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

## 🚀 Deploy to Vercel

### Step 1 — Create Vercel projects

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `CorentynDevPro/Octo-Portfolio`
3. Create **two projects**:
   - `octo-portfolio-web` → Root directory: `apps/web`
   - `octo-portfolio-api` → Root directory: `apps/api`

### Step 2 — Configure Vercel project settings

**For `octo-portfolio-web`:**
| Setting | Value |
| ----------------- | -------------------------------------------------- |
| Framework | Nuxt.js |
| Root Directory | `apps/web` |
| Build Command | `cd ../.. && pnpm --filter @octo-portfolio/web build` |
| Output Directory | `apps/web/.output` |
| Install Command | `cd ../.. && pnpm install --frozen-lockfile` |

**Environment variables (Vercel dashboard → Settings → Environment Variables):**

```
NUXT_PUBLIC_GITHUB_USERNAME = CorentynDevPro
NUXT_PUBLIC_SITE_URL        = https://your-domain.vercel.app
NUXT_PUBLIC_API_BASE        = https://your-api.vercel.app
GITHUB_TOKEN                = ghp_xxxxxxxxxxxx   (optional)
```

**For `octo-portfolio-api`:**
| Setting | Value |
| ----------------- | --------------------------------------------------- |
| Framework | Other |
| Root Directory | `apps/api` |
| Build Command | `cd ../.. && pnpm --filter @octo-portfolio/api build` |
| Output Directory | `apps/api/.output` |
| Install Command | `cd ../.. && pnpm install --frozen-lockfile` |

**Environment variables:**

```
GITHUB_TOKEN    = ghp_xxxxxxxxxxxx   (optional)
ALLOWED_ORIGIN  = https://your-domain.vercel.app
PORT            = 4000
```

### Step 3 — Add GitHub Secrets

In your GitHub repository → **Settings → Secrets and variables → Actions**, add:

| Secret / Variable             | Value                             |
| ----------------------------- | --------------------------------- |
| `VERCEL_TOKEN`                | Your Vercel personal access token |
| `VERCEL_ORG_ID`               | Found in Vercel project settings  |
| `VERCEL_PROJECT_ID_WEB`       | Vercel project ID for `web`       |
| `VERCEL_PROJECT_ID_API`       | Vercel project ID for `api`       |
| `NUXT_PUBLIC_GITHUB_USERNAME` | `CorentynDevPro`                  |
| `NUXT_PRODUCTION_URL`         | Your production URL               |
| `NUXT_PREVIEW_URL`            | Your preview URL                  |

**To get your `VERCEL_TOKEN`:**

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token with full scope

**To get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project (run from apps/web or apps/api)
cd apps/web && vercel link

# IDs are in .vercel/project.json
cat .vercel/project.json
```

### Step 4 — Push to trigger deployment

```bash
# Deploy to preview
git checkout develop
git push origin develop

# Deploy to production (after testing preview)
git checkout main
git merge develop
git push origin main
```

---

## 🎨 Theme

The design combines:

- **GitHub Dark** — `#0d1117` canvas, `#161b22` surfaces, `#30363d` borders
- **Nuxt.js green** — `#00dc82` as the primary accent
- **Space accents** — `#388bfd` (blue), `#a371f7` (purple), `#f85149` (red)
- **Fonts** — Space Mono (monospace) + Space Grotesk (sans-serif)

---

## 🔧 Troubleshooting

### `apps/api` dev server – `Expected ';', got 'ident'` Rollup error

**Symptom:** Running `pnpm dev` (or `pnpm --filter @octo-portfolio/api dev`) fails with:

```
Error: virtual:#nitro-internal-virtual/server-handlers (1:55): Expected ';', got 'ident'
(Note that you need plugins to import files that are not JavaScript)
```

**Cause:** Nitro generates internal virtual modules that embed the **absolute file-system paths** of your route handlers as JavaScript string literals. If your project is located in a directory whose path contains a **single quote / apostrophe** (e.g. `~/Projects/Borne d'assistance/Octo-Portfolio`), the apostrophe breaks the generated string literal, producing an invalid JavaScript token.

**Fix:** Move the project to a directory path that contains **no apostrophes or other special characters**:

```bash
# Bad  → /Users/you/Borne d'assistance/Octo-Portfolio
# Good → /Users/you/Projects/Octo-Portfolio
```

### `apps/web` dev server – Google Fonts fetch error at startup

**Symptom:** Nuxt dev server logs:

```
[error] [nuxt:google-fonts] [GET] "https://fonts.googleapis.com/css2?…": <no response> fetch failed
```

This error only occurs in offline/CI environments where `fonts.googleapis.com` is unreachable. The `@nuxtjs/google-fonts` module is already configured with `download: false`, which means it will inject a `<link>` tag at runtime (not download fonts during build). In a fully offline environment, fonts will fall back to the system sans-serif stack defined in the CSS.

---

## 📄 License

[MIT](./LICENSE) © CorentynDevPro
