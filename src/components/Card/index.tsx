import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
}

export function Card ({children, className} : CardProps) {
  return (
    <div
      className={clsx(
        "border-2 border-amber-400 rounded-2xl transition-transform duration-300 hover:scale-102 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}