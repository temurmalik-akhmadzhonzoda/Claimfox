export function assetUrl(path: string) {
  try {
    return new URL(`../assets/${path}`, import.meta.url).href
  } catch (e) {
    return `/assets/${path}`
  }
}
