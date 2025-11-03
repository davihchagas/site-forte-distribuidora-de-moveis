// app/categorias/[categoria]/[produto]/page.tsx
import { Content } from "@/src/components/Content";
import { WhatsAppButton } from "@/src/components/WhatsAppButton";
import ProductImagesCarousel from "@/src/components/ProductImagesCarousel";
import { notFound } from "next/navigation";
import { ProductDimension, ProductExtraSection } from "@/src/models/product";
import Link from "next/link";
import { routeToSanityCategory } from "@/src/utils/routeToSanity";
import { getFullProduct } from "@/src/lib/get-full-product";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type ParamsPromise = Promise<{
  categoria: string;
  produto: string;
}>;

export default async function ProductPage({
  params,
}: {
  params: ParamsPromise;
}) {
  const { categoria, produto } = await params;
  const sanityCategory = routeToSanityCategory(categoria);

  const data = await getFullProduct(produto, sanityCategory);

  if (!data) {
    notFound();
  }

  const {
    name,
    price,
    shortDescription,
    colors = [],
    features = [],
    dimensions = [],
    images = [],
    extraSections = [],
    sku,
  } = data ?? {};

  const whatsMsg = `Olá, tenho interesse no produto ${name} no valor de R$ ${price?.toLocaleString(
    "pt-BR"
  )}!`;

  return (
    <Content>
      <div className="flex flex-col text-slate-700 gap-5 w-fit">
        <Link href="/" className=" hover:opacity-50 transition flex items-center gap-1">
          <FaArrowAltCircleLeft />
          <p>Voltar para o Início</p>{" "}
        </Link>
        <Link
          href={`/categorias/${categoria}`}
          className=" hover:opacity-50 transition flex items-center gap-1"
        >
          <FaArrowAltCircleLeft /> <p>Voltar para a Categoria</p>{" "}
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* esquerda */}
        <div className="md:w-1/2">
          <ProductImagesCarousel images={images || []} alt={name} />
        </div>

        {/* direita */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {name}
            </h1>
            {sku && <p className="text-sm text-slate-400 mt-1">SKU: {sku}</p>}
          </div>

          <p className="text-amber-600 text-2xl font-bold">
            R$ {price?.toLocaleString("pt-BR")},00
          </p>

          {shortDescription && (
            <p className="text-slate-600 leading-relaxed">{shortDescription}</p>
          )}

          <WhatsAppButton
            size={30}
            classes="text-slate-50 w-full md:w-auto px-6 py-3 justify-center font-bold border-none"
            message={whatsMsg}
          >
            Comprar no WhatsApp
          </WhatsAppButton>

          {/* cores */}
          {Array.isArray(colors) && colors.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-slate-900">
                Cores
              </h2>
              <div className="flex flex-wrap gap-2">
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {colors.map((c, idx) => (
                    <li
                      key={`${c}-${idx}`}
                      className="bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-sm"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* informações */}
          {Array.isArray(features) && features.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-slate-900">
                Informações
              </h2>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {features.map((f, idx) => (
                  <li key={`${f}-${idx}`}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* dimensões */}
          {Array.isArray(dimensions) && dimensions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-slate-900">
                Dimensões
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {dimensions.map((dim: ProductDimension, idx) => (
                  <div
                    key={idx}
                    className="border rounded-xl p-3 bg-white shadow-sm"
                  >
                    {dim.label && (
                      <p className="font-semibold text-slate-800 mb-1">
                        {dim.label}
                      </p>
                    )}
                    <p className="text-sm text-slate-600 space-y-0.5">
                      {dim.height && `Altura: ${dim.height} cm`}
                      {dim.width && (
                        <>
                          <br />
                          Largura: {dim.width} cm
                        </>
                      )}
                      {dim.depth && (
                        <>
                          <br />
                          Profundidade: {dim.depth} cm
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* seções adicionais */}
      {Array.isArray(extraSections) && extraSections.length > 0 && (
        <div className="mt-10 space-y-8">
          {extraSections.map((sec: ProductExtraSection, idx) => (
            <section key={idx}>
              {sec.title && (
                <h2 className="text-xl font-semibold mb-3 text-slate-900">
                  {sec.title}
                </h2>
              )}
              {/* <PortableText value={sec.content} /> */}
            </section>
          ))}
        </div>
      )}
    </Content>
  );
}
