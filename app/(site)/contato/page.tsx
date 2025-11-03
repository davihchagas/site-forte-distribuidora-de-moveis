import { Content } from "@/src/components/Content";
import { WhatsAppButton } from "@/src/components/WhatsAppButton";
import clsx from "clsx";
import { IoMdTime } from "react-icons/io";

export default function Contact() {
  const spanClass = clsx("flex items-center gap-2 md:text-2xl");
  return (
    <Content>
      <div>
        <section className="flex flex-col gap-4 sm:text-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400 text-start">
            Fale conosco
          </h1>
          <p>
            Entre em contato por meio do WhatsApp, clicando no botão abaixo:
          </p>
          <WhatsAppButton
            size={40}
            classes="py-3 px-4 text-slate-50 w-fit h-fit"
            message="Olá! Vi o site da loja e gostaria de mais informações."
          >
            Fale Conosco!
          </WhatsAppButton>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400">
            Horário de Funcionamento
          </h1>
          <span className="flex flex-col gap-2">
            <p className="font-bold md:text-2xl">Segunda a sexta-feira</p>
            <span className={spanClass}>
              <IoMdTime />
              <p>08h às 17h30</p>
            </span>
            <p className="font-bold md:text-2xl">Sábado</p>
            <span className={spanClass}>
              <IoMdTime />
              <p>08h às 12h30</p>
            </span>
          </span>
        </section>
      </div>
    </Content>
  );
}
