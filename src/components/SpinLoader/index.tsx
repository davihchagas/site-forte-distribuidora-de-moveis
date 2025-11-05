import clsx from "clsx";

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className = "" }: SpinLoaderProps) {
  const classes = clsx(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    className
  );

  return (
    <div className={classes}>
      <div
        className={clsx(
          "w-10 h-10",
          "border-5 border-t-transparent border-slate-900",
          "rounded-full",
          "animate-spin"
        )}
      ></div>
      <p
        className={clsx(
          "text-4xl/normal font-bold py-8",
          "sm:text-5xl/normal sm:py-10",
          "md:text-6xl/normal md:py-11",
          "lg:text-7xl/normal lg:py-12",
          "xl:text-8xl/normal xl:py-13"
        )}
      >
        Aguarde
      </p>
    </div>
  );
}