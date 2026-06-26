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

3. **Add Repository secrets** (Settings → Secrets and variables → Actions →
   **Repository secrets**) so every workflow job can read them:

   | Secret | Value |
   | --- | --- |
   | `DIGITALOCEAN_ACCESS_TOKEN` | DO API token from step 2 |
   | `SPACES_ACCESS_KEY_ID` | Spaces access key from step 2 |
   | `SPACES_SECRET_ACCESS_KEY` | Spaces secret from step 2 |

   **Create the GitHub `production` Environment** (repo Settings → Environments).
   The `apply` and `deploy` jobs declare `environment: production`, which gives you
   a deployment history/audit trail under the repo's Environments tab.
   - **Solo trunk-based (default): leave protection rules OFF** — no required
     reviewers, no wait timer — so pushes to `main` apply and deploy without any
     manual approval click. (You are the only one who can push to `main`, so the
     push itself is the gate.)
   - If you later want a deliberate "are you sure" pause before prod changes, add
     **Required reviewers** to this environment; the `apply`/`deploy` jobs will then
     block on approval. No workflow change needed.
   - Credentials are read from the repository secrets above, not from the
     environment.

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

## Day-to-day (trunk-based — push straight to `main`)

- App/UI changes: push to `main` → `CI` runs lint+build → on success `Deploy`
  triggers a DO deployment (DO rebuilds from source).
- Infra changes under `infra/terraform/**`: push to `main` → `Terraform` runs
  `plan` (shown in the run's **job summary**) then applies the saved plan. Review
  the plan in the summary; if you want to see it before it lands, run
  `terraform plan` locally first (export the three env vars as in step 4).
- Branches/PRs are optional. `CI` still runs on pull requests if you ever open one,
  but the normal flow needs no PR.

## Notes

- If you change the state bucket name/region in `bootstrap/`, update
  `terraform/backend.tf` to match — the backend block cannot read variables.
- Spaces region slugs (`fra1`) differ from App Platform region slugs (`fra`).
- DigitalOcean Spaces' support for S3 native state locking (`use_lockfile`) is not
  guaranteed across all regions. The `concurrency` guards on the `apply`/`deploy`
  workflow jobs are the primary defense against concurrent state writes. After the
  first bootstrap, you can sanity-check locking by starting two overlapping
  `terraform plan` runs and confirming one is rejected.
- On a combined first push to `main`, the `deploy` workflow (gated only on CI
  success) can race ahead of `terraform apply` creating the App Platform app,
  producing an "App not found" failure. Running the first `apply` locally (as
  step 6 above instructs) avoids this race.
- The bootstrap stack keeps Terraform state locally (`infra/bootstrap/terraform.tfstate`)
  and that file is git-ignored. Back it up — losing it requires re-importing the
  bucket before any future bucket changes can be managed by Terraform.
