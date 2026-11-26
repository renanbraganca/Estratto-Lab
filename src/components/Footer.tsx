import { ESTRATTO_BRAND } from '../data/estrattoData';
import { AppView } from '../types/proposal';

interface FooterProps {
  currentView: AppView;
  onNavigateView: (view: AppView) => void;
}

export function Footer({ currentView, onNavigateView }: FooterProps) {
  const navigateTo = (view: AppView) => {
    onNavigateView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cream border-t border-ink/15 text-ink">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-ink/12 items-start">
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold text-crimson tracking-tight">
                {ESTRATTO_BRAND.name}
              </span>
              <span className="text-xs text-ink-muted">
                {ESTRATTO_BRAND.descriptor}
              </span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              {ESTRATTO_BRAND.closingQuote}
            </p>
          </div>

          <div className="md:col-span-4 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">
              Contato · {ESTRATTO_BRAND.origin}
            </p>
            <div className="space-y-1 text-sm text-ink">
              <p>
                <a
                  href={`https://wa.me/${ESTRATTO_BRAND.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono tabular-nums hover:text-crimson transition-colors"
                >
                  {ESTRATTO_BRAND.phoneDisplay}
                </a>
              </p>
              <p className="text-ink-muted">
                {ESTRATTO_BRAND.website} · {ESTRATTO_BRAND.instagram}
              </p>
            </div>
          </div>

          <div className="md:col-span-3 md:text-right space-y-2.5">
            <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">
              Navegação &amp; Modelo
            </p>
            <div className="flex flex-col md:items-end gap-2 text-sm">
              {currentView !== 'proposal' && (
                <button
                  type="button"
                  onClick={() => navigateTo('proposal')}
                  className="font-semibold text-crimson hover:text-ink transition-colors cursor-pointer w-fit"
                >
                  Visualizar Proposta
                </button>
              )}
              {currentView !== 'presentation' && (
                <button
                  type="button"
                  onClick={() => navigateTo('presentation')}
                  className="font-medium text-ink hover:text-crimson transition-colors cursor-pointer w-fit"
                >
                  Apresentação Comercial
                </button>
              )}
              <button
                type="button"
                onClick={() => navigateTo(currentView === 'editor' ? 'proposal' : 'editor')}
                className="text-xs font-medium text-ink-muted hover:text-ink underline underline-offset-4 transition-colors cursor-pointer w-fit"
              >
                {currentView === 'editor'
                  ? 'Voltar para proposta'
                  : 'Personalizar modelo · Gerar link'}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-muted">
          <span>© {new Date().getFullYear()} Estratto Estúdio Colaborativo</span>
          <span>Collab · Branding · Estratégia</span>
        </div>
      </div>
    </footer>
  );
}
