import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { PresentationView } from './components/PresentationView';
import { ProposalView } from './components/ProposalView';
import { StudioEditorView } from './components/StudioEditorView';
import { DEFAULT_DINAMICA_PROPOSAL } from './data/estrattoData';
import { AppView, ProposalConfig } from './types/proposal';
import { decodeProposalFromParam } from './utils/proposalCodec';

function resolveInitialState(): { proposal: ProposalConfig; view: AppView } {
  if (typeof window === 'undefined') {
    return { proposal: DEFAULT_DINAMICA_PROPOSAL, view: 'presentation' };
  }
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('p');
  const requestedView = params.get('view');
  const decoded = encoded ? decodeProposalFromParam(encoded) : null;

  return {
    proposal: decoded ?? DEFAULT_DINAMICA_PROPOSAL,
    view: requestedView === 'proposta' ? 'proposal' : 'presentation',
  };
}

export default function App() {
  const initial = resolveInitialState();
  const [proposal, setProposal] = useState<ProposalConfig>(initial.proposal);
  const [currentView, setCurrentView] = useState<AppView>(initial.view);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    if (currentView === 'presentation' && pendingSection) {
      const targetId = pendingSection;
      setPendingSection(null);
      window.requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [currentView, pendingSection]);

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'presentation') {
      setPendingSection(sectionId);
      setCurrentView('presentation');
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProposal = () => {
    setCurrentView('proposal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPresentation = () => {
    setCurrentView('presentation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-cream text-ink selection:bg-crimson selection:text-cream">
        <Navbar
          currentView={currentView}
          onNavigateView={setCurrentView}
          onNavigateSection={handleNavigateSection}
        />

        <div className="flex-1">
          {currentView === 'presentation' && (
            <PresentationView
              proposal={proposal}
              onOpenProposal={handleOpenProposal}
            />
          )}

          {currentView === 'proposal' && (
            <ProposalView
              proposal={proposal}
              onUpdateProposal={setProposal}
              onBackToPresentation={handleBackToPresentation}
            />
          )}

          {currentView === 'editor' && (
            <StudioEditorView
              currentProposal={proposal}
              onApplyProposal={setProposal}
              onPreviewPresentation={(updated) => {
                setProposal(updated);
                setCurrentView('presentation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPreviewProposal={(updated) => {
                setProposal(updated);
                setCurrentView('proposal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </div>

        <Footer currentView={currentView} onNavigateView={setCurrentView} />
      </div>
    </MotionConfig>
  );
}
