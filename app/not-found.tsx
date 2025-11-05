import ErrorMessage from "@/src/components/ErrorMessage";

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle="Página não encontrada!"
      content="Erro 404 - A página que você está tentando acessar não existe nesse
          site"
      contentTitle="404"
    />
  );
}