"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import LOGO from "@/public/LOGO.jpg";
import clsx from "clsx";
import Link from "next/link";
import {
  BedDoubleIcon,
  InfoIcon,
  LampIcon,
  PhoneIcon,
  SofaIcon,
  StoreIcon,
  MenuIcon,
  XIcon,
  ChevronDown,
  HomeIcon,
} from "lucide-react";

export function Menu() {
  const [open, setOpen] = useState(false); // menu mobile
  const [openCatsMobile, setOpenCatsMobile] = useState(false); // submenu mobile
  // adicione no topo do componente:
  const [openCatsDesktop, setOpenCatsDesktop] = useState(false);

  // fecha o menu ao clicar fora (mobile)
  const navRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenCatsMobile(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const baseLink =
    "flex items-center justify-start gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40";

  return (
    <header ref={navRef} className="w-full bg-black text-slate-50 fixed z-200">
      {/* Barra superior */}
      <nav className="flex items-center justify-between py-3 px-6 sm:px-6 md:px-10 lg:px-40 z-10">
        {/* Logo responsiva com next/image otimizada */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Página inicial"
        >
          <Image
            src={LOGO}
            alt="logo"
            width={180} // resolução base mais alta garante nitidez
            height={108} // proporcional
            priority
            sizes="(max-width: 639px) 140px, (max-width: 1023px) 160px, 180px"
            className="h-auto w-[140px] sm:w-40 md:w-[180px]"
          />
        </Link>

        {/* Ações à direita */}
        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-1">
          <Link href="/" className={baseLink}>
            <HomeIcon className="size-4" />
            <span>Início</span>
          </Link>
          <Link href="/loja-fisica" className={baseLink}>
            <StoreIcon className="size-4" />
            <span>Loja Física</span>
          </Link>

          <Link href="/sobre" className={baseLink}>
            <InfoIcon className="size-4" />
            <span>Sobre</span>
          </Link>

          <Link href="/contato" className={baseLink}>
            <PhoneIcon className="size-4" />
            <span>Contato</span>
          </Link>

          {/* Submenu desktop */}
          {/* Submenu desktop (sem flicker) */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setOpenCatsDesktop(true)}
            onMouseLeave={() => setOpenCatsDesktop(false)}
          >
            <button
              className={clsx(baseLink, "select-none")}
              aria-haspopup="menu"
              aria-expanded={openCatsDesktop}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpenCatsDesktop(false);
              }}
            >
              <ChevronDown
                className={clsx(
                  "size-4 transition-transform",
                  openCatsDesktop ? "rotate-180" : "rotate-0"
                )}
              />
              <span>Categorias</span>
            </button>

            {/* Menu sem gap — colado ao botão */}
            {openCatsDesktop && (
              <div
                className="absolute right-0 top-full z-50 min-w-56 rounded-xl border border-white/10 bg-zinc-900/95 p-2 shadow-xl backdrop-blur-md"
                role="menu"
              >
                <Link
                  href="/categorias/quarto"
                  className={baseLink}
                  role="menuitem"
                >
                  <BedDoubleIcon className="size-4" /> Quarto
                </Link>
                <Link
                  href="/categorias/sala-de-estar"
                  className={baseLink}
                  role="menuitem"
                >
                  <SofaIcon className="size-4" /> Sala de Estar
                </Link>
                <Link
                  href="/categorias/sala-de-jantar"
                  className={baseLink}
                  role="menuitem"
                >
                  <LampIcon className="size-4" /> Sala de Jantar
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: hambúrguer */}
        <button
          className="sm:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {open ? (
            <XIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>
      </nav>

      {/* Menu colapsável mobile */}
      <div
        className={clsx(
          "sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-96" : "max-h-0"
        )}
        aria-hidden={!open}
      >
        <div className="px-4 pb-4 flex flex-col gap-1">
          <Link
            href="/"
            className={baseLink}
            onClick={() => setOpen((v) => !v)}
          >
            <HomeIcon className="size-4" />
            Início
          </Link>
          <Link
            href="/loja-fisica"
            className={baseLink}
            onClick={() => setOpen((v) => !v)}
          >
            <StoreIcon className="size-4" />
            Loja Física
          </Link>
          <Link
            href="/sobre"
            className={baseLink}
            onClick={() => setOpen((v) => !v)}
          >
            <InfoIcon className="size-4" />
            Sobre
          </Link>
          <Link
            href="/contato"
            className={baseLink}
            onClick={() => setOpen((v) => !v)}
          >
            <PhoneIcon className="size-4" />
            Contato
          </Link>

          {/* Submenu mobile */}
          <div className="mt-1">
            <button
              className={clsx(baseLink, "w-full justify-between")}
              onClick={() => setOpenCatsMobile((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={openCatsMobile}
            >
              <span className="flex items-center gap-2">
                <ChevronDown
                  className={clsx(
                    "size-4 transition-transform",
                    openCatsMobile ? "rotate-180" : "rotate-0"
                  )}
                />{" "}
                Categorias
              </span>
            </button>
            <div
              className={clsx(
                "overflow-hidden transition-[max-height] duration-300 ease-in-out pl-6",
                openCatsMobile ? "max-h-64" : "max-h-0"
              )}
              role="menu"
            >
              <Link
                href="/categorias/quarto"
                className={baseLink}
                role="menuitem"
                onClick={() => setOpen((v) => !v)}
              >
                <BedDoubleIcon className="size-4" /> Quarto
              </Link>
              <Link
                href="/categorias/sala-de-estar"
                className={baseLink}
                role="menuitem"
                onClick={() => setOpen((v) => !v)}
              >
                <SofaIcon className="size-4" /> Sala de Estar
              </Link>
              <Link
                href="/categorias/sala-de-jantar"
                className={baseLink}
                role="menuitem"
                onClick={() => setOpen((v) => !v)}
              >
                <LampIcon className="size-4" /> Sala de Jantar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
