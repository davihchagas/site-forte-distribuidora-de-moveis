// src/utils/categoryToRoute.ts
const CATEGORY_ROUTE_MAP: Record<string, string> = {
  sala_de_estar: "sala-de-estar",
  sala_de_jantar: "sala-de-jantar",
  quarto: "quarto",
};

export function categoryToRoute(cat: string) {
  return CATEGORY_ROUTE_MAP[cat] ?? cat;
}
