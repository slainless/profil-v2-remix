export const isCloudflare = () =>
  typeof navigator == "object" && navigator.userAgent === "Cloudflare-Workers"
