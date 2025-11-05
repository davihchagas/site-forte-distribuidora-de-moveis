import { client } from "@/sanity/lib/client";
import { SimpleProductCard } from "../models/product";
import { cache } from "react";

export const getCategoryProducts = cache(async (): Promise<SimpleProductCard[]> => {
  const query = `*[_type == "product"]{
      name,
      price,
      "currentSlug": slug.current,
      "mainImage": images[0],
      category
    } | order(_createdAt desc)`;

  return client.fetch<SimpleProductCard[]>(query);
});
