export function AsideLogoPanel() {
  return (
    <aside className="relative hidden overflow-hidden lg:block">
      <div className="relative z-10 flex h-full items-center justify-center">
        <img
          src={"/logo.png"}
          alt="Ilustração de estudo/organização"
          className="h-40 object-cover"
        />
      </div>

      {/* gradiente do aside (fixo) */}
      <div
        className="from-secondary/30 via-secondary/40 to-secondary/50 absolute inset-0 bg-gradient-to-br"
        aria-hidden
      />
    </aside>
  );
}
