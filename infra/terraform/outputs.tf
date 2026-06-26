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
