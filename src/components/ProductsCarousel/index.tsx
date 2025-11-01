// src/components/ProductsCarousel.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/src/components/Card";
import { urlFor } from "@/sanity/lib/image";
import { WhatsAppButton } from "@/src/components/WhatsAppButton";
import { categoryToRoute } from "@/src/utils/categoryToRoute";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { SimpleProductCard, SanityImage } from "@/src/models/product";

type Props = {
  products: SimpleProductCard[];
};

function buildImageUrl(img: SanityImage, w: number, h: number) {
  // quando vier expandido: images[]{..., asset->}
  if ("url" in img.asset && img.asset.url) {
    return img.asset.url;
  }
  // quando vier só a referência
  return urlFor(img).width(w).height(h).url();
}

export default function ProductsCarousel({ products }: Props) {
  const [index, setIndex] = useState(0);

  if (!products || products.length === 0) {
    return <p className="text-slate-400">Nenhum produto nesta categoria.</p>;
  }

  const visible = 1;
  const total = products.length;

  function prev() {
    if (total === 0) return;
    setIndex((prev) => (prev - 1 + total) % total);
  }

  function next() {
    if (total === 0) return;
    setIndex((prev) => (prev + 1) % total);
  }

  // janela circular
  const current = Array.from({ length: Math.min(visible, total) }).map(
    (_, i) => products[(index + i) % total]
  );

  return (
    <div className="relative">
      <div className="flex gap-6 overflow-hidden px-1 py-2">
        {current.map((product) => {
          const catRoute = categoryToRoute(product.category);
          const hasImage = Boolean(product.mainImage);
          return (
            <Card
              key={product.currentSlug}
              className="min-w-[220px] w-60 sm:w-80 md:w-90 lg:w-100 flex flex-col justify-between"
            >
              <Link
                href={`/categorias/${catRoute}/${product.currentSlug}`}
                className="block"
              >
                {hasImage && product.mainImage ? (
                  <Image
                    src={buildImageUrl(product.mainImage, 500, 500)}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="rounded-t-2xl object-cover"
                  />
                ) : (
                  <div className="w-[500px] h-[500px] bg-gray-100 flex items-center justify-center text-gray-500">
                    Sem imagem
                  </div>
                )}
              </Link>
              <div className="flex flex-col px-3 py-2">
                <h3 className="font-semibold mt-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-amber-600 font-bold">
                  R$ {product.price?.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="p-3 flex flex-col gap-3">
                <WhatsAppButton
                  size={30}
                  classes="text-slate-50 w-full p-2 justify-center font-bold border-none"
                  message={`Olá, tenho interesse em comprar o produto ${product.name} no valor de R$ ${product.price}!`}
                >
                  Compre agora
                </WhatsAppButton>
                <Link
                  href={`/categorias/${catRoute}/${product.currentSlug}`}
                  className="text-slate-50 bg-amber-400 w-full p-3 text-center font-bold rounded-3xl hover:opacity-70 transition"
                >
                  Mais informações
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {total > visible ? (
        <>
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-amber-400 rounded-full shadow p-1 hover:scale-105 transition"
            aria-label="Anterior"
          >
            <CiCircleChevLeft className="text-3xl text-white" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-amber-400 rounded-full shadow p-1 hover:scale-105 transition"
            aria-label="Próximo"
          >
            <CiCircleChevRight className="text-3xl text-white" />
          </button>
        </>
      ) : null}
    </div>
  );
}
