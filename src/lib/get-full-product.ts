import { cache } from "react";
import { ProductFull } from "../models/product";
import { client } from "@/sanity/lib/client";

export const getFullProduct = cache(
  async (
    produto: string,
    sanityCategory: string
  ): Promise<ProductFull | null> => {
    const query = `*[_type == "product" && slug.current == $slug && category == $category][0]{
    name,
    price,
    "slug": slug.current,
    category,
    shortDescription,
    colors,
    features,
    dimensions[] {
      label,
      height,
      width,
      depth
    },
    images[] {
      ...,
      asset->
    },
    extraSections[] {
      title,
      content
    },
    sku
  }`;

    return client.fetch<ProductFull | null>(query, {
      slug: produto,
      category: sanityCategory,
    });
  }
);
