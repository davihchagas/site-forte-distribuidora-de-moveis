// app/studio/layout.tsx
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Renderiza só o conteúdo do Studio, sem o layout global
  return <>{children}</>;
}
