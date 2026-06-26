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
