import { client } from "@/sanity/lib/client";
import { SimpleProductCard } from "../models/product";
import { homeProductsQuery } from "@/sanity/queries";
import { cache } from "react";

interface HomeProductsData {
  all: SimpleProductCard[];
  byCategory: Record<string, SimpleProductCard | null>;
}

export const getHomeProduct = cache(async (): Promise<HomeProductsData> => {
  const data = await client.fetch<HomeProductsData>(homeProductsQuery);
  return data;
});
