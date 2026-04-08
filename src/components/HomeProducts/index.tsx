'use client'

import { SimpleProductCard } from "@/src/models/product";
import { buildImageUrl } from "@/src/utils/buildImageUrl";
import { useEffect } from "react";
import { Card } from "../Card";
import { categoryToRoute } from "@/src/utils/categoryToRoute";
import { ProductImage } from "../ProductImage";
import { WhatsAppButton } from "../WhatsAppButton";
import Link from "next/link";
import { isValidSanityImage } from "@/src/utils/sanityImage";

type Props = {
  products: SimpleProductCard[];
};

export default function HomeProducts({ products }: Props) {
  // Preload das imagens na montagem
 useEffect(() => {
  if (typeof window === "undefined") return;
  if (!products || products.length === 0) return;

  products.forEach((product) => {
    const validImages = (product.images ?? []).filter(isValidSanityImage);

    validImages.forEach((image) => {
      const img = new window.Image();
      img.src = buildImageUrl(image, 500, 500);
    });
  });
}, [products]);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4 justify-center md:justify-between">
      {products.map((product) => {
        const catRoute = categoryToRoute(product.category);

        return (
          <Card
            key={product.currentSlug}
            className="w-40 sm:w-80 md:w-90 lg:w-90 flex flex-col justify-center"
          >
            <ProductImage product={product} />

            <div className="flex flex-col px-3 py-2">
              <h3 className="font-semibold mt-2 line-clamp-2">{product.name}</h3>
              <p className="text-amber-600 font-bold">
                R$ {product.price?.toLocaleString("pt-BR")},00
              </p>
              <p className="text-sm">À vista no Pix ou dinheiro.</p>
              <p className="text-sm">Cartão, consultar taxas.</p>
            </div>

            <div className="p-3 flex flex-col gap-3 ">
              <WhatsAppButton
                size={22.5}
                classes="text-slate-50 w-full p-1 sm:p-2 justify-center font-bold border-none text-xs sm:text-lg"
                message={`Olá, tenho interesse em comprar o produto ${product.name} no valor de R$ ${product.price}!`}
              >
                Compre Agora
              </WhatsAppButton>

              <Link
                href={`/categorias/${catRoute}/${product.currentSlug}`}
                className="text-slate-50 bg-amber-400 w-full p-1 sm:p-2 text-center font-bold rounded-3xl hover:opacity-70 transition text-xs sm:text-lg"
              >
                Mais Informações
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}