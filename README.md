# Defence Chronicle — Personal Portfolio

**Owner:** Amarendra Pratap Singh (orbaps)

A Vite + React + TypeScript personal portfolio with shadcn/ui components and Supabase integrations. This repository contains the frontend app, Supabase migrations and functions, and site assets (logo, favicon, resume, etc.).

---

## 🚀 Quick Start

Requirements
- Node.js (v18+ recommended)
- npm (or yarn / pnpm)

Clone and install

```bash
git clone https://github.com/orbaps/defence-chronicle.git
cd defence-chronicle
npm install
```

Create environment variables (example `.env`)

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
VITE_SUPABASE_PROJECT_ID="your-project-id"
```

Run locally

```bash
npm run dev
# open the URL shown by Vite, e.g. http://localhost:5173 or http://localhost:8080
```

Build & preview

```bash
npm run build
npm run preview
```

Lint

```bash
npm run lint
```

---

## 🗂 Project Structure (high level)

- `index.html` — page title, favicon, and SEO meta
- `src/` — app source
  - `components/` — UI components & layout
  - `pages/` — route pages (public + admin)
  - `integrations/supabase/` — Supabase client & types
  - `lib/` — utilities
- `public/` — static assets (logos, favicon, resume)
- `supabase/` — migrations & functions
- `package.json` — scripts & deps

---

## 🔧 Scripts (commands)

- `npm run dev` — start dev server (Vite)
- `npm run build` — production build
- `npm run preview` — preview built app
- `npm run lint` — run ESLint

---

## 🧩 Supabase integration

Supabase client is at `src/integrations/supabase/client.ts` and reads these environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Admin pages (under `src/pages/admin`) use Supabase to manage posts, skills, certifications, messages, and users. Use the `supabase/migrations` to inspect or re-run schema setup.

Setup steps
1. Create a Supabase project at https://app.supabase.io
2. Add the tables and policies matching the migrations directory
3. Add keys to `.env` and restart the dev server

---

## 🎨 Branding & Assets

Files under `/public`:
- `logo.svg` — primary logo (provided)
- `logo-helmet.svg` — helmet favicon / icon
- `logo-torso.svg` — torso logo
- `favicon.ico` — fallback icon
- `resume.html` — static resume page

Notes
- Browsers cache favicons aggressively — use a hard refresh (Ctrl/Cmd+Shift+R) or incognito window to validate changes.
- If you want PNGs or multi-resolution `.ico` files for broad compatibility, generate them from the SVGs (e.g. ImageMagick `convert` or online favicon generators).

---

## ✅ Recent changes

- Branding: Added `logo.svg`, updated `index.html` and `Navbar` to display the new logo and page title **Amarendra Pratap Singh**.

---

## ♻️ Contributing

1. Fork & branch:

```bash
git checkout -b feat/your-feature
```

2. Implement, test and lint locally.
3. Commit with clear message and open a Pull Request against `main`.

Guidelines
- Use small, focused PRs
- Add tests or manual verification steps in the PR description
- Provide screenshots for visual changes

If you'd like, I can add a `CONTRIBUTING.md` template for the repo.

---

## 🔍 Troubleshooting

- Favicon/title not updated: hard refresh or open incognito (browser caching). Confirm `index.html` contains the correct `<link rel="icon" ...>` entry.
- Supabase errors: verify env vars and ensure migrations are applied to the target project.
- Dev server port collisions: if `npm run dev` reports a different port, use the URL displayed by Vite.

---

## 📦 Deployment

This project is buildable and portable. Typical deploy options:
- Vercel — connect the repo, set VITE env vars in project settings
- Netlify — build command `npm run build` and `publish` directory `dist`
- Static hosting (GitHub Pages) — ensure build output is served

Add your provider of choice and set the Vite environment variables in the provider's UI.

---

## 🏷 License & Code of Conduct

Consider adding an explicit `LICENSE` (e.g., MIT) and `CODE_OF_CONDUCT.md` if accepting outside contributors.

---

## 📬 Contact

Maintainer: **Amarendra Pratap Singh** — GitHub: [orbaps](https://github.com/orbaps)

---

If you want, I can also:
- Generate PNG exports and a multi-resolution `favicon.ico` and add them to `/public`.
- Add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- Add a simple CI/CD example (GitHub Actions) for build checks and deploy preview.

Would you like me to proceed with any of those additions?
