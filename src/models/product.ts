// src/models/product.ts
import type { PortableTextBlock } from "@portabletext/types";
// Categorias válidas do Sanity
export type ProductCategory = "sala_de_estar" | "sala_de_jantar" | "quarto";

// Referência de asset do Sanity (quando não é expandido com asset->)
export interface SanityImageRef {
  _type: "reference";
  _ref: string;
}

// Asset completo (quando vem com asset->)
export interface SanityImageAsset {
  _id?: string;
  _type?: "sanity.imageAsset";
  url?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
    lqip?: string;
  };
}

// Estrutura de imagem padrão no Sanity
export interface SanityImage {
  _type?: "image";
  asset: SanityImageRef | SanityImageAsset;
  alt?: string;
}

// Conjunto de dimensões (dimensionSet)
export interface ProductDimension {
  label?: string;
  height?: number;
  width?: number;
  depth?: number;
}

// Seções adicionais (extraSections)
export interface ProductExtraSection {
  title?: string;
  // Se estiver usando o Portable Text, troque por PortableTextBlock[]
  content?: PortableTextBlock[];
}

// Produto completo (página de produto)
export interface ProductFull {
  _id?: string;
  name: string;
  price: number;
  slug: { current: string };
  category: ProductCategory;
  images?: SanityImage[];
  colors?: string[];
  features?: string[];
  dimensions?: ProductDimension[];
  extraSections?: ProductExtraSection[];
  sku?: string;
  shortDescription?: string;
}

// Produto simples (para cards e listagens)
export interface SimpleProductCard {
  name: string;
  price: number;
  currentSlug: string;
  category: ProductCategory | string;
  mainImage?: SanityImage;
}
