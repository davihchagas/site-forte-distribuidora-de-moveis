import { Card } from "@/src/components/Card";
import { Content } from "@/src/components/Content";
import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre"
}

export default async function About() {

  const cardClass = clsx("md:text-2xl font-bold text-amber-400 flex items-center text-center w-50 h-50 m-auto p-7");
  const titleClass = clsx("text-2xl md:text-3xl font-bold text-amber-400 text-start");
  return (
    <Content>
      <section className="flex flex-col gap-3 sm:text-2xl text-justify">
      <h1 className={titleClass}>
           Sobre a Forte - Distribuidora de Móveis - Ceilândia
      </h1>
      <p> Há 4 anos atuando no mercado, a <b>Forte - Distribuidora de Móveis - Ceilândia </b>   
        tornou-se referência em móveis de qualidade e pronta entrega. Localizada em Ceilândia, 
        a empresa se destaca pelo compromisso com lojistas e revendedores, oferecendo o <b>maior estoque da região </b>
        e condições comerciais vantajosas.
      </p>
      <p>
        Reconhecida por sua excelência, a Forte foi premiada com o <b>Prêmio Central Brasil – Destaque Empresarial 2024, </b>  
        concedido pelo Jornal Central Brasil DF, reforçando a confiança e credibilidade conquistadas no setor moveleiro.
      </p>
      <p>
        Participante ativa de <b>eventos e feiras de móveis</b>, a distribuidora busca constantemente inovação, 
        novas parcerias e produtos que atendam às demandas do mercado.
      </p>
      <h3 className={titleClass}>Seja nosso parceiro!</h3>
        <p>
          Você é lojista ou vendedor online? Aproveite a oportunidade de ter um fornecedor de confiança ao seu lado!
        </p>
        <ul className="flex flex-wrap justify-between gap-5">
          <Card className={cardClass}> <p>Produtos de alta qualidade à pronta entrega</p></Card>
          <Card className={cardClass}>Preços competitivos e condições exclusivas</Card>
          <Card className={cardClass}>Atendimento personalizado e ágil</Card>
          <Card className={cardClass}>Margem de lucro atraente</Card>
          <Card className={cardClass}>Acesso completo ao catálogo de produtos</Card>
        </ul>
      </section>
    </Content>
  )
}