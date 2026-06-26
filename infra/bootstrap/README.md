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
