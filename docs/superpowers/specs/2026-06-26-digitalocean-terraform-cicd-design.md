# Design: Terraform + GitHub CI/CD for the Daftaria static site on DigitalOcean

**Date:** 2026-06-26
**Status:** Approved (design phase)

## Summary

The Daftaria website is a purely static React + Vite single-page app. It builds
to `dist/` with no backend, no API, and no server-side rendering. This design
provisions hosting on **DigitalOcean App Platform** (static site component) via
**Terraform**, with **GitHub Actions** driving CI and deploys, and all
credentials stored securely (never in the repo).

Hosting cost: **$0** (App Platform free static tier).
Terraform state storage on DO Spaces: **~$5/mo**.

## Goals

- Reproducible, version-controlled infrastructure (Terraform).
- CI/CD through GitHub: PRs gated by lint + build; deploys driven explicitly by
  GitHub Actions (not DO auto-deploy).
- All credentials stored securely — encrypted at rest, never committed,
  exposed only to reviewer-gated jobs.
- Custom domain attached with auto-managed TLS; DNS remains at the existing
  registrar (managed outside Terraform).

## Non-Goals

- No droplet/VM, no nginx, no container registry — unnecessary for a static SPA.
- No OIDC keyless auth: DigitalOcean does not support GitHub OIDC federation, so
  a stored (but secured) DO API token is required.
- No DNS management in Terraform (DNS lives elsewhere by decision).

## Architecture

```
GitHub repo (main)
  │
  ├─ PR  ──────────────▶ GHA ci.yml          (npm ci → lint → build)
  │                      GHA terraform.yml    (fmt → validate → plan, commented on PR)
  │
  └─ merge to main ────▶ GHA terraform.yml → terraform apply   (production env, reviewer-gated)
                         GHA deploy.yml    → doctl apps create-deployment --wait
                                                │
                                                ▼
                         DO App Platform: pulls repo, runs `npm run build`,
                         publishes /dist to global CDN + auto TLS
```

## Repo Layout

```
infra/
  bootstrap/          # run ONCE, locally: creates the Spaces bucket that holds TF state
    main.tf
    variables.tf
    README.md
  terraform/
    backend.tf        # S3 backend → DO Spaces, use_lockfile = true (TF 1.10+)
    providers.tf      # digitalocean provider, pinned versions
    variables.tf      # domain, region, repo, branch (non-secret)
    main.tf           # digitalocean_app  (static_site)
    outputs.tf        # app id, default *.ondigitalocean.app URL, live domain
    terraform.tfvars  # non-secret values, committed
.github/workflows/
  ci.yml              # PR + push: lint + build check
  terraform.yml       # PR: plan;  main: apply (production environment)
  deploy.yml          # main: trigger DO deployment via doctl
.gitignore            # add: .terraform/, *.tfstate*, *.auto.tfvars secrets
```

## Components

### 1. App Platform static site (`infra/terraform/main.tf`)

A single `digitalocean_app` resource with one `static_site` component:

- `github { repo = var.github_repo, branch = "main", deploy_on_push = false }`
  — auto-deploy is **off** so GitHub Actions is the sole gatekeeper.
- `build_command = "npm run build"`
- `output_dir = "/dist"`
- `source_dir = "/"`
- `environment_slug = "node-js"`
- A `domain` block attaches `var.domain_name`. Because DNS lives elsewhere, the
  registrar gets a single CNAME pointing at the app hostname; App Platform then
  auto-provisions a Let's Encrypt certificate.

### 2. Terraform state backend (`infra/terraform/backend.tf`)

S3-compatible backend pointed at DO Spaces:

- `endpoints.s3 = "https://<region>.digitaloceanspaces.com"`
- `bucket = "<state-bucket>"`, `key = "daftaria-website/terraform.tfstate"`
- `region = "us-east-1"` (placeholder required by the AWS SDK; Spaces ignores it)
- `encrypt = true`
- `use_lockfile = true` — native S3 state locking (Terraform ≥ 1.10), so no
  DynamoDB equivalent is needed.
