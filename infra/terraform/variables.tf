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
