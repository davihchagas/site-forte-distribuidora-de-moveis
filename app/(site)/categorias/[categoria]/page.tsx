// app/categorias/[categoria]/page.tsx
import { Content } from "@/src/components/Content";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/src/components/Card";
import { urlFor } from "@/sanity/lib/image";
import { WhatsAppButton } from "@/src/components/WhatsAppButton";
import { SimpleProductCard } from "@/src/models/product";

type PageParams = Promise<{ categoria: string }>;

function normalizeRouteCategory(raw: string) {
  return raw.toLowerCase().replace(/\/+$/, "");
}

async function getAllProducts(): Promise<SimpleProductCard[]> {
  return client.fetch<SimpleProductCard[]>(
    `*[_type == "product"]{
      name,
      price,
      "currentSlug": slug.current,
      "mainImage": images[0],
      category
    } | order(_createdAt desc)`
  );
}

export default async function CategoriaPage({
  params,
}: {
  params: PageParams;
}) {
  const { categoria } = await params;
  const routeCategory = normalizeRouteCategory(categoria);

  const allProducts = await getAllProducts();

  const wanted = [
    routeCategory,
    routeCategory.replace(/-/g, "_"),
    routeCategory.replace(/_/g, "-"),
  ];

  const products = allProducts.filter((p) => {
    const cat =
      typeof p.category === "string"
        ? p.category.toLowerCase().trim()
        : "";
    return wanted.includes(cat);
  });

  const title =
    routeCategory === "sala-de-estar"
      ? "Sala de estar"
      : routeCategory === "sala-de-jantar"
      ? "Sala de jantar"
      : routeCategory === "quarto"
      ? "Quarto"
      : routeCategory;

  return (
    <Content>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start">
        {title}
      </h1>

      {products.length === 0 ? (
        <p className="text-slate-500">
          Nenhum produto encontrado para <strong>{routeCategory}</strong>.
        </p>
      ) : (
        <section className="flex flex-wrap gap-6 mt-4 justify-center xl:justify-between">
          {products.map((product) => (
            <Card
              key={product.currentSlug}
              className="w-100 flex flex-col justify-between"
            >
              <Link
                href={`/categorias/${routeCategory}/${product.currentSlug}`}
                className="block"
              >
                {product.mainImage ? (
                  <Image
                    src={urlFor(product.mainImage)
                      .width(500)
                      .height(500)
                      .url()}
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
                <h2 className="font-semibold mt-2">{product.name}</h2>
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
                  href={`/categorias/${routeCategory}/${product.currentSlug}`}
                  className="text-slate-50 bg-amber-400 w-full p-3 text-center font-bold rounded-3xl hover:opacity-70 transition"
                >
                  Mais informações
                </Link>
              </div>
            </Card>
          ))}
        </section>
      )}
    </Content>
  );
}
