import { Content } from "@/src/components/Content";

export default function About() {
  return (
    <Content>
      <section className="flex flex-col gap-3 sm:text-2xl text-justify">
      <h1 className="text-2xl md:text-3xl font-bold text-amber-400 text-start">
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
      <h3 className="text-2xl md:text-3xl font-bold text-amber-400 text-start">Seja nosso parceiro!</h3>
        <p>
          Você é lojista ou vendedor online? Aproveite a oportunidade de ter um fornecedor de confiança ao seu lado!
        </p>
        <ul className="text-left max-w-lG space-y-2 list-disc list-inside">
          <li>Produtos de alta qualidade à pronta entrega</li>
          <li>Preços competitivos e condições exclusivas</li>
          <li>Atendimento personalizado e ágil</li>
          <li>Margem de lucro atraente</li>
          <li>Acesso completo ao catálogo de produtos</li>
        </ul>
      </section>
    </Content>
  )
}