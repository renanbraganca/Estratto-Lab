import { useMemo, useState } from 'react';
import {
  Check,
  Copy,
  Eye,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import {
  BLANK_CLIENT_TEMPLATE,
  DEFAULT_DINAMICA_PROPOSAL,
} from '../data/estrattoData';
import { DeliverableItem, OptionalAddon, ProposalConfig } from '../types/proposal';
import {
  buildShareableProposalUrl,
  deleteProposalPreset,
  formatBRL,
  loadSavedProposals,
  saveProposalPreset,
} from '../utils/proposalCodec';

interface StudioEditorViewProps {
  currentProposal: ProposalConfig;
  onApplyProposal: (config: ProposalConfig) => void;
  onPreviewPresentation: (config: ProposalConfig) => void;
  onPreviewProposal: (config: ProposalConfig) => void;
}

export function StudioEditorView({
  currentProposal,
  onApplyProposal,
  onPreviewPresentation,
  onPreviewProposal,
}: StudioEditorViewProps) {
  const [draft, setDraft] = useState<ProposalConfig>(currentProposal);
  const [savedList, setSavedList] = useState<ProposalConfig[]>(() =>
    loadSavedProposals()
  );
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const shareableUrl = useMemo(() => buildShareableProposalUrl(draft), [draft]);

  const handleSavePreset = () => {
    const cleanId =
      draft.id ||
      draft.clientName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') ||
      `cliente-${Date.now()}`;
    const toSave = { ...draft, id: cleanId };
    setDraft(toSave);
    const updated = saveProposalPreset(toSave);
    setSavedList(updated);
    onApplyProposal(toSave);
    setSavedToast(true);
    window.setTimeout(() => setSavedToast(false), 2200);
  };

  const handleCreateNewClient = () => {
    const fresh: ProposalConfig = {
      ...BLANK_CLIENT_TEMPLATE,
      id: `cliente-${Date.now()}`,
    };
    setDraft(fresh);
  };

  const handleLoadPreset = (preset: ProposalConfig) => {
    setDraft(preset);
    onApplyProposal(preset);
  };

  const handleDeletePreset = (id: string) => {
    const updated = deleteProposalPreset(id);
    setSavedList(updated);
    if (draft.id === id) {
      setDraft(updated[0]);
      onApplyProposal(updated[0]);
    }
  };

  const handleCopyShareLink = async () => {
    handleSavePreset();
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  const updateDeliverable = (
    id: string,
    field: keyof DeliverableItem,
    value: string
  ) => {
    setDraft((prev) => ({
      ...prev,
      deliverables: prev.deliverables.map((d) =>
        d.id === id ? { ...d, [field]: value } : d
      ),
    }));
  };

  const addDeliverable = () => {
    const nextCode = String(draft.deliverables.length + 1).padStart(2, '0');
    setDraft((prev) => ({
      ...prev,
      deliverables: [
        ...prev.deliverables,
        {
          id: `del-${Date.now()}`,
          code: nextCode,
          title: 'Novo entregável',
          description: 'Descrição objetiva da entrega incluída neste pacote.',
        },
      ],
    }));
  };

  const removeDeliverable = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((d) => d.id !== id),
    }));
  };

  const updateAddon = (
    id: string,
    field: keyof OptionalAddon,
    value: string | number
  ) => {
    setDraft((prev) => ({
      ...prev,
      optionalAddons: prev.optionalAddons.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    }));
  };

  const addOptionalAddon = () => {
    setDraft((prev) => ({
      ...prev,
      optionalAddons: [
        ...prev.optionalAddons,
        {
          id: `opt-${Date.now()}`,
          title: 'Serviço adicional opcional',
          description: 'Descrição do escopo complementar disponível para o cliente.',
          price: 1500,
          billingType: 'mensal',
        },
      ],
    }));
  };

  const removeOptionalAddon = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      optionalAddons: prev.optionalAddons.filter((a) => a.id !== id),
    }));
  };

  return (
    <main className="bg-cream text-ink min-h-[calc(100vh-140px)]">
      {/* Barra do Estúdio + Link Compartilhável */}
      <section className="bg-obsidian text-cream border-b border-ink/15">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-crimson mb-1">
                MODO ESTÚDIO · MODELO REUTILIZÁVEL
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Personalizar proposta e gerar link do cliente
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleSavePreset}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-forest text-cream hover:bg-[#0F381A] transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{savedToast ? 'Modelo salvo!' : 'Salvar modelo'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onApplyProposal(draft);
                  onPreviewPresentation(draft);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-cream/30 text-cream hover:bg-cream/10 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Testar Apresentação</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onApplyProposal(draft);
                  onPreviewProposal(draft);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-crimson text-cream hover:bg-crimson-deep transition-colors cursor-pointer"
              >
                <span>Testar Proposta</span>
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-cream/15 p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-mono text-cream/65 uppercase">
                Link exclusivo para enviar ao cliente ({draft.clientName})
              </p>
              <p className="mt-1 font-mono text-xs text-cream/90 truncate">
                {shareableUrl}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-cream text-obsidian hover:bg-cream-muted transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{copiedLink ? 'Link copiado!' : 'Copiar link para enviar'}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Coluna Lateral: Modelos Salvos */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-cream-muted/55 border border-ink/12 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink">
                Clientes salvos
              </h2>
              <button
                type="button"
                onClick={handleCreateNewClient}
                className="inline-flex items-center gap-1 text-xs font-semibold text-crimson hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Novo cliente</span>
              </button>
            </div>

            <div className="space-y-2">
              {savedList.map((item) => {
                const isActive = item.id === draft.id;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-2 p-3 border transition-colors ${
                      isActive
                        ? 'bg-white border-crimson'
                        : 'bg-cream border-ink/10 hover:border-ink/30'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleLoadPreset(item)}
                      className="text-left flex-1 min-w-0 cursor-pointer"
                    >
                      <p className="text-sm font-semibold text-ink truncate">
                        {item.clientName}
                      </p>
                      <p className="text-xs font-mono tabular-nums text-ink-muted">
                        {formatBRL(item.basePrice)} · {item.billingCycleLabel}
                      </p>
                    </button>
                    {savedList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeletePreset(item.id)}
                        aria-label={`Remover modelo ${item.clientName}`}
                        className="p-1.5 text-ink-muted hover:text-crimson cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => handleLoadPreset(DEFAULT_DINAMICA_PROPOSAL)}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-ink-muted hover:text-ink border border-ink/15 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Restaurar modelo padrão Dinâmica</span>
            </button>
          </div>
        </aside>

        {/* Formulário de Edição */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-ink/12 p-6 space-y-5">
            <h2 className="text-lg font-bold text-ink pb-3 border-b border-ink/10">
              1. Dados do cliente e investimento base
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  value={draft.clientName}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, clientName: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-cream/40 border border-ink/20 text-sm focus:outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">
                  Segmento / Subtítulo
                </label>
                <input
                  type="text"
                  value={draft.clientSegment}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, clientSegment: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-cream/40 border border-ink/20 text-sm focus:outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">
                  Valor Base (R$)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={draft.basePrice}
                  onChange={(e) =>
                    setDraft((p) => ({
                      ...p,
                      basePrice: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 bg-cream/40 border border-ink/20 text-sm font-mono tabular-nums focus:outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">
                  Modelo de Cobrança
                </label>
                <input
                  type="text"
                  value={draft.billingCycleLabel}
                  onChange={(e) =>
                    setDraft((p) => ({
                      ...p,
                      billingCycleLabel: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-cream/40 border border-ink/20 text-sm focus:outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">
                  Validade da Proposta
                </label>
                <input
                  type="text"
                  value={draft.validUntil}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, validUntil: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-cream/40 border border-ink/20 text-sm focus:outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">
                  WhatsApp para Aceite (DDI+DDD+Número)
                </label>
                <input
                  type="text"
                  value={draft.whatsappNumber}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, whatsappNumber: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-cream/40 border border-ink/20 text-sm font-mono tabular-nums focus:outline-none focus:border-crimson"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-muted mb-1">
                Objetivo principal da proposta
              </label>
              <textarea
                rows={3}
                value={draft.objectiveParagraphs.join('\n\n')}
                onChange={(e) =>
                  setDraft((p) => ({
                    ...p,
                    objectiveParagraphs: e.target.value
                      .split(/\n{2,}/)
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
                className="w-full px-3 py-2 bg-cream/40 border border-ink/20 text-sm focus:outline-none focus:border-crimson"
              />
            </div>
          </div>

          <div className="bg-white border border-ink/12 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <h2 className="text-lg font-bold text-ink">
                2. O que vamos entregar (Escopo base)
              </h2>
              <button
                type="button"
                onClick={addDeliverable}
                className="inline-flex items-center gap-1 text-xs font-semibold text-crimson hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Adicionar item</span>
              </button>
            </div>

            <div className="space-y-3">
              {draft.deliverables.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-cream/35 border border-ink/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-start"
                >
                  <input
                    type="text"
                    value={item.code}
                    onChange={(e) =>
                      updateDeliverable(item.id, 'code', e.target.value)
                    }
                    aria-label="Código"
                    className="sm:col-span-2 px-2.5 py-1.5 bg-white border border-ink/20 text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateDeliverable(item.id, 'title', e.target.value)
                    }
                    aria-label="Título da entrega"
                    className="sm:col-span-9 px-2.5 py-1.5 bg-white border border-ink/20 text-sm font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => removeDeliverable(item.id)}
                    aria-label={`Remover ${item.title}`}
                    className="sm:col-span-1 p-2 text-ink-muted hover:text-crimson cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      updateDeliverable(item.id, 'description', e.target.value)
                    }
                    className="sm:col-span-12 px-2.5 py-1.5 bg-white border border-ink/20 text-xs text-ink-muted"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-ink/12 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <h2 className="text-lg font-bold text-ink">
                3. Adicionais opcionais para o cliente escolher
              </h2>
              <button
                type="button"
                onClick={addOptionalAddon}
                className="inline-flex items-center gap-1 text-xs font-semibold text-crimson hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Novo opcional</span>
              </button>
            </div>

            <div className="space-y-3">
              {draft.optionalAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="p-4 bg-cream/35 border border-ink/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-start"
                >
                  <input
                    type="text"
                    value={addon.title}
                    onChange={(e) =>
                      updateAddon(addon.id, 'title', e.target.value)
                    }
                    aria-label="Título do adicional"
                    className="sm:col-span-6 px-2.5 py-1.5 bg-white border border-ink/20 text-sm font-semibold"
                  />
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={addon.price}
                    onChange={(e) =>
                      updateAddon(
                        addon.id,
                        'price',
                        Number(e.target.value) || 0
                      )
                    }
                    aria-label="Valor do adicional"
                    className="sm:col-span-3 px-2.5 py-1.5 bg-white border border-ink/20 text-sm font-mono tabular-nums"
                  />
                  <select
                    value={addon.billingType}
                    onChange={(e) =>
                      updateAddon(
                        addon.id,
                        'billingType',
                        e.target.value as 'mensal' | 'unico'
                      )
                    }
                    aria-label="Tipo de cobrança"
                    className="sm:col-span-2 px-2 py-1.5 bg-white border border-ink/20 text-xs"
                  >
                    <option value="mensal">/mês</option>
                    <option value="unico">único</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeOptionalAddon(addon.id)}
                    aria-label={`Remover ${addon.title}`}
                    className="sm:col-span-1 p-2 text-ink-muted hover:text-crimson cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <textarea
                    rows={2}
                    value={addon.description}
                    onChange={(e) =>
                      updateAddon(addon.id, 'description', e.target.value)
                    }
                    className="sm:col-span-12 px-2.5 py-1.5 bg-white border border-ink/20 text-xs text-ink-muted"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
