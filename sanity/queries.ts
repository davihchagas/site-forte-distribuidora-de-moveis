// sanity/queries.ts
export const homeProductsQuery = `
{
  "all": *[_type == "product"]{
    name,
    price,
    "currentSlug": slug.current,
    "mainImage": images[0],
    category
  } | order(_createdAt desc),

  "byCategory": {
    "sala_de_estar": *[_type == "product" && category == "sala_de_estar"][0]{
      name,
      price,
      "currentSlug": slug.current,
      "mainImage": images[0],
      category
    },
    "sala_de_jantar": *[_type == "product" && category == "sala_de_jantar"][0]{
      name,
      price,
      "currentSlug": slug.current,
      "mainImage": images[0],
      category
    },
    "quarto": *[_type == "product" && category == "quarto"][0]{
      name,
      price,
      "currentSlug": slug.current,
      "mainImage": images[0],
      category
    }
  }
}
`;
