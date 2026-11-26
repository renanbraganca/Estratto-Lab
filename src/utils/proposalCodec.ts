import { DEFAULT_DINAMICA_PROPOSAL } from '../data/estrattoData';
import { ProposalConfig } from '../types/proposal';

const STORAGE_KEY = 'estratto_saved_proposals_v1';

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function encodeProposalToParam(config: ProposalConfig): string {
  const json = JSON.stringify(config);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeProposalFromParam(param: string): ProposalConfig | null {
  try {
    const padded = param.replace(/-/g, '+').replace(/_/g, '/');
    const padLength = (4 - (padded.length % 4)) % 4;
    const base64 = padded + '='.repeat(padLength);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as Partial<ProposalConfig>;
    if (!parsed || typeof parsed.clientName !== 'string' || typeof parsed.basePrice !== 'number') {
      return null;
    }
    return {
      ...DEFAULT_DINAMICA_PROPOSAL,
      ...parsed,
      deliverables: Array.isArray(parsed.deliverables)
        ? parsed.deliverables
        : DEFAULT_DINAMICA_PROPOSAL.deliverables,
      stages: Array.isArray(parsed.stages) ? parsed.stages : DEFAULT_DINAMICA_PROPOSAL.stages,
      includedSummaryItems: Array.isArray(parsed.includedSummaryItems)
        ? parsed.includedSummaryItems
        : DEFAULT_DINAMICA_PROPOSAL.includedSummaryItems,
      fixedExclusions: Array.isArray(parsed.fixedExclusions)
        ? parsed.fixedExclusions
        : DEFAULT_DINAMICA_PROPOSAL.fixedExclusions,
      optionalAddons: Array.isArray(parsed.optionalAddons)
        ? parsed.optionalAddons
        : DEFAULT_DINAMICA_PROPOSAL.optionalAddons,
      paymentOptions: Array.isArray(parsed.paymentOptions)
        ? parsed.paymentOptions
        : DEFAULT_DINAMICA_PROPOSAL.paymentOptions,
      dueDates: Array.isArray(parsed.dueDates)
        ? parsed.dueDates
        : DEFAULT_DINAMICA_PROPOSAL.dueDates,
    };
  } catch {
    return null;
  }
}

export function buildShareableProposalUrl(config: ProposalConfig): string {
  const encoded = encodeProposalToParam(config);
  const url = new URL(window.location.href);
  url.searchParams.set('p', encoded);
  url.hash = '';
  return url.toString();
}

export function loadSavedProposals(): ProposalConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [DEFAULT_DINAMICA_PROPOSAL];
    const parsed = JSON.parse(raw) as ProposalConfig[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [DEFAULT_DINAMICA_PROPOSAL];
    return parsed;
  } catch {
    return [DEFAULT_DINAMICA_PROPOSAL];
  }
}

export function saveProposalPreset(config: ProposalConfig): ProposalConfig[] {
  const existing = loadSavedProposals();
  const idx = existing.findIndex((item) => item.id === config.id);
  const updated =
    idx >= 0
      ? existing.map((item, i) => (i === idx ? config : item))
      : [config, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors cleanly
  }
  return updated;
}

export function deleteProposalPreset(id: string): ProposalConfig[] {
  const existing = loadSavedProposals();
  const filtered = existing.filter((item) => item.id !== id);
  const next = filtered.length > 0 ? filtered : [DEFAULT_DINAMICA_PROPOSAL];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage errors
  }
  return next;
}

export interface AcceptanceSummaryParams {
  proposal: ProposalConfig;
  responsibleName: string;
  selectedAddonIds: string[];
  paymentOptionId: string;
  dueDate: string;
  notes: string;
  monthlyTotal: number;
  oneTimeTotal: number;
}

export function buildAcceptanceMessage({
  proposal,
  responsibleName,
  selectedAddonIds,
  paymentOptionId,
  dueDate,
  notes,
  monthlyTotal,
  oneTimeTotal,
}: AcceptanceSummaryParams): string {
  const selectedAddons = proposal.optionalAddons.filter((a) => selectedAddonIds.includes(a.id));
  const payment =
    proposal.paymentOptions.find((p) => p.id === paymentOptionId) ?? proposal.paymentOptions[0];

  const lines: string[] = [
    `*ACEITE DE PROPOSTA — ESTRATTO*`,
    ``,
    `*Cliente:* ${proposal.clientName}`,
    `*Responsável pelo aceite:* ${responsibleName.trim()}`,
    ``,
    `*Escopo Base (${proposal.billingCycleLabel}):* ${formatBRL(proposal.basePrice)}`,
    ...proposal.includedSummaryItems.map((item) => `• ${item.label} (${item.status})`),
  ];

  if (selectedAddons.length > 0) {
    lines.push(``, `*Adicionais selecionados:*`);
    for (const addon of selectedAddons) {
      const cycle = addon.billingType === 'mensal' ? '/mês' : ' (pagamento único)';
      lines.push(`• ${addon.title} — ${formatBRL(addon.price)}${cycle}`);
    }
  } else {
    lines.push(``, `*Adicionais:* Nenhum adicional selecionado`);
  }

  lines.push(
    ``,
    `*Condição de pagamento:* ${payment?.label ?? proposal.billingCycleLabel}`,
    `*Vencimento preferencial:* ${dueDate}`,
    `*Investimento mensal estimado:* ${formatBRL(monthlyTotal)}`
  );

  if (oneTimeTotal > 0) {
    lines.push(`*Investimento único (adicionais):* ${formatBRL(oneTimeTotal)}`);
  }

  if (notes.trim()) {
    lines.push(``, `*Observações:* ${notes.trim()}`);
  }

  lines.push(``, `Enviado via Proposta Interativa Estratto.`);

  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const digits = phoneNumber.replace(/\D/g, '') || '5562982322842';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
