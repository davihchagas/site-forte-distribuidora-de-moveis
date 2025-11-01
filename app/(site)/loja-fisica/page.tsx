import { Content } from "@/src/components/Content";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import FachadaLoja from "@/public/loja.webp";

export default function Loja() {
  return (
    <Content>
      <section className="flex flex-col justify-around gap-10 xl:flex-row">
        <section className="flex flex-col gap-5">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400">
            Forte - Distribuidora de Móveis - Ceilândia
          </h1>
          <Image 
          src={FachadaLoja}
          alt="fachada da loja"
          priority>
          </Image>
        </section>
        <section className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400">Endereço</h1>
          <span className="flex gap-2 items-center">
            <FaLocationDot />
            <p className="font-bold md:text-2xl">
              St. de Indústria QI 3 65/67 Ceilândia, Brasília - DF, 72265-030
            </p>
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400">
            Horário de Funcionamento
          </h1>
          <span className="flex flex-col gap-2">
            <p className="font-bold md:text-2xl">Segunda a sexta-feira</p>
            <span className="flex items-center gap-2 md:text-2xl">
              <IoMdTime />
              <p>08h às 17h30</p>
            </span>
            <p className="font-bold md:text-2xl">Sábado</p>
            <span className="flex items-center gap-2 md:text-2xl">
              <IoMdTime />
              <p>08h às 12h30</p>
            </span>
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400">Contato</h1>
          <span className="flex items-center gap-2 md:text-2xl">
            <FaWhatsapp />
            <p>(61) 98213-4990</p>
          </span>
          
        </section>
      </section>
      <section className="flex flex-col gap-4 sm:items-center py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-400">Localização</h1>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.93706725829364!2d-48.14986554723257!3d-15.804319100380788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bcb4726104499%3A0xe31b65fc927bc7fc!2sForte%20Distribuidora%20de%20M%C3%B3veis!5e0!3m2!1spt-BR!2sbr!4v1761524981913!5m2!1spt-BR!2sbr"
            width="250"
            height="250"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
      </section>
    </Content>
  );
}
