import { groq } from 'next-sanity'
import { client } from "@/sanity/lib/client";

const productsForSitemapQuery = groq`
  *[
    _type == "product" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ]{
    "slug": slug.current,
    category,
    _updatedAt
  }
`

export type SitemapProduct = {
  slug: string
  category: string
  _updatedAt: string
}

export async function getProductsForSitemap(): Promise<SitemapProduct[]> {
  const products = await client.fetch<SitemapProduct[]>(
    productsForSitemapQuery
  )

  return products
}
