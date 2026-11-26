import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  MessageCircle,
  Minus,
  Pencil,
  Plus,
  Printer,
  Trash2,
} from 'lucide-react';
import { ProposalConfig } from '../types/proposal';
import {
  buildAcceptanceMessage,
  buildShareableProposalUrl,
  buildWhatsAppUrl,
  formatBRL,
  saveProposalPreset,
} from '../utils/proposalCodec';
import { EstrattoAsterisk, ObrigadoSignature } from './EstrattoMarks';
import { ESTRATTO_BRAND } from '../data/estrattoData';

interface ProposalViewProps {
  proposal: ProposalConfig;
  onUpdateProposal?: (updated: ProposalConfig) => void;
  onBackToPresentation: () => void;
}

export function ProposalView({
  proposal,
  onUpdateProposal,
  onBackToPresentation,
}: ProposalViewProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);

  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [paymentOptionId, setPaymentOptionId] = useState<string>(
    proposal.paymentOptions[0]?.id ?? 'pay-mensal'
  );
  const [dueDate, setDueDate] = useState<string>(
    proposal.dueDates[0] ?? 'Dia 10'
  );
  const [responsibleName, setResponsibleName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [accepted, setAccepted] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const updateField = <K extends keyof ProposalConfig>(
    key: K,
    value: ProposalConfig[K]
  ) => {
    if (!onUpdateProposal) return;
    onUpdateProposal({ ...proposal, [key]: value });
  };

  const handleFinishEditing = () => {
    saveProposalPreset(proposal);
    setIsEditing(false);
  };

  const handleCopyShareLink = async () => {
    saveProposalPreset(proposal);
    const url = buildShareableProposalUrl(proposal);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedShareLink(true);
      window.setTimeout(() => setCopiedShareLink(false), 2400);
    } catch {
      setCopiedShareLink(false);
    }
  };

  const toggleAddon = (addonId: string) => {
    setAccepted(false);
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const activePayment =
    proposal.paymentOptions.find((p) => p.id === paymentOptionId) ??
    proposal.paymentOptions[0];

  const calculations = useMemo(() => {
    const selectedAddons = proposal.optionalAddons.filter((a) =>
      selectedAddonIds.includes(a.id)
    );
    const monthlyAddons = selectedAddons
      .filter((a) => a.billingType === 'mensal')
      .reduce((acc, item) => acc + item.price, 0);
    const oneTimeAddons = selectedAddons
      .filter((a) => a.billingType === 'unico')
      .reduce((acc, item) => acc + item.price, 0);

    const discount = activePayment?.discountPercent ?? 0;
    const subtotalMonthly = proposal.basePrice + monthlyAddons;
    const discountAmount = subtotalMonthly * (discount / 100);
    const monthlyTotal = Math.max(0, subtotalMonthly - discountAmount);

    const dynamicExclusions = [
      ...proposal.fixedExclusions,
      ...proposal.optionalAddons
        .filter((a) => !selectedAddonIds.includes(a.id) && a.exclusionCounterpart)
        .map((a) => a.exclusionCounterpart as string),
    ];

    return {
      selectedAddons,
      monthlyAddons,
      oneTimeAddons,
      discount,
      discountAmount,
      monthlyTotal,
      dynamicExclusions,
    };
  }, [proposal, selectedAddonIds, activePayment]);

  const acceptanceMessage = useMemo(
    () =>
      buildAcceptanceMessage({
        proposal,
        responsibleName: responsibleName || 'Responsável',
        selectedAddonIds,
        paymentOptionId,
        dueDate,
        notes,
        monthlyTotal: calculations.monthlyTotal,
        oneTimeTotal: calculations.oneTimeAddons,
      }),
    [
      proposal,
      responsibleName,
      selectedAddonIds,
      paymentOptionId,
      dueDate,
      notes,
      calculations.monthlyTotal,
      calculations.oneTimeAddons,
    ]
  );

  const whatsappHref = useMemo(
    () => buildWhatsAppUrl(proposal.whatsappNumber, acceptanceMessage),
    [proposal.whatsappNumber, acceptanceMessage]
  );

  const handleAcceptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responsibleName.trim()) {
      setFormError('Informe o nome completo de quem aprova a proposta.');
      return;
    }
    setFormError('');
    setAccepted(true);
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(acceptanceMessage);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2400);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <main className="bg-cream text-ink">
      {/* Barra de Edição Rápida Inline (quando ativada) */}
      {isEditing && (
        <div className="sticky top-16 z-30 bg-obsidian text-cream border-b border-white/15 no-print">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-mono text-cream/90">
              Modo de edição ativo · Altere valores e textos diretamente nas seções abaixo
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-cream text-obsidian hover:bg-cream-muted transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copiedShareLink ? 'Link copiado!' : 'Copiar link do cliente'}</span>
              </button>
              <button
                type="button"
                onClick={handleFinishEditing}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-forest text-cream hover:bg-[#0F381A] transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Concluir edição</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide 1: Capa Cinza Ardósia com Wordmark ESTRATTO no Topo + Faixa Azul Royal */}
      <section className="bg-[#8E9094] text-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-2 pb-16 sm:pb-24">
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-3 py-3 text-xs text-cream/90 no-print">
            <button
              type="button"
              onClick={onBackToPresentation}
              className="inline-flex items-center gap-2 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Voltar à apresentação</span>
            </button>
            <div className="flex flex-wrap items-center gap-2">
              {onUpdateProposal && (
                <button
                  type="button"
                  onClick={() =>
                    isEditing ? handleFinishEditing() : setIsEditing(true)
                  }
                  className={`inline-flex items-center gap-1.5 border px-3 py-1 transition-colors cursor-pointer ${
                    isEditing
                      ? 'bg-cream text-obsidian border-cream font-semibold'
                      : 'border-cream/40 hover:bg-cream/10 text-cream'
                  }`}
                >
                  <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isEditing ? 'Concluir edição' : 'Editar valores e textos'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 border border-cream/35 px-3 py-1 hover:bg-cream/10 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>

          <h1
            aria-label="ESTRATTO"
            className="font-display font-bold uppercase text-cream text-[clamp(3.6rem,15.5vw,13.5rem)] leading-[0.84] tracking-[-0.03em] text-center select-none"
          >
            ESTRATTO
          </h1>

          <div className="max-w-[1200px] mx-auto mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-cream">
                <span className="bg-[#163B8C] rounded-full px-4 py-2">Collab</span>
                <span className="bg-[#163B8C] rounded-full px-4 py-2 -ml-1">Branding</span>
                <span className="bg-[#163B8C] rounded-full px-4 py-2 -ml-1">Estratégia</span>
              </div>
              {isEditing ? (
                <div className="max-w-xs space-y-2 pt-2">
                  <label className="block text-[11px] font-mono uppercase text-cream/85">
                    Validade da proposta
                  </label>
                  <input
                    type="text"
                    value={proposal.validUntil}
                    onChange={(e) => updateField('validUntil', e.target.value)}
                    className="w-full px-3 py-1.5 bg-white text-ink text-xs font-mono focus:outline-none"
                  />
                </div>
              ) : (
                <p className="text-xs font-mono text-cream/85">
                  Validade: {proposal.validUntil}
                </p>
              )}
            </div>

            <div className="md:col-span-6 md:text-right space-y-12">
              {isEditing ? (
                <div className="space-y-3 md:ml-auto max-w-sm text-left bg-black/20 p-4 border border-cream/30">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-cream/80 mb-1">
                      Nome do cliente
                    </label>
                    <input
                      type="text"
                      value={proposal.clientName}
                      onChange={(e) => updateField('clientName', e.target.value)}
                      className="w-full px-3 py-2 bg-white text-ink text-sm font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-cream/80 mb-1">
                      Cidade / Localização
                    </label>
                    <input
                      type="text"
                      value={proposal.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white text-ink text-xs focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-xl sm:text-2xl uppercase tracking-wide leading-snug text-cream">
                    <p className="font-normal">PROPOSTA COMERCIAL</p>
                    <p>
                      CLIENTE: <strong className="font-bold">{proposal.clientName}</strong>
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm tracking-widest uppercase text-cream/85">
                    {proposal.location}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Objetivo da Proposta + Wordmark Vertical ESTRATTO à Direita */}
      <section className="bg-cream text-ink border-b border-ink/12 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-9 space-y-6 text-lg sm:text-xl leading-relaxed text-ink max-w-2xl">
            {isEditing ? (
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-crimson">
                  Objetivo da proposta (separe parágrafos com uma linha em branco)
                </label>
                <textarea
                  rows={7}
                  value={proposal.objectiveParagraphs.join('\n\n')}
                  onChange={(e) =>
                    updateField(
                      'objectiveParagraphs',
                      e.target.value
                        .split(/\n{2,}/)
                        .map((p) => p.trim())
                        .filter(Boolean)
                    )
                  }
                  className="w-full p-4 bg-white border border-ink/25 text-base text-ink leading-relaxed focus:outline-none focus:border-crimson"
                />
              </div>
            ) : (
              proposal.objectiveParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
          </div>

          <div
            aria-hidden="true"
            className="hidden lg:flex lg:col-span-3 justify-end items-center"
          >
            <span
              className="font-display font-bold uppercase text-crimson text-[6.5rem] leading-none tracking-[-0.03em] select-none"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              ESTRATTO
            </span>
          </div>
        </div>
      </section>

      {/* Slide 3: O Que Vamos Entregar + Asterisco Verde Floresta + Regra Inferior */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-16 sm:pt-24 sm:pb-24">
          <div className="flex items-start justify-between gap-6">
            <h2 className="text-lg sm:text-xl font-medium uppercase tracking-wide text-forest">
              O QUE VAMOS ENTREGAR:
            </h2>
            <EstrattoAsterisk className="w-16 h-16 sm:w-20 sm:h-20 text-forest shrink-0" />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
            {proposal.deliverables.map((item) =>
              isEditing ? (
                <div
                  key={item.id}
                  className="p-4 bg-white border border-ink/20 space-y-2.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.code}
                      onChange={(e) =>
                        updateField(
                          'deliverables',
                          proposal.deliverables.map((d) =>
                            d.id === item.id ? { ...d, code: e.target.value } : d
                          )
                        )
                      }
                      aria-label="Código"
                      className="w-14 px-2 py-1 border border-ink/20 text-xs font-mono"
                    />
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateField(
                          'deliverables',
                          proposal.deliverables.map((d) =>
                            d.id === item.id ? { ...d, title: e.target.value } : d
                          )
                        )
                      }
                      aria-label="Título da entrega"
                      className="flex-1 px-2.5 py-1 border border-ink/20 text-sm font-bold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'deliverables',
                          proposal.deliverables.filter((d) => d.id !== item.id)
                        )
                      }
                      aria-label={`Remover ${item.title}`}
                      className="p-1.5 text-ink-muted hover:text-crimson cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      updateField(
                        'deliverables',
                        proposal.deliverables.map((d) =>
                          d.id === item.id
                            ? { ...d, description: e.target.value }
                            : d
                        )
                      )
                    }
                    className="w-full px-2.5 py-1.5 border border-ink/20 text-xs text-ink-muted"
                  />
                </div>
              ) : (
                <article key={item.id} className="space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-ink">
                    <span className="font-mono tabular-nums mr-1.5">
                      {item.code}.
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ink/85 leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </article>
              )
            )}
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={() =>
                updateField('deliverables', [
                  ...proposal.deliverables,
                  {
                    id: `del-${Date.now()}`,
                    code: String(proposal.deliverables.length + 1).padStart(2, '0'),
                    title: 'Nova entrega',
                    description: 'Descrição objetiva do entregável.',
                  },
                ])
              }
              className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-forest text-cream hover:bg-[#0F381A] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Adicionar entregável</span>
            </button>
          )}

          <div className="mt-16 border-b border-ink" />
        </div>
      </section>

      {/* Slide 4: Etapas (Fundo Verde Floresta + Asterisco Carmim + Tabela Pautada em 3 Colunas) */}
      <section className="bg-forest text-cream">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
            {isEditing ? (
              <div className="flex-1 max-w-xl space-y-1.5">
                <label className="block text-xs font-mono uppercase text-cream/75">
                  Introdução das etapas
                </label>
                <textarea
                  rows={3}
                  value={proposal.stagesIntro}
                  onChange={(e) => updateField('stagesIntro', e.target.value)}
                  className="w-full p-3 bg-white text-ink text-sm leading-relaxed focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-lg sm:text-xl font-normal leading-relaxed max-w-xl text-cream/95">
                {proposal.stagesIntro}
              </p>
            )}
            <EstrattoAsterisk className="w-16 h-16 sm:w-20 sm:h-20 text-crimson shrink-0" />
          </div>

          <div className="mt-16 border-t border-cream/65">
            <div className="py-3 border-b border-cream/65">
              <h2 className="text-sm sm:text-base uppercase tracking-wider font-medium text-cream">
                ETAPAS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 pb-8 border-b border-cream/65">
              {proposal.stages.map((stage) =>
                isEditing ? (
                  <div key={stage.id} className="space-y-2.5">
                    <input
                      type="text"
                      value={stage.title}
                      onChange={(e) =>
                        updateField(
                          'stages',
                          proposal.stages.map((s) =>
                            s.id === stage.id ? { ...s, title: e.target.value } : s
                          )
                        )
                      }
                      className="w-full px-3 py-1.5 bg-white text-ink text-sm font-semibold"
                    />
                    <textarea
                      rows={3}
                      value={stage.description}
                      onChange={(e) =>
                        updateField(
                          'stages',
                          proposal.stages.map((s) =>
                            s.id === stage.id
                              ? { ...s, description: e.target.value }
                              : s
                          )
                        )
                      }
                      className="w-full px-3 py-1.5 bg-white text-ink text-xs"
                    />
                  </div>
                ) : (
                  <div key={stage.id} className="space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-cream pb-3 border-b border-cream/40">
                      <span className="font-mono tabular-nums mr-1.5">
                        {stage.code}.
                      </span>
                      {stage.title}
                    </h3>
                    <p className="text-sm text-cream/85 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: O Que Não Está Incluso + Expansão por Adicionais Opcionais */}
      <section className="bg-cream text-ink border-b border-ink/12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4 max-w-lg">
              <h2 className="text-lg sm:text-xl font-medium uppercase tracking-wide text-forest">
                O QUE NÃO ESTÁ INCLUSO NO PROJETO
              </h2>
              <p className="text-base sm:text-lg text-ink leading-relaxed">
                Para manter o escopo do projeto claro e alinhado, os seguintes serviços não fazem parte desta proposta base:
              </p>
            </div>
            <EstrattoAsterisk className="w-16 h-16 sm:w-20 sm:h-20 text-forest shrink-0" />
          </div>

          {isEditing ? (
            <div className="mt-8 md:pl-24 max-w-2xl space-y-2.5">
              <p className="text-xs font-mono uppercase text-crimson">
                Itens fixos não inclusos
              </p>
              {proposal.fixedExclusions.map((excl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={excl}
                    onChange={(e) =>
                      updateField(
                        'fixedExclusions',
                        proposal.fixedExclusions.map((item, i) =>
                          i === idx ? e.target.value : item
                        )
                      )
                    }
                    className="flex-1 px-3 py-1.5 bg-white border border-ink/20 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        'fixedExclusions',
                        proposal.fixedExclusions.filter((_, i) => i !== idx)
                      )
                    }
                    aria-label="Remover item não incluso"
                    className="p-2 text-ink-muted hover:text-crimson cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateField('fixedExclusions', [
                    ...proposal.fixedExclusions,
                    'Novo item não incluso.',
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-crimson hover:underline cursor-pointer pt-1"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Adicionar exclusão</span>
              </button>
            </div>
          ) : (
            <ul className="mt-10 md:pl-24 space-y-2.5 text-sm sm:text-base text-ink">
              {calculations.dynamicExclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Adicionais Opcionais Interativos (ou Editáveis) */}
          <div className="mt-16 pt-12 border-t border-ink/15 no-print">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <p className="text-xs font-mono uppercase text-crimson">
                  {isEditing ? 'Editar adicionais opcionais' : 'Personalize antes de aceitar'}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mt-1">
                  {isEditing
                    ? 'Serviços adicionais disponíveis ao cliente'
                    : 'Deseja adicionar algum serviço complementar?'}
                </h3>
              </div>
              {isEditing ? (
                <button
                  type="button"
                  onClick={() =>
                    updateField('optionalAddons', [
                      ...proposal.optionalAddons,
                      {
                        id: `opt-${Date.now()}`,
                        title: 'Novo adicional opcional',
                        description: 'Descrição do serviço complementar.',
                        price: 1500,
                        billingType: 'mensal',
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-crimson text-cream hover:bg-crimson-deep cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Novo adicional</span>
                </button>
              ) : (
                <span className="text-xs text-ink-muted">
                  Ao marcar um opcional, ele entra no investimento e sai da lista acima.
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {proposal.optionalAddons.map((addon) => {
                if (isEditing) {
                  return (
                    <div
                      key={addon.id}
                      className="p-4 bg-white border border-ink/20 space-y-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={addon.title}
                          onChange={(e) =>
                            updateField(
                              'optionalAddons',
                              proposal.optionalAddons.map((a) =>
                                a.id === addon.id
                                  ? { ...a, title: e.target.value }
                                  : a
                              )
                            )
                          }
                          className="flex-1 px-2.5 py-1 border border-ink/20 text-sm font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateField(
                              'optionalAddons',
                              proposal.optionalAddons.filter(
                                (a) => a.id !== addon.id
                              )
                            )
                          }
                          aria-label={`Remover ${addon.title}`}
                          className="p-1.5 text-ink-muted hover:text-crimson cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={addon.description}
                        onChange={(e) =>
                          updateField(
                            'optionalAddons',
                            proposal.optionalAddons.map((a) =>
                              a.id === addon.id
                                ? { ...a, description: e.target.value }
                                : a
                            )
                          )
                        }
                        className="w-full px-2.5 py-1 border border-ink/20 text-xs text-ink-muted"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          step={100}
                          value={addon.price}
                          onChange={(e) =>
                            updateField(
                              'optionalAddons',
                              proposal.optionalAddons.map((a) =>
                                a.id === addon.id
                                  ? { ...a, price: Number(e.target.value) || 0 }
                                  : a
                              )
                            )
                          }
                          className="w-28 px-2.5 py-1 border border-ink/20 text-sm font-mono tabular-nums"
                        />
                        <select
                          value={addon.billingType}
                          onChange={(e) =>
                            updateField(
                              'optionalAddons',
                              proposal.optionalAddons.map((a) =>
                                a.id === addon.id
                                  ? {
                                      ...a,
                                      billingType: e.target.value as
                                        | 'mensal'
                                        | 'unico',
                                    }
                                  : a
                              )
                            )
                          }
                          className="flex-1 px-2 py-1 border border-ink/20 text-xs"
                        >
                          <option value="mensal">/mês</option>
                          <option value="unico">pagamento único</option>
                        </select>
                      </div>
                    </div>
                  );
                }

                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    aria-pressed={isSelected}
                    className={`text-left p-5 border transition-colors duration-150 flex flex-col justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-forest text-cream border-forest'
                        : 'bg-cream-muted/45 text-ink border-ink/15 hover:border-ink/40'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-base leading-snug">
                          {addon.title}
                        </span>
                        <span
                          className={`w-5 h-5 flex items-center justify-center border shrink-0 ${
                            isSelected
                              ? 'border-cream bg-cream text-forest'
                              : 'border-ink/30 text-ink-muted'
                          }`}
                        >
                          {isSelected ? (
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? 'text-cream/85' : 'text-ink-muted'
                        }`}
                      >
                        {addon.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-current/15 flex items-baseline justify-between">
                      <span className="font-mono tabular-nums text-sm font-bold">
                        + {formatBRL(addon.price)}
                      </span>
                      <span className="font-mono text-[11px] opacity-80">
                        {addon.billingType === 'mensal' ? '/mês' : 'pagamento único'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: Split 50/50 Carmim (INVESTIMENTO) / Creme (VALOR + Aceite Rápido) */}
      <section id="investimento" className="grid grid-cols-1 lg:grid-cols-12 border-b border-ink/12">
        {/* Esquerda Carmim */}
        <div className="lg:col-span-6 bg-crimson text-cream px-6 sm:px-12 py-16 sm:py-24">
          <div className="max-w-md ml-auto space-y-10">
            <h2 className="text-3xl sm:text-4xl font-normal uppercase tracking-wide text-cream">
              INVESTIMENTO
            </h2>

            {isEditing ? (
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase text-cream/80">
                  Itens inclusos no resumo do investimento
                </p>
                {proposal.includedSummaryItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) =>
                        updateField(
                          'includedSummaryItems',
                          proposal.includedSummaryItems.map((i) =>
                            i.id === item.id
                              ? { ...i, label: e.target.value }
                              : i
                          )
                        )
                      }
                      className="flex-1 px-2.5 py-1.5 bg-white text-ink text-sm"
                    />
                    <input
                      type="text"
                      value={item.status}
                      onChange={(e) =>
                        updateField(
                          'includedSummaryItems',
                          proposal.includedSummaryItems.map((i) =>
                            i.id === item.id
                              ? { ...i, status: e.target.value }
                              : i
                          )
                        )
                      }
                      className="w-24 px-2.5 py-1.5 bg-white text-ink text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'includedSummaryItems',
                          proposal.includedSummaryItems.filter(
                            (i) => i.id !== item.id
                          )
                        )
                      }
                      aria-label={`Remover ${item.label}`}
                      className="p-1.5 text-cream/80 hover:text-white cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateField('includedSummaryItems', [
                      ...proposal.includedSummaryItems,
                      {
                        id: `inc-${Date.now()}`,
                        label: 'Novo item incluso',
                        status: 'Incluso',
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Adicionar linha no resumo</span>
                </button>
              </div>
            ) : (
              <div className="divide-y divide-cream/45 border-b border-cream/45">
                {proposal.includedSummaryItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-3.5 flex items-center justify-between gap-4 text-sm sm:text-base"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs sm:text-sm text-cream/90">
                      {item.status}
                    </span>
                  </div>
                ))}
                {calculations.selectedAddons.map((addon) => (
                  <div
                    key={addon.id}
                    className="py-3.5 flex items-center justify-between gap-4 text-sm sm:text-base bg-black/12 px-2 -mx-2"
                  >
                    <span>+ {addon.title}</span>
                    <span className="font-mono tabular-nums text-xs sm:text-sm">
                      {formatBRL(addon.price)}
                      {addon.billingType === 'mensal' ? '/mês' : ' (único)'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 no-print">
              <p className="text-xs font-mono uppercase tracking-wider text-cream/85">
                Condição de pagamento e vencimento
              </p>
              <div className="space-y-2">
                {proposal.paymentOptions.map((option) => {
                  const selected = option.id === paymentOptionId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setPaymentOptionId(option.id);
                        setAccepted(false);
                      }}
                      className={`w-full text-left p-3.5 border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-cream text-ink border-cream'
                          : 'border-cream/35 text-cream hover:bg-cream/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{option.label}</span>
                        {selected && (
                          <Check className="w-4 h-4 text-forest" aria-hidden="true" />
                        )}
                      </div>
                      <p
                        className={`mt-1 text-xs ${
                          selected ? 'text-ink-muted' : 'text-cream/80'
                        }`}
                      >
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {proposal.dueDates.map((dateLabel) => (
                  <button
                    key={dateLabel}
                    type="button"
                    onClick={() => {
                      setDueDate(dateLabel);
                      setAccepted(false);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-mono border transition-colors cursor-pointer ${
                      dateLabel === dueDate
                        ? 'bg-cream text-crimson border-cream font-semibold'
                        : 'border-cream/35 text-cream hover:bg-cream/10'
                    }`}
                  >
                    {dateLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Direita Creme */}
        <div className="lg:col-span-6 bg-cream text-ink px-6 sm:px-12 py-16 sm:py-24">
          <div className="max-w-md mr-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-forest">
                VALOR
              </h2>

              {isEditing ? (
                <div className="bg-white border border-ink/20 p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                      Valor base (R$)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={100}
                      value={proposal.basePrice}
                      onChange={(e) =>
                        updateField('basePrice', Number(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 border border-ink/20 text-xl font-mono font-bold tabular-nums text-forest"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                        Cobrança
                      </label>
                      <input
                        type="text"
                        value={proposal.billingCycleLabel}
                        onChange={(e) =>
                          updateField('billingCycleLabel', e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 border border-ink/20 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                        WhatsApp destino
                      </label>
                      <input
                        type="text"
                        value={proposal.whatsappNumber}
                        onChange={(e) =>
                          updateField('whatsappNumber', e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 border border-ink/20 text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                      Nota de entrega / plataforma
                    </label>
                    <input
                      type="text"
                      value={proposal.deliveryNote}
                      onChange={(e) =>
                        updateField('deliveryNote', e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 border border-ink/20 text-xs"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-mono tabular-nums text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold tracking-tight text-forest leading-none">
                    {formatBRL(calculations.monthlyTotal)}
                  </p>

                  {calculations.discount > 0 && (
                    <p className="text-xs font-mono text-forest">
                      Desconto de {calculations.discount}% aplicado ({formatBRL(calculations.discountAmount)}/mês)
                    </p>
                  )}

                  {calculations.oneTimeAddons > 0 && (
                    <p className="text-sm font-mono tabular-nums text-ink">
                      + {formatBRL(calculations.oneTimeAddons)} em adicionais únicos
                    </p>
                  )}

                  <div className="pt-2 space-y-2 text-sm text-ink-muted">
                    <p>{proposal.deliveryNote}</p>
                    <p>
                      Forma de pagamento:{' '}
                      <strong className="text-ink">
                        {activePayment?.label ?? proposal.billingCycleLabel} ({dueDate})
                      </strong>
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2">
              <EstrattoAsterisk className="w-12 h-12 text-crimson" />
            </div>

            {/* Aceite Rápido -> Redirecionamento WhatsApp */}
            <form
              onSubmit={handleAcceptSubmit}
              className="pt-6 border-t border-ink/15 space-y-4 no-print"
            >
              <div>
                <label
                  htmlFor="responsible-name"
                  className="block text-xs font-mono uppercase text-ink-muted mb-1.5"
                >
                  Nome completo de quem aprova *
                </label>
                <input
                  id="responsible-name"
                  type="text"
                  value={responsibleName}
                  onChange={(e) => {
                    setResponsibleName(e.target.value);
                    if (formError) setFormError('');
                    if (accepted) setAccepted(false);
                  }}
                  placeholder={`Ex.: Diretoria ${proposal.clientName}`}
                  className="w-full px-3.5 py-2.5 bg-white border border-ink/20 text-sm text-ink focus:outline-none focus:border-crimson"
                />
                {formError && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-crimson">
                    {formError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="acceptance-notes"
                  className="block text-xs font-mono uppercase text-ink-muted mb-1.5"
                >
                  Observação (opcional)
                </label>
                <textarea
                  id="acceptance-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    if (accepted) setAccepted(false);
                  }}
                  placeholder="Ex.: Início imediato após confirmação."
                  className="w-full px-3.5 py-2.5 bg-white border border-ink/20 text-sm text-ink focus:outline-none focus:border-crimson resize-none"
                />
              </div>

              {!accepted ? (
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold bg-forest text-cream hover:bg-[#0F381A] transition-colors cursor-pointer"
                >
                  <Check className="w-5 h-5" aria-hidden="true" />
                  <span>Aceitar Proposta</span>
                </button>
              ) : (
                <div className="bg-white border border-forest p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-forest text-cream flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">
                        Aceite pronto para envio
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        Clique abaixo para enviar o resumo confirmado direto no WhatsApp da Estratto.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-forest text-cream hover:bg-[#0F381A] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar no WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold bg-cream-muted text-ink border border-ink/15 hover:bg-ink hover:text-cream transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{copiedSummary ? 'Copiado!' : 'Copiar resumo'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Slide 7: Encerramento da Proposta (Idêntico ao Slide 18) */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-24 flex flex-col items-center">
          <div className="w-full max-w-[760px]">
            <div className="py-4 border-y border-ink/50 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium tracking-[0.2em] uppercase text-crimson">
                <span className="border border-crimson/55 rounded-full px-3.5 py-1">Collab</span>
                <span className="border border-crimson/55 rounded-full px-3.5 py-1">Branding</span>
                <span className="border border-crimson/55 rounded-full px-3.5 py-1">Marketing</span>
              </div>
              <EstrattoAsterisk className="w-6 h-6 text-forest shrink-0" />
            </div>

            <div className="py-8 border-b border-ink/50 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 sm:pr-6 sm:border-r border-ink/40">
                <span className="font-display text-[clamp(2.5rem,5.5vw,4rem)] font-bold tracking-tight text-crimson leading-none">
                  ESTRATTO
                </span>
              </div>
              <div className="sm:col-span-5 text-sm sm:text-base font-medium uppercase leading-snug text-ink">
                A ESSÊNCIA
                <br />
                JÁ ESTÁ LÁ.
                <br />
                A GENTE EXTRAI.
              </div>
            </div>

            <div className="py-6 border-b border-ink/50 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 sm:pr-6 sm:border-r border-ink/40 font-mono tabular-nums text-sm sm:text-base font-semibold text-ink">
                {ESTRATTO_BRAND.phoneDisplay}
              </div>
              <div className="sm:col-span-7 flex items-center justify-between gap-4">
                <div className="text-xs sm:text-sm uppercase tracking-wide text-ink/85 space-y-0.5">
                  <p>{ESTRATTO_BRAND.website}</p>
                  <p>{ESTRATTO_BRAND.instagram}</p>
                </div>
                <ObrigadoSignature className="w-36 sm:w-44 h-auto -my-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
