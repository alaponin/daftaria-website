# DigitalOcean Terraform + GitHub CI/CD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provision the Daftaria static site on DigitalOcean App Platform with Terraform, and drive CI/CD through GitHub Actions, with all credentials stored securely.

**Architecture:** A two-stack Terraform setup — a one-time `bootstrap` stack that creates the DO Spaces bucket holding remote state, and a `terraform` stack defining a single App Platform static-site app whose state lives in that bucket. GitHub Actions runs lint/build on PRs, applies Terraform on merge to `main` (reviewer-gated `production` environment), and triggers the DO deployment via `doctl` after CI passes. Secrets live only in GitHub Encrypted Secrets; nothing sensitive is committed.

**Tech Stack:** Terraform ≥ 1.10 (S3 backend with `use_lockfile`), `digitalocean/digitalocean` provider ~> 2.43, GitHub Actions, `doctl`, Vite/React static build (`npm run build` → `dist/`).

## Global Constraints

- Terraform `required_version = ">= 1.10.0"` (native S3 state locking via `use_lockfile`).
- Provider: `digitalocean/digitalocean`, `version = "~> 2.43"`.
- GitHub repo slug: `alaponin/daftaria-website`.
- Node version in CI: `20`.
- Build: `build_command = "npm run build"`, `output_dir = "/dist"`, `source_dir = "/"`, `environment_slug = "node-js"`.
- App Platform auto-deploy is OFF (`deploy_on_push = false`) — GitHub Actions is the sole deploy gatekeeper.
- DNS lives at the registrar (NOT in Terraform). Terraform only attaches the domain to the app.
- Two distinct region values: **Spaces region** uses slugs like `fra1`/`nyc3`; **App Platform region** uses slugs like `fra`/`nyc`. Do not interchange them.
- Secrets exist only in GitHub Encrypted Secrets, in a `production` Environment with required reviewers, restricted to `main`. Never commit secrets.
- State-backend credentials are passed to Terraform via `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` (the S3 backend reads these); the Spaces keys supply those values. The DO API token is passed via `DIGITALOCEAN_ACCESS_TOKEN`.

---

### Task 1: Git ignore rules + bootstrap stack (Spaces state bucket)

Creates the one-time stack that provisions the private, versioned Spaces bucket holding remote Terraform state, and the ignore rules that keep state/secret files out of git. This stack uses **local state** and is applied manually once.

**Files:**
- Modify: `.gitignore` (append Terraform rules)
- Create: `infra/bootstrap/main.tf`
- Create: `infra/bootstrap/variables.tf`
- Create: `infra/bootstrap/README.md`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a private DO Spaces bucket named `var.state_bucket_name` (default `daftaria-tfstate`) in `var.spaces_region` (default `fra1`). Task 2's `backend.tf` relies on this bucket name and region.

- [ ] **Step 1: Append Terraform ignore rules to `.gitignore`**

Append these lines to the end of `.gitignore`:

```gitignore

# Terraform
**/.terraform/*
*.tfstate
*.tfstate.*
crash.log
crash.*.log
*.tfvars.secret
override.tf
override.tf.json
*_override.tf
*_override.tf.json
.terraform.lock.hcl
!infra/terraform/.terraform.lock.hcl
```

