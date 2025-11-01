import { Menu } from "@/src/components/Menu";
import { Container } from "@/src/components/Container";
import { Footer } from "@/src/components/Footer";
import { WhatsAppButton } from "@/src/components/WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container>
        <Menu />
        {children}
        <Footer />
      </Container>

      <WhatsAppButton
        size={40}
        classes="p-2 fixed bottom-4 right-4 md:right-11 md:bottom-11"
        message="Olá! Vi o site da loja e gostaria de mais informações."
      />
    </>
  );
}
