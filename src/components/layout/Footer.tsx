/**
 * Footer minimalista con enlace de donaciones
 * No intrusivo, visible solo en desktop
 */
const Footer = () => {
  return (
    <footer className="hidden md:block py-6 border-t border-border mt-auto">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="text-muted-foreground">
            EMERGES TES - Guía de Protocolos
          </span>
          <span className="text-muted-foreground">•</span>
          <a
            href="https://ko-fi.com/emergestes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Apoya el proyecto EMERGES TES"
            title="Ayuda a mantener EMERGES TES gratuito"
          >
            ☕ Apóyanos
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
