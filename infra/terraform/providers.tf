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
