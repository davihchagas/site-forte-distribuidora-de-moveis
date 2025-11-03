import { client } from "@/sanity/lib/client";
import { SimpleProductCard } from "../models/product";
import { homeProductsQuery } from "@/sanity/queries";

interface HomeProductsData {
  all: SimpleProductCard[];
  byCategory: Record<string, SimpleProductCard | null>;
}

export async function getHomeProduct(): Promise<HomeProductsData> {
  const data = await client.fetch<HomeProductsData>(homeProductsQuery);
  return data;
}