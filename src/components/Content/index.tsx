type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps) {
  return (
      <div className="py-40 px-10 lg:px-40 sm:px-20">{children}</div>
  );
}