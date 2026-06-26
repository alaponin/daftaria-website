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
