import clsx from "clsx";
import { PhoneIcon } from "lucide-react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <>
      <footer
        className={clsx(
          "bg-black w-full flex flex-col items center py-4 gap-8 sm:flex-row sm:flex-wrap sm:justify-around sm:px-10 md:px-10 lg:px-40"
        )}
      >
        <section className="flex flex-col gap-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-amber-500 text-2xl">Atendimento</h1>
            <span className="flex gap-2 text-slate-50">
              <PhoneIcon />
              <p> (61) 98213-4990</p>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-amber-500 text-2xl">Siga-nos:</h1>
            <a
              className="p-2"
              href="https://www.instagram.com/fortedistribuidora.moveis/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-slate-50 w-7 h-7" />
            </a>
          </div>
        </section>

        <section className="flex flex-col items-center gap-2">
          <h1 className="text-amber-500 text-2xl">Localização</h1>
          <p className="text-slate-50">St. de Indústria QI 3 65/67 <br /> Ceilândia, Brasília - DF, 72265-030</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.93706725829364!2d-48.14986554723257!3d-15.804319100380788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bcb4726104499%3A0xe31b65fc927bc7fc!2sForte%20Distribuidora%20de%20M%C3%B3veis!5e0!3m2!1spt-BR!2sbr!4v1761524981913!5m2!1spt-BR!2sbr"
            width="250"
            height="250"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        <section className="flex flex-col items-center gap-2">
          <h1 className="text-amber-500 text-2xl">Links</h1>
          <ul className="text-slate-50 flex flex-col gap-3 items-center">
            <Link href="#">Início</Link>
            <Link href="#">Loja Física</Link>
            <Link href="#">Sobre</Link>
            <Link href="#">Contato</Link>
            <Link href="#">Quarto</Link>
            <Link href="#">Sala de estar</Link>
            <Link href="#">Sala de jantar</Link>
          </ul>
        </section>

        <section className="text-center">
          <h1 className="text-amber-500 text-2xl">Horário de Funcionamento</h1>
          <span className="text-slate-50 text-center">
            <p className="font-bold">Segunda a sexta-feira</p>
            <p>08h às 17h30</p>
            <p className="font-bold">Sábado</p>
            <p>08h às 12h30</p>
          </span>
        </section>
      </footer>
      <section className="text-center w-full bg-black p-6">
        <p className="text-slate-50">
          Copyright &copy; {new Date().getFullYear()}
        </p>
        <p className="text-slate-50">Todos os direitos reservados.</p>
      </section>
    </>
  );
}
