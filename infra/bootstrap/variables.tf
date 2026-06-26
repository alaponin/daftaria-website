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
