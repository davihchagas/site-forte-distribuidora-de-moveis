import type { Metadata } from "next";
import "./globals.css";

const baseUrl = 'https://www.fortedistribuidorademoveis.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Forte - Distribuidora de Móveis",
    template: "%s | Forte - Distribuidora de Móveis",
  },
  icons: { icon: "/favicon.ico" },
  description: 'Móveis para sala de estar, sala de jantar e quarto.',
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: "Forte - Distribuidora de Móveis",
    title: "Forte - Distribuidora de Móveis",
    description: "Móveis com preço de fábrica e pronta entrega. Compre e leve na hora!",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: "Logo da Forte - Distribuidora de Móveis"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
