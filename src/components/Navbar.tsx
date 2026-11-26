import { ArrowRight, ArrowLeft } from 'lucide-react';
import { AppView } from '../types/proposal';

interface NavbarProps {
  currentView: AppView;
  onNavigateView: (view: AppView) => void;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'metodo', label: 'Método' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'time', label: 'Time' },
];

export function Navbar({
  currentView,
  onNavigateView,
  onNavigateSection,
}: NavbarProps) {
  const isProposal = currentView === 'proposal';

  return (
    <header className="sticky top-0 z-40 h-16 bg-cream/95 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => {
            onNavigateView('presentation');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-crimson whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson"
          aria-label="Estratto — Voltar ao início"
        >
          ESTRATTO
        </button>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-muted"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigateSection(link.id)}
              className="hover:text-ink transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-crimson focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center shrink-0">
          {isProposal ? (
            <button
              type="button"
              onClick={() => {
                onNavigateView('presentation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-ink bg-cream-muted hover:bg-ink hover:text-cream border border-ink/15 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Apresentação</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onNavigateView('proposal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-cream bg-crimson hover:bg-crimson-deep transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span>Visualizar Proposta</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
