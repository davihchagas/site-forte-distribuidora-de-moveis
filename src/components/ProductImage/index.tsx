"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SimpleProductCard } from "@/src/models/product";
import { categoryToRoute } from "@/src/utils/categoryToRoute";
import { buildImageUrl } from "@/src/utils/buildImageUrl";
import { isValidSanityImage } from "@/src/utils/sanityImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  product: SimpleProductCard;
};

export function ProductImage({ product }: Props) {
  const images = (product.images ?? []).filter(isValidSanityImage);

  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const catRoute = categoryToRoute(product.category);
  const currentImage = hasImages ? images[currentIndex] : null;

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Link
      href={`/categorias/${catRoute}/${product.currentSlug}`}
      className="block"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-linear-to-br from-gray-50 to-gray-100 group">
        {hasImages && currentImage ? (
          <>
            <Image
              key={currentIndex}
              src={buildImageUrl(currentImage, 900, 900)}
              alt={currentImage.alt || product.name}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 260px"
              className="object-cover transition-all duration-300 ease-in-out hover:scale-[1.02]"
            />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/45 p-1.5 sm:p-2 text-white hover:bg-black/70 transition-all duration-200"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/45 p-1.5 sm:p-2 text-white hover:bg-black/70 transition-all duration-200"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Sem imagem
          </div>
        )}
      </div>
    </Link>
  );
}