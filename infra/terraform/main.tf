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
