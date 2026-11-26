export type AppView = 'presentation' | 'proposal' | 'editor';

export interface DeliverableItem {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface IncludedLineItem {
  id: string;
  label: string;
  status: string;
}

export interface ExecutionStage {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface OptionalAddon {
  id: string;
  title: string;
  description: string;
  price: number;
  billingType: 'mensal' | 'unico';
  exclusionCounterpart?: string;
}

export interface PaymentOption {
  id: string;
  label: string;
  description: string;
  discountPercent?: number;
}

export interface ProposalConfig {
  id: string;
  clientName: string;
  clientSegment: string;
  location: string;
  validUntil: string;
  objectiveParagraphs: string[];
  stagesIntro: string;
  deliverables: DeliverableItem[];
  stages: ExecutionStage[];
  includedSummaryItems: IncludedLineItem[];
  basePrice: number;
  billingCycleLabel: string;
  deliveryNote: string;
  fixedExclusions: string[];
  optionalAddons: OptionalAddon[];
  paymentOptions: PaymentOption[];
  dueDates: string[];
  whatsappNumber: string;
}

export interface MethodStep {
  code: string;
  title: string;
  description: string;
}

export interface ServiceTier {
  id: string;
  name: string;
  summary: string;
  focus: string[];
}

export interface ServicePillar {
  id: string;
  title: string;
  headline: string;
  description: string;
  tiers: ServiceTier[];
}

export interface PortfolioCase {
  id: string;
  client: string;
  city: string;
  date: string;
  collab?: string;
  segment: string;
  summary: string;
  deliverables: string[];
  palette: [string, string, string];
  tagline: string;
  imageSrc: string;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  roleTitle: string;
  bio: string;
  specialty: string;
  avatarSrc: string;
}
