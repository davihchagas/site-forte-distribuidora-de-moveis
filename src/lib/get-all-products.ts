import { client } from "@/sanity/lib/client";

export interface ProductPath {
  slug: string;
  category: string;
}

export async function getAllProducts(): Promise<ProductPath[]> {
  const query = `*[_type == "product" && defined(slug.current) && defined(category->slug.current)]{
    "slug": slug.current,
    "category": category->slug.current
  }`;

  return await client.fetch<ProductPath[]>(query);
}
