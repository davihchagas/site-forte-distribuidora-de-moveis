export function routeToSanityCategory(route: string): string {
  return route.replace(/-/g, "_");
}