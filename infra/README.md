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
