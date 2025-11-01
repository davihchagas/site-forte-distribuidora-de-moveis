// app/page.tsx
import { client } from "@/sanity/lib/client";
import { Content } from "@/src/components/Content";
import Banner from "@/public/banner-topo.png";
import Image from "next/image";
import { CiWarning } from "react-icons/ci";
import { homeProductsQuery } from "@/sanity/queries";
import ProductsCarousel from "@/src/components/ProductsCarousel";
import { SimpleProductCard } from "@/src/models/product";
import Link from "next/link";
import { Card } from "@/src/components/Card";
import { GrMoney, GrStatusGood } from "react-icons/gr";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

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

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center">
        PREÇO DE ATACADO TODO DIA!
      </h1>

      <section className="flex justify-center my-3">
        <div className="flex flex-wrap justify-evenly gap-4 w-full">
          <Card className="text-amber-400 p-3 text-center w-30 h-30 md:text-2xl md:w-50 md:h-50 justify-center flex flex-col items-center">
            <IoShieldCheckmarkOutline />
            <p>Garantia</p>
          </Card>
          <Card className="text-amber-400 p-3 text-center w-30 h-30 md:text-2xl md:w-50 md:h-50 justify-center flex flex-col items-center">
            <GrMoney />
            <p> Pagamento á vista, pix ou dinheiro</p>
          </Card>
          <Card className="text-amber-400 p-3 text-center w-30 h-30 md:text-2xl md:w-50 md:h-50 justify-center flex flex-col items-center">
            <BsBoxSeam />
            <p>Disponíveis para retirada</p>
          </Card>
          <Card className="text-amber-400 p-3 text-center w-30 h-30 md:text-2xl md:w-50 md:h-50 justify-center flex flex-col items-center">
            <GrStatusGood />
            <p>Móveis de qualidade</p>
          </Card>
        </div>
      </section>

      <span className="flex items-center gap-2 text-slate-500 md:text-2xl">
        <CiWarning className="text-3xl" />
        <h1>Retirada apenas na loja. Não realizamos entregas nem montagem.</h1>
      </span>

      {/* CARROSSEIS DE PRODUTOS */}
      <div className="flex justify-center text-center xl:justify-between gap-12 mt-10 flex-wrap">
        <section>
          <Link
            href="/categorias/quarto"
            className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start"
          >
            Quarto
          </Link>
          <ProductsCarousel products={quarto} />
          <Link
            href="/categorias/quarto"
            className="md:text-2xl my-4 text-amber-400 text-center"
          >
            ⭢ Ver tudo de Quarto
          </Link>
        </section>

        <section>
          <Link
            href="/categorias/sala-de-estar"
            className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center"
          >
            Sala de estar
          </Link>
          <ProductsCarousel products={salaDeEstar} />
          <Link
            href="/categorias/sala-de-estar"
            className="md:text-2xl my-4 text-amber-400 text-center"
          >
            ⭢ Ver tudo de Sala de Estar
          </Link>
        </section>

        <section>
          <Link
            href="/categorias/sala-de-jantar"
            className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start"
          >
            Sala de jantar
          </Link>
          <ProductsCarousel products={salaDeJantar} />
          <Link
            href="/categorias/sala-de-jantar"
            className="md:text-2xl my-4 text-amber-400 text-center xl:text-start"
          >
            ⭢ Ver tudo de Sala de Jantar
          </Link>
        </section>
      </div>
    </Content>
  );
}
