type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps) {
  return (
      <div className="py-30 px-10 sm:py-40 md:py-40 lg:px-40 sm:px-20">{children}</div>
  );
}