(`terraform.tfvars` is intentionally NOT ignored — it holds only the non-secret domain name and is committed. The bootstrap stack's local `terraform.tfstate` IS ignored.)

- [ ] **Step 2: Create `infra/bootstrap/variables.tf`**

```hcl
variable "state_bucket_name" {
  description = "Name of the Spaces bucket that stores Terraform remote state."
  type        = string
  default     = "daftaria-tfstate"
}

variable "spaces_region" {
  description = "DO Spaces region slug (e.g. fra1, nyc3, ams3)."
  type        = string
  default     = "fra1"
}
```

- [ ] **Step 3: Create `infra/bootstrap/main.tf`**

```hcl
terraform {
  required_version = ">= 1.10.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.43"
    }
  }
}

# Credentials come from the environment:
#   DIGITALOCEAN_ACCESS_TOKEN   - DO API token
#   SPACES_ACCESS_KEY_ID        - Spaces access key  (data-plane for the bucket)
#   SPACES_SECRET_ACCESS_KEY    - Spaces secret key
provider "digitalocean" {}

resource "digitalocean_spaces_bucket" "state" {
  name   = var.state_bucket_name
  region = var.spaces_region
  acl    = "private"

  versioning {
    enabled = true
  }
}

output "state_bucket" {
  value = digitalocean_spaces_bucket.state.name
}

output "state_endpoint" {
  value = "https://${var.spaces_region}.digitaloceanspaces.com"
}
```

- [ ] **Step 4: Create `infra/bootstrap/README.md`**

````markdown
# Bootstrap: Terraform state bucket

Run this **once**, locally, before the main `infra/terraform` stack. It creates the
private, versioned DO Spaces bucket that holds remote Terraform state. It uses
local state (the resulting `terraform.tfstate` is git-ignored).

## Prerequisites

- Terraform >= 1.10 and (optionally) `doctl` installed.
- A DO API token and a Spaces access key pair (see `../README.md`).

## Run

```bash
cd infra/bootstrap
export DIGITALOCEAN_ACCESS_TOKEN=...   # DO API token
export SPACES_ACCESS_KEY_ID=...        # Spaces key
export SPACES_SECRET_ACCESS_KEY=...    # Spaces secret
terraform init
terraform apply
```

If you change `state_bucket_name` or `spaces_region` here, update
`infra/terraform/backend.tf` to match (the backend block cannot read variables).
````

- [ ] **Step 5: Format and validate the bootstrap stack**

Run:
```bash
terraform -chdir=infra/bootstrap fmt
terraform -chdir=infra/bootstrap init -backend=false
terraform -chdir=infra/bootstrap validate
```
Expected: `fmt` reports no changes (or rewrites then exits clean), `validate` prints `Success! The configuration is valid.`

(If Terraform is not installed locally, this verification is performed by the executor's environment; record that it was skipped if it cannot be run.)

- [ ] **Step 6: Commit**

```bash
git add .gitignore infra/bootstrap/
git commit -m "feat(infra): bootstrap stack for Terraform state bucket"
```

---

### Task 2: Main Terraform stack (App Platform static site)

Defines the App Platform static-site app and wires remote state to the bootstrap bucket.

**Files:**
- Create: `infra/terraform/providers.tf`
- Create: `infra/terraform/backend.tf`
- Create: `infra/terraform/variables.tf`
- Create: `infra/terraform/main.tf`
- Create: `infra/terraform/outputs.tf`
- Create: `infra/terraform/terraform.tfvars`

**Interfaces:**
- Consumes: the Spaces bucket `daftaria-tfstate` in `fra1` from Task 1.
- Produces: a `digitalocean_app.website` resource and outputs `app_id`, `default_url`, `live_url`. Task 5's deploy workflow finds the app by its spec name `daftaria-website`.

- [ ] **Step 1: Create `infra/terraform/providers.tf`**

```hcl
terraform {
  required_version = ">= 1.10.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.43"
    }
  }
}

# Token via DIGITALOCEAN_ACCESS_TOKEN env var.
provider "digitalocean" {}
```

- [ ] **Step 2: Create `infra/terraform/backend.tf`**

The S3 backend points at DO Spaces. Backend blocks cannot use variables, so the
bucket name and endpoint region are hardcoded and MUST match Task 1's defaults.

```hcl
terraform {
  backend "s3" {
    bucket = "daftaria-tfstate"
    key    = "daftaria-website/terraform.tfstate"
    region = "us-east-1" # placeholder required by the AWS SDK; Spaces ignores it

    endpoints = {
      s3 = "https://fra1.digitaloceanspaces.com"
    }

    encrypt      = true
    use_lockfile = true # native S3 state locking (Terraform >= 1.10)

    # Spaces is S3-compatible but not AWS — skip AWS-specific checks.
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
  }
}
```

- [ ] **Step 3: Create `infra/terraform/variables.tf`**

```hcl
variable "github_repo" {
  description = "owner/repo slug used as the App Platform source."
  type        = string
  default     = "alaponin/daftaria-website"
}

variable "app_name" {
  description = "App Platform app name (also used to locate the app in CI)."
  type        = string
  default     = "daftaria-website"
}

variable "app_region" {
  description = "App Platform region slug (e.g. fra, nyc, ams). NOT a Spaces region."
  type        = string
  default     = "fra"
}

variable "domain_name" {
  description = "Custom domain attached to the app. DNS is managed at the registrar."
  type        = string
}
```

- [ ] **Step 4: Create `infra/terraform/main.tf`**

```hcl
resource "digitalocean_app" "website" {
  spec {
    name   = var.app_name
    region = var.app_region

    static_site {
      name             = "website"
      build_command    = "npm run build"
      output_dir       = "/dist"
      source_dir       = "/"
      environment_slug = "node-js"

      github {
        repo           = var.github_repo
        branch         = "main"
        deploy_on_push = false # GitHub Actions drives deploys, not DO.
      }

      catchall_document = "index.html" # SPA fallback so client-side routes resolve.
    }

    domain {
      name = var.domain_name
      type = "PRIMARY"
    }
  }
}
```

- [ ] **Step 5: Create `infra/terraform/outputs.tf`**

```hcl
output "app_id" {
  description = "App Platform app ID."
  value       = digitalocean_app.website.id
}

output "default_url" {
  description = "Default *.ondigitalocean.app ingress URL."
  value       = digitalocean_app.website.default_ingress
}

output "live_url" {
  description = "Live URL (custom domain once DNS resolves)."
  value       = digitalocean_app.website.live_url
}
```

- [ ] **Step 6: Create `infra/terraform/terraform.tfvars`**

Replace the placeholder with the real domain before the first apply.

```hcl
# Non-secret values. The custom domain is public.
domain_name = "daftaria.com"
```

- [ ] **Step 7: Format and validate the main stack**

Run:
```bash
terraform -chdir=infra/terraform fmt -recursive
terraform -chdir=infra/terraform init -backend=false
terraform -chdir=infra/terraform validate
```
Expected: `validate` prints `Success! The configuration is valid.`
(`init -backend=false` validates config without contacting Spaces. If Terraform is not installed locally, record that verification was deferred to CI.)

- [ ] **Step 8: Commit**

```bash
git add infra/terraform/
git commit -m "feat(infra): App Platform static-site Terraform stack"
```

---

### Task 3: CI workflow (lint + build on every PR and push)

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: nothing from earlier tasks (uses repo `package.json` scripts `lint` and `build`).
- Produces: a workflow named **`CI`** whose successful completion on `main` is the gate that Task 5's deploy workflow waits on (`workflow_run`).

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    name: Lint and build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
```

- [ ] **Step 2: Validate the workflow YAML**

Run:
```bash
python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/ci.yml')); print('valid yaml')"
```
Expected: `valid yaml`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: lint and build workflow"
```

---

### Task 4: Terraform plan/apply workflow

Plan on PRs that touch `infra/terraform/**`; apply on push to `main`, gated by the reviewer-protected `production` environment.

**Files:**
- Create: `.github/workflows/terraform.yml`

**Interfaces:**
- Consumes: the Task 2 stack at `infra/terraform`, plus GitHub Secrets `DIGITALOCEAN_ACCESS_TOKEN`, `SPACES_ACCESS_KEY_ID`, `SPACES_SECRET_ACCESS_KEY` (created manually in Task 6).
- Produces: applied infrastructure on `main`. No outputs consumed by other workflows.

- [ ] **Step 1: Create `.github/workflows/terraform.yml`**

The `plan` job runs on PRs with no environment (so plans aren't blocked by
reviewers). The `apply` job runs only on push to `main` inside the
reviewer-gated `production` environment.

```yaml
name: Terraform

on:
  pull_request:
    paths: ["infra/terraform/**", ".github/workflows/terraform.yml"]
  push:
    branches: [main]
    paths: ["infra/terraform/**", ".github/workflows/terraform.yml"]

permissions:
  contents: read

env:
  TF_IN_AUTOMATION: "true"
  DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
  # The S3 backend reads AWS_* env vars; supply the Spaces keys.
  AWS_ACCESS_KEY_ID: ${{ secrets.SPACES_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.SPACES_SECRET_ACCESS_KEY }}

jobs:
  plan:
    name: Plan
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: infra/terraform
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.10.5
      - run: terraform fmt -check -recursive
      - run: terraform init -input=false
      - run: terraform validate
      - run: terraform plan -input=false

  apply:
    name: Apply
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: production
    defaults:
      run:
        working-directory: infra/terraform
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.10.5
      - run: terraform init -input=false
      - run: terraform apply -auto-approve -input=false
```

- [ ] **Step 2: Validate the workflow YAML**

Run:
```bash
python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/terraform.yml')); print('valid yaml')"
```
Expected: `valid yaml`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/terraform.yml
git commit -m "ci: terraform plan/apply workflow"
```

---

### Task 5: Deploy workflow (trigger DO deployment after CI passes)

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: success of the **`CI`** workflow (Task 3) on `main`; GitHub Secret `DIGITALOCEAN_ACCESS_TOKEN`; the app named `daftaria-website` created by Task 2.
- Produces: a triggered App Platform deployment.

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

Runs only after the `CI` workflow concludes successfully on `main`, so a broken
build never ships. Looks the app up by name, then triggers a deployment and
waits for it to finish.

```yaml
name: Deploy

on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    branches: [main]

permissions:
  contents: read

jobs:
  deploy:
    name: Trigger App Platform deployment
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: digitalocean/action-doctl@v2
        with:
          token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}

      - name: Resolve app id
        id: app
        run: |
          APP_ID=$(doctl apps list --format ID,Spec.Name --no-header \
            | awk '$2 == "daftaria-website" {print $1}')
          if [ -z "$APP_ID" ]; then
            echo "App 'daftaria-website' not found. Has terraform apply run?" >&2
            exit 1
          fi
          echo "id=$APP_ID" >> "$GITHUB_OUTPUT"

      - name: Create deployment
        run: doctl apps create-deployment "${{ steps.app.outputs.id }}" --wait
```

- [ ] **Step 2: Validate the workflow YAML**

Run:
```bash
python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml')); print('valid yaml')"
```
Expected: `valid yaml`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy workflow triggering DO App Platform"
```

---

### Task 6: Operator runbook (one-time manual setup)

Documents the steps that cannot be Terraformed: GitHub OAuth authorization, credential creation, secret/variable setup, bootstrap apply, and the registrar CNAME. No code; this is the human handoff.

**Files:**
- Create: `infra/README.md`

**Interfaces:**
- Consumes: all prior tasks (references their files and the `production` environment).
- Produces: the operator runbook. Terminal deliverable of the plan.

- [ ] **Step 1: Create `infra/README.md`**

````markdown
# Daftaria website — DigitalOcean infrastructure

Static React/Vite site on DO App Platform, provisioned by Terraform, deployed via
GitHub Actions. See `../docs/superpowers/specs/2026-06-26-digitalocean-terraform-cicd-design.md`
for the design.

## Layout

- `bootstrap/` — one-time stack creating the Spaces bucket for Terraform state.
- `terraform/` — the App Platform app; remote state in the bootstrap bucket.
- `../.github/workflows/` — `ci.yml`, `terraform.yml`, `deploy.yml`.

## One-time setup (in order)

1. **Authorize DigitalOcean on GitHub.** In the DO Control Panel → Apps → create/connect,
   install the DigitalOcean GitHub app and grant it access to `alaponin/daftaria-website`.
   App Platform needs OAuth to read source for builds. (Cannot be Terraformed.)

2. **Create credentials.**
   - DO API token: Control Panel → API → Tokens → generate a token with **read/write** scope.
   - Spaces keys: Control Panel → API → Spaces Keys → generate an access key + secret.

3. **Create the GitHub `production` Environment** (repo Settings → Environments):
   - Add **Required reviewers** and restrict deployments to the `main` branch.
   - Add these **Environment secrets**:
     | Secret | Value |
     | --- | --- |
     | `DIGITALOCEAN_ACCESS_TOKEN` | DO API token from step 2 |
     | `SPACES_ACCESS_KEY_ID` | Spaces access key from step 2 |
     | `SPACES_SECRET_ACCESS_KEY` | Spaces secret from step 2 |

4. **Bootstrap the state bucket.**
   ```bash
   cd infra/bootstrap
   export DIGITALOCEAN_ACCESS_TOKEN=...
   export SPACES_ACCESS_KEY_ID=...
   export SPACES_SECRET_ACCESS_KEY=...
   terraform init
   terraform apply
   ```

5. **Set the domain.** Put the real domain in `terraform/terraform.tfvars`
   (`domain_name = "..."`). Commit it.

6. **First apply.** Push to `main` (or run locally with the same env vars exported):
   ```bash
   cd infra/terraform
   terraform init
   terraform apply
   ```

7. **Point DNS.** At your registrar, add a **CNAME** for the domain pointing at the
   app hostname shown by `terraform output default_url` (the `*.ondigitalocean.app`
   host). App Platform auto-provisions a Let's Encrypt certificate once it resolves.

## Day-to-day

- App/UI changes: open a PR → `CI` runs lint+build → merge to `main` → `CI` reruns →
  `Deploy` triggers a DO deployment (DO rebuilds from source).
- Infra changes under `infra/terraform/**`: PR shows a `terraform plan`; merge to
  `main` runs `terraform apply` (reviewer-gated `production`).

## Notes

- If you change the state bucket name/region in `bootstrap/`, update
  `terraform/backend.tf` to match — the backend block cannot read variables.
- Spaces region slugs (`fra1`) differ from App Platform region slugs (`fra`).
````

- [ ] **Step 2: Verify the runbook references match the codebase**

Run:
```bash
test -f infra/bootstrap/main.tf && test -f infra/terraform/backend.tf \
  && grep -q 'daftaria-website' infra/terraform/variables.tf \
  && echo "references OK"
```
Expected: `references OK`

- [ ] **Step 3: Commit**

```bash
git add infra/README.md
git commit -m "docs(infra): one-time setup runbook"
```

---

## Self-Review

**Spec coverage:**
- App Platform static site → Task 2 ✓
- DNS at registrar / domain attached only → Task 2 `domain` block + Task 6 step 7 ✓
- State in encrypted, versioned Spaces with native locking → Task 1 (bucket) + Task 2 `backend.tf` (`encrypt`, `use_lockfile`) ✓
- Secrets in reviewer-gated `production` env → Task 4 `apply` job + Task 5 + Task 6 step 3 ✓
- GitHub-driven deploy, auto-deploy off → Task 2 `deploy_on_push=false` + Task 5 `workflow_run` ✓
- CI lint/build on PRs → Task 3 ✓
- Terraform plan on PR / apply on main → Task 4 ✓
- One-time manual steps (GitHub OAuth, credentials, CNAME, bootstrap) → Task 6 ✓
- Bootstrap chicken-and-egg → Task 1 (local state) ✓

**Placeholder scan:** `domain_name = "daftaria.com"` is an explicit, called-out fill-in (Task 2 step 6, Task 6 step 5), not a hidden TODO. No other placeholders.

**Type/name consistency:** App spec name `daftaria-website` is consistent across Task 2 (`app_name` default), Task 5 (`awk '$2 == "daftaria-website"'`), and Task 6. Backend bucket `daftaria-tfstate` + region `fra1` consistent between Task 1 defaults and Task 2 `backend.tf`. Workflow name `CI` consistent between Task 3 (`name: CI`) and Task 5 (`workflows: ["CI"]`). Secret names consistent across Tasks 4, 5, 6.