- `skip_credentials_validation`, `skip_metadata_api_check`,
  `skip_region_validation`, `skip_requesting_account_id` all `true` (non-AWS).

Spaces access keys are supplied to the backend via `AWS_ACCESS_KEY_ID` /
`AWS_SECRET_ACCESS_KEY` env vars in CI (sourced from GitHub Secrets), never in
files.

### 3. Bootstrap (`infra/bootstrap/`)

Run once, locally, to break the chicken-and-egg of "backend needs a bucket that
Terraform hasn't created yet":

- Creates a private DO Spaces bucket for state with versioning enabled and a
  lifecycle that keeps prior versions.
- Uses **local state** (the bootstrap stack is small and rarely changes; its
  state can be committed-excluded or kept locally).
- Documented in `infra/bootstrap/README.md`.

### 4. Secrets (GitHub Encrypted Secrets)

Stored in a `production` GitHub **Environment** protected by **required
reviewers** and restricted to the `main` branch:

| Secret | Purpose |
| --- | --- |
| `DIGITALOCEAN_ACCESS_TOKEN` | Scoped DO API token (apps read/write) — used by the provider and `doctl`. |
| `SPACES_ACCESS_KEY_ID` | Spaces key — **only** for the Terraform state backend. |
| `SPACES_SECRET_ACCESS_KEY` | Spaces secret — **only** for the Terraform state backend. |

No secrets are ever committed. `.gitignore` excludes `.terraform/`,
`*.tfstate*`, and any `*.auto.tfvars` that could hold secrets.

### 5. GitHub Actions workflows

- **`ci.yml`** — on PR and push: `npm ci`, `npm run lint`, `npm run build`.
  Fast feedback; no secrets required.
- **`terraform.yml`** — on PR touching `infra/**`: `terraform fmt -check`,
  `validate`, `plan` (plan posted as a PR comment). On push to `main`:
  `terraform apply` inside the reviewer-gated `production` environment.
- **`deploy.yml`** — on push to `main` (after CI passes): install `doctl`,
  authenticate with `DIGITALOCEAN_ACCESS_TOKEN`, then
  `doctl apps create-deployment <app-id> --wait`. The app id comes from a
  Terraform output (or a `doctl apps list` lookup by app name).

## Deploy Flow

1. PR opened → `ci.yml` (lint + build) and `terraform.yml` (plan comment) run.
2. Merge to `main` → `terraform.yml` applies infra changes (reviewer-gated) →
   `deploy.yml` triggers a DO deployment.
3. DO App Platform pulls the repo, runs `npm run build`, and publishes `dist/`
   to the global CDN with auto TLS.

## One-Time Manual Steps (cannot be Terraformed)

1. Authorize the **DigitalOcean GitHub app** on this repository (App Platform
   needs OAuth access to read source for builds).
2. Create a scoped DO API token and a Spaces access key pair.
3. Add the three secrets to the `production` GitHub Environment.
4. `cd infra/bootstrap && terraform apply` to create the state bucket.
5. Add the **CNAME** at the registrar pointing `var.domain_name` at the app
   hostname (visible after the first apply / in the DO console).

## Security Posture

- State bucket is private, encrypted, and versioned.
- Secrets live only in GitHub's encrypted store and are exposed only to
  reviewer-gated `production` jobs restricted to `main`.
- DO API token is minimally scoped (apps read/write).
- TLS is auto-managed by App Platform (Let's Encrypt) once the CNAME resolves.

## Open Variables

- `domain_name` — the custom domain (looks like `daftaria.*`); filled in
  `terraform.tfvars`. Not shared yet; left as a required variable.
- `github_repo` — `owner/repo` slug for the App Platform source.
- `region` — DO region for Spaces and the app (e.g. `fra1`, `nyc3`).

## Cost

- App Platform static site: **$0** (free static tier, up to 3 free static sites).
- DO Spaces (state storage only): **~$5/mo** minimum. If avoiding this charge
  matters later, HCP Terraform's free tier can hold state at no cost — but the
  chosen approach keeps everything on DigitalOcean.
