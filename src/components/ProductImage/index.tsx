"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SimpleProductCard } from "@/src/models/product";
import { categoryToRoute } from "@/src/utils/categoryToRoute";
import { buildImageUrl } from "@/src/utils/buildImageUrl";

type Props = {
  product: SimpleProductCard;
};

export function ProductImage({ product }: Props) {
  const [loaded, setLoaded] = useState(false);
  const catRoute = categoryToRoute(product.category);
  const hasImage = Boolean(product.mainImage);

  return (
    <Link
      href={`/categorias/${catRoute}/${product.currentSlug}`}
      className="block"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-gray-100">
        {hasImage && product.mainImage ? (
          <>
            {/* Skeleton enquanto carrega */}
            {!loaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}

            <Image
              src={buildImageUrl(product.mainImage, 500, 500)}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 260px"
              className={`object-cover transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() => setLoaded(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
            Sem imagem
          </div>
        )}
      </div>
    </Link>
  );
}
