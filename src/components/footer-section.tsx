export function FooterSection() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-primary">Notia</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#privacy" className="hover:text-foreground">
            Privacidade
          </a>
          <a href="#terms" className="hover:text-foreground">
            Termos
          </a>
          <a href="#contact" className="hover:text-foreground">
            Contato
          </a>
        </nav>
      </div>
    </footer>
  );
}
