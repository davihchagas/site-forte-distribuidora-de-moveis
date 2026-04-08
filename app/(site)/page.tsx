// app/page.tsx
import { Content } from "@/src/components/Content";
import Banner from "@/public/banner-topo.png";
import Image from "next/image";
import { CiWarning } from "react-icons/ci";
import { Card } from "@/src/components/Card";
import { GrMoney, GrStatusGood } from "react-icons/gr";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import clsx from "clsx";
import { getHomeProduct } from "@/src/lib/get-home-products";
import { Metadata } from "next";
import { Suspense } from "react";
import { SpinLoader } from "@/src/components/SpinLoader";
import HomeProducts from "@/src/components/HomeProducts";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const { all } = await getHomeProduct();

  // separação por categoria
  const cardClasses = clsx(
    "text-amber-400 p-3 text-center w-30 h-30 md:text-2xl md:w-50 md:h-50 justify-center flex flex-col items-center",
  );

  return (
    <Content>
      <Image
        src={Banner}
        alt="Móveis com preço de fábrica e pronta entrega. Compre e leve na hora!"
        priority
      />

      <div className="flex justify-center items-end gap-2 text-amber-400 my-4">
        <a
          href="https://www.instagram.com/fortedistribuidora.moveis/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex gap-1 text-2xl sm:text-3xl md:text-4xl hover:opacity-60 transition">
            <FaInstagram className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10" />
            <p className="text-lg sm:text-4xl">fortedistribuidora.moveis</p>
          </span>
        </a>
      </div>

      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold my-4 text-black text-center">
        O melhor centro de distribuição de móveis de Ceilândia!
      </h1>

      <section>
        <Suspense fallback={<SpinLoader />}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400 text-center xl:text-start">
            Nossos Móveis
          </h1>
          <HomeProducts products={all} />
        </Suspense>
      </section>

      <section className="flex justify-center my-15">
        <div className="flex flex-wrap justify-evenly gap-4 w-full">
          <Card className={cardClasses}>
            <IoShieldCheckmarkOutline />
            <p>Garantia</p>
          </Card>
          <Card className={cardClasses}>
            <GrMoney />
            <p> Pagamento á vista, pix ou dinheiro</p>
          </Card>
          <Card className={cardClasses}>
            <BsBoxSeam />
            <p>Disponíveis para retirada</p>
          </Card>
          <Card className={cardClasses}>
            <GrStatusGood />
            <p>Móveis de qualidade</p>
          </Card>
        </div>
      </section>

      <span className="flex items-center gap-2 text-slate-500 md:text-2xl justify-center">
        <CiWarning className="text-3xl" />
        <h1>Retirada apenas na loja. Não realizamos entregas nem montagem.</h1>
      </span>
    </Content>
  );
}
