"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/src/components/Card";
import { WhatsAppButton } from "@/src/components/WhatsAppButton";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { SimpleProductCard, SanityImage } from "@/src/models/product";
import { ProductImage } from "@/src/components/ProductImage";
import { categoryToRoute } from "@/src/utils/categoryToRoute";
import { buildImageUrl } from "@/src/utils/buildImageUrl";

type Props = {
  products: SimpleProductCard[];
  idx: number;
};

export default function ProductsCarousel({ products, idx }: Props) {
  const [index, setIndex] = useState(idx);

  const total = products?.length ?? 0;
  const visible = 1;

  // Preload das imagens na montagem
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!products || products.length === 0) return;

    products.forEach((product) => {
      if (!product.mainImage) return;
      const img = new window.Image();
      img.src = buildImageUrl(product.mainImage as SanityImage, 500, 500);
    });
  }, [products]);

  // retorno condicional depois dos hooks
  if (!products || products.length === 0) {
    return <p className="text-slate-400">Nenhum produto nesta categoria.</p>;
  }

  function prev() {
    if (total === 0) return;
    setIndex((prevIndex) => (prevIndex - 1 + total) % total);
  }

  function next() {
    if (total === 0) return;
    setIndex((prevIndex) => (prevIndex + 1) % total);
  }

  const current = Array.from({ length: Math.min(visible, total) }).map(
    (_, i) => products[(index + i) % total]
  );

  return (
    <div className="relative">
      <div className="flex gap-6 overflow-hidden px-1 py-2">
        {current.map((product) => {
          const catRoute = categoryToRoute(product.category);

          return (
            <Card
              key={product.currentSlug}
              className="min-w-[220px] w-60 sm:w-80 md:w-90 lg:w-100 flex flex-col justify-between"
            >
              <ProductImage product={product} />

              <div className="flex flex-col px-3 py-2">
                <h3 className="font-semibold mt-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-amber-600 font-bold">
                  R$ {product.price?.toLocaleString("pt-BR")},00
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
