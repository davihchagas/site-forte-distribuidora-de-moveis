import { getProductsForSitemap } from '@/src/lib/sitemap-data'
import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.fortedistribuidorademoveis.com.br'

function categoryToSlug(category: string) {
  return category
    .normalize('NFD') // remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/_/g, '-')   // troca _ por -
    .replace(/\s+/g, '-') // troca espaços por -
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProductsForSitemap()

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
  
  const validProducts = products.filter(
    (product) => product.category && product.slug
  )

  const categorySet = new Set<string>()
  for (const product of validProducts) {
    categorySet.add(product.category)
  }

  const categoryPages: MetadataRoute.Sitemap = Array.from(categorySet).map(
    (category) => ({
      url: `${baseUrl}/categorias/${encodeURIComponent(
        categoryToSlug(category)
      )}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  )

  const productPages: MetadataRoute.Sitemap = validProducts.map((product) => ({
    url: `${baseUrl}/categorias/${encodeURIComponent(
      categoryToSlug(product.category)
    )}/${encodeURIComponent(product.slug)}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
