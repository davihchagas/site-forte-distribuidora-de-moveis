// app/page.tsx
import { client } from "@/sanity/lib/client";
import { Content } from "@/src/components/Content";
import Banner from "@/public/banner-topo.png";
import Image from "next/image";
import { CiWarning } from "react-icons/ci";
import { homeProductsQuery } from "@/sanity/queries";
import ProductsCarousel from "@/src/components/ProductsCarousel";
import { SimpleProductCard } from "@/src/models/product";

// Dados esperados da query
interface HomeProductsData {
  all: SimpleProductCard[];
  byCategory: Record<string, SimpleProductCard | null>;
}

async function getData(): Promise<HomeProductsData> {
  const data = await client.fetch<HomeProductsData>(homeProductsQuery);
  return data;
}

export default async function Home() {
  const { all } = await getData();

  // separação por categoria
  const salaDeEstar = all.filter((p) => p.category === "sala_de_estar");
  const salaDeJantar = all.filter((p) => p.category === "sala_de_jantar");
  const quarto = all.filter((p) => p.category === "quarto");

  return (
    <Content>
      <Image
        src={Banner}
        alt="Móveis com preço de fábrica e pronta entrega. Compre e leve na hora!"
        priority
      />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400">
        PREÇO DE ATACADO TODO DIA!
      </h1>

      <span className="flex items-center gap-2 text-slate-500 md:text-2xl">
        <CiWarning className="text-3xl" />
        <h1>Retirada apenas na loja. Não realizamos entregas nem montagem.</h1>
      </span>

      {/* CARROSSEIS DE PRODUTOS */}
      <div className="flex justify-center xl:justify-between gap-12 mt-10 flex-wrap">
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start">
            Quarto
          </h2>
          <ProductsCarousel products={quarto} />
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start">
            Sala de estar
          </h2>
          <ProductsCarousel products={salaDeEstar} />
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start">
            Sala de jantar
          </h2>
          <ProductsCarousel products={salaDeJantar} />
        </section>
      </div>
    </Content>
  );
}
