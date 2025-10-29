import { client } from "@/sanity/lib/client";
import { Content } from "@/src/components/Content";
import { groq } from 'next-sanity';
import Banner from '@/public/banner-topo.png'
import Image from "next/image";
import { CiWarning } from "react-icons/ci";

export default async function Home() {

  const products = await client.fetch(groq `*[_type=="product"]`);
  console.log(products)

  return (
    <Content>
      <Image 
      src={Banner}
      alt="Móveis com preço de fábrica e pronta entrega. Compre e leve na hora!"
      priority
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-amber-400">PREÇO DE ATACADO TODO DIA!</h1>
      <span className="flex items-center gap-2 text-slate-500 md:text-2xl">
        <CiWarning className="text-3xl" />
      <h1>Retirada apenas na loja. Não realizamos entregas nem montagem.</h1>
      </span>
    </Content>
  );
}
