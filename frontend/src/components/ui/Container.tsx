export function Container({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen h-full bg-white">
      {/* Onda en la parte superior */}
      <div className="w-full h-[600px] absolute bottom-0 left-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fillOpacity="0.2"
            fill="var(--color-accent)"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Contenido */}
      <section
        className={`relative z-10 px-8 py-8 flex flex-col gap-8 h-full ${className}`}
      >
        {children}
      </section>
    </div>
  );
}
