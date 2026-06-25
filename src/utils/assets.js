/**
 * Resolve a path to a file in `public/` using Vite's configured base URL.
 * Works for root hosting (base: "/") and subfolder hosting (base: "/olm/").
 */
export function asset(path) {
  const normalized = String(path).replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}
