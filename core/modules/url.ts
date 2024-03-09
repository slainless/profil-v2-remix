export function stripURL(url: string | URL) {
  const newUrl = new URL(url)
  newUrl.search = ""
  newUrl.hash = ""
  return newUrl.href
}
