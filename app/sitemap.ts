import { getProductsForSitemap } from '@/src/lib/sitemap-data'
import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.fortedistribuidorademoveis.com.br/' // troque pelo domínio real

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProductsForSitemap()

  // Páginas fixas principais
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/loja-fisica`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Categorias únicas, extraídas dos produtos
  const categorySet = new Set<string>()
  for (const product of products) {
    if (product.category) {
      categorySet.add(product.category)
    }
  }

  const categoryPages: MetadataRoute.Sitemap = Array.from(categorySet).map(
    (category) => ({
      url: `${baseUrl}/categorias/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  )

  // Páginas de produto: /categorias/[categoria]/[produto]
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/categorias/${product.category}/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
