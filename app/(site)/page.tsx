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
import { FaArrowRight } from "react-icons/fa";
import clsx from "clsx";

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
  const seeMoreClasses = clsx("md:text-2xl my-2 text-amber-400 text-center xl:text-start flex items-center justify-center gap-2 font-extrabold")

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

      {/* CARROSSEIS DE PRODUTOS */}
      <div className="flex justify-center text-center xl:justify-between gap-12 mt-10 flex-wrap">
        <section>
          <Link
            href="/categorias/quarto"
            className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start"
          >
            Quarto
          </Link>
          <ProductsCarousel products={quarto} idx={0} />
          <Link
            href="/categorias/quarto"
            className={seeMoreClasses}
          >
            <FaArrowRight />
            <p>Ver tudo de Quarto</p>
          </Link>
        </section>

        <section>
          <Link
            href="/categorias/sala-de-estar"
            className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center"
          >
            Sala de Estar
          </Link>
          <ProductsCarousel products={salaDeEstar} idx={4} />
          <Link
            href="/categorias/sala-de-estar"
            className={seeMoreClasses}
          >
            <FaArrowRight />
            <p>Ver tudo de Sala de Estar</p>
          </Link>
        </section>

        <section>
          <Link
            href="/categorias/sala-de-jantar"
            className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start"
          >
            Sala de Jantar
          </Link>
          <ProductsCarousel products={salaDeJantar} idx={0} />
          <Link
            href="/categorias/sala-de-jantar"
            className={seeMoreClasses}
          >
            <FaArrowRight />
            <p>Ver tudo de Sala de Jantar</p>
          </Link>
        </section>
      </div>

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
    </Content>
  );
}
