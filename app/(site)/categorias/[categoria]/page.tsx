// app/categorias/[categoria]/page.tsx
import { Content } from "@/src/components/Content";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/src/components/Card";
import { urlFor } from "@/sanity/lib/image";
import { WhatsAppButton } from "@/src/components/WhatsAppButton";
import { normalizeRouteCategory } from "@/src/utils/normalizeRoute";
import { getCategoryProducts } from "@/src/lib/get-category-products";
import { Metadata } from "next";
import { getHomeProduct } from "@/src/lib/get-home-products";

type PageParams = Promise<{ categoria: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { categoria } = await params;
  const routeCategory = normalizeRouteCategory(categoria);


  const title =
    routeCategory === "sala-de-estar"
      ? "Sala de Estar"
      : routeCategory === "sala-de-jantar"
      ? "Sala de Jantar"
      : routeCategory === "quarto"
      ? "Quarto"
      : routeCategory;
  return {
    title
  }
}

export async function generateStaticParams() {
  const { all } = await getHomeProduct();

  // Gera as categorias únicas com normalização
  const categoriasSet = new Set<string>();

  for (const produto of all) {
    const categoria =
      typeof produto.category === "string"
        ? normalizeRouteCategory(produto.category.toLowerCase().trim())
        : null;

    if (categoria) categoriasSet.add(categoria);
  }

  const categorias = Array.from(categoriasSet);

  // 🔧 IMPORTANTE: precisa retornar objetos com a chave 'categoria'
  return categorias.map((categoria) => ({ categoria }));
}
export default async function CategoriaPage({
  params,
}: {
  params: PageParams;
}) {
  
  const { categoria } = await params;
  const routeCategory = normalizeRouteCategory(categoria);

  const allProducts = await getCategoryProducts();

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
      ? "Sala de Estar"
      : routeCategory === "sala-de-jantar"
      ? "Sala de Jantar"
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
          {products.map((product, idx) => (
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
                    priority={idx < 4}
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
