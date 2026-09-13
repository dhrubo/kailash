# Anandam / Kailash Shivanandam — static site rebuild

Static rebuild of https://kailash-shivanandam.com/ using [Eleventy](https://www.11ty.dev/), designed to deploy to GitHub Pages via GitHub Actions.

## Status

This is a scaffold: page routes, layout, nav, and mobile menu are in place with placeholder copy. Content is being extracted from the live site (see `scraped-content/` once that pass completes) and will be dropped into the templates, followed by a design/visual pass and a copy-editing pass.

## Local development

```bash
npm install
npm run start
```

Serves at http://localhost:8080 with live reload.

## Build

```bash
npm run build
```

Outputs static HTML to `_site/`.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, under **Pages**, set the source to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
4. If you are **not** using a custom domain and the repo is a project page (i.e. served at `https://<user>.github.io/<repo>/`), set the `PATH_PREFIX` build env var (in the workflow's build step) to `/<repo>/` so asset URLs resolve correctly. Root/user pages and custom-domain setups can leave it as `/`.

## Structure

- `src/` — Eleventy source (templates, partials, assets, data)
- `src/_data/site.json` — site name, nav, tagline
- `eleventy.config.js` — Eleventy config
- `scraped-content/` — raw extracted copy from the live site, used as source material while rebuilding pages (not part of the build output)
