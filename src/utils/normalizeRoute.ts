export function normalizeRouteCategory(raw: string) {
  return raw.toLowerCase().replace(/\/+$/, "");
}