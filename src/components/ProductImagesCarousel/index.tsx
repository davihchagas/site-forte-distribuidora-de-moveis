// src/components/ProductImagesCarousel.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { SanityImage } from "@/src/models/product";

type Props = {
  images: SanityImage[];
  alt: string;
};

export default function ProductImagesCarousel({ images, alt }: Props) {
  const [index, setIndex] = useState(0);

  const hasImages = Array.isArray(images) && images.length > 0;
  const current = hasImages ? images[index] : null;

  function prev() {
    if (!hasImages) return;
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function next() {
    if (!hasImages) return;
    setIndex((prev) => (prev + 1) % images.length);
  }

  // helper para garantir que o urlFor receba algo válido
  function buildImageUrl(img: SanityImage, w: number, h?: number) {
    // se vier expandido (asset->_)
    if ("url" in img.asset && img.asset.url) {
      return img.asset.url;
    }
    // se vier como referência
    return h
      ? urlFor(img).width(w).height(h).url()
      : urlFor(img).width(w).url();
  }

  return (
    <div className="relative w-full">
      {/* área da imagem */}
      <div className="w-full rounded-2xl bg-slate-100 flex items-center justify-center min-h-80 md:min-h-[420px] overflow-hidden">
        {current ? (
          <Image
            src={buildImageUrl(current, 1200)}
            alt={current.alt || alt}
            width={1200}
            height={900}
            className="max-h-[520px] w-auto object-contain"
            priority
          />
        ) : (
          <div className="w-full h-80 flex items-center justify-center text-slate-400">
            Sem imagem
          </div>
        )}
      </div>

      {/* setas */}
      {hasImages && images.length > 1 ? (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-amber-400 rounded-full shadow p-1"
            aria-label="Imagem anterior"
          >
            <CiCircleChevLeft className="text-3xl text-white" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-amber-400 rounded-full shadow p-1"
            aria-label="Próxima imagem"
          >
            <CiCircleChevRight className="text-3xl text-white" />
          </button>
        </>
      ) : null}

      {/* miniaturas */}
      {hasImages && images.length > 1 ? (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border ${
                i === index ? "border-amber-400" : "border-transparent"
              } bg-white`}
            >
              <Image
                src={buildImageUrl(img, 200, 200)}
                alt={img.alt || alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
