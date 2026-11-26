import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ESTRATTO_BRAND,
  METHOD_STEPS,
  PORTFOLIO_CASES,
  SERVICE_PILLARS,
  TEAM_MEMBERS,
} from '../data/estrattoData';
import { ProposalConfig } from '../types/proposal';
import {
  EstrattoAsterisk,
  ObrigadoSignature,
  ServiceTierIcon,
} from './EstrattoMarks';
import { PortfolioSpread } from './PortfolioArtwork';

interface PresentationViewProps {
  proposal: ProposalConfig;
  onOpenProposal: () => void;
}

export function PresentationView({
  proposal,
  onOpenProposal,
}: PresentationViewProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICE_PILLARS[0].id);
  const [selectedTierId, setSelectedTierId] = useState<string>('essencial');
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [strikeKey, setStrikeKey] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const activeService =
    SERVICE_PILLARS.find((s) => s.id === activeServiceId) ?? SERVICE_PILLARS[0];
  const activeTier =
    activeService.tiers.find((t) => t.id === selectedTierId) ??
    activeService.tiers[0];

  const handlePrevCase = () => {
    setActiveCaseIndex((prev) =>
      prev === 0 ? PORTFOLIO_CASES.length - 1 : prev - 1
    );
  };

  const handleNextCase = () => {
    setActiveCaseIndex((prev) =>
      prev === PORTFOLIO_CASES.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelectService = (serviceId: string) => {
    setActiveServiceId(serviceId);
    const nextService = SERVICE_PILLARS.find((s) => s.id === serviceId);
    if (nextService && !nextService.tiers.some((t) => t.id === selectedTierId)) {
      setSelectedTierId(nextService.tiers[0].id);
    }
  };

  return (
    <main>
      {/* Slide 1: Capa Editorial Estratto (Fundo Carmim + Wordmark Monumental no Topo) */}
      <section className="bg-crimson text-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-2 pb-16 sm:pb-24">
          <h1
            aria-label="ESTRATTO"
            className="font-display font-bold uppercase text-cream text-[clamp(3.6rem,15.5vw,13.5rem)] leading-[0.84] tracking-[-0.03em] text-center select-none"
          >
            ESTRATTO
          </h1>

          <div className="max-w-[1200px] mx-auto mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-cream">
                <span className="bg-forest rounded-full px-4 py-2">Collab</span>
                <span className="bg-forest rounded-full px-4 py-2 -ml-1">Branding</span>
                <span className="bg-forest rounded-full px-4 py-2 -ml-1">Estratégia</span>
              </div>
              <p className="text-xs sm:text-sm text-cream/85">
                Apresentação comercial preparada para <strong className="font-semibold text-cream">{proposal.clientName}</strong>
              </p>
            </div>

            <div className="md:col-span-5 md:text-right space-y-6">
              <div className="space-y-1">
                <p className="text-lg sm:text-xl font-medium tracking-wide uppercase leading-tight text-cream">
                  Estúdio
                  <br />
                  Colaborativo
                </p>
                <p className="pt-3 text-xs sm:text-sm tracking-widest uppercase text-cream/85">
                  Brasil
                  <br />
                  Goiânia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Estratto Quer Dizer Extrair (Fundo Creme + Linhas Pautadas Centrais) */}
      <section className="bg-cream text-ink border-b border-ink/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center">
          <div className="w-full max-w-[540px]">
            <div className="flex items-baseline justify-between gap-4 pb-1.5 border-b border-ink text-[clamp(1.65rem,3.4vw,2.35rem)] leading-tight tracking-tight">
              <span className="font-medium text-ink">ESTRATTO</span>
              <span className="font-medium text-ink">QUER</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 pt-2 pb-1.5 border-b border-ink text-[clamp(1.65rem,3.4vw,2.35rem)] leading-tight tracking-tight">
              <span className="font-medium text-ink">DIZER</span>
              <span className="font-bold text-crimson">EXTRAIR.</span>
            </div>

            <p className="mt-10 text-base sm:text-lg text-ink leading-relaxed">
              Tiramos de dentro da marca o que ela já é e damos forma para o mundo ver. Somos um estúdio de marca estratégico focado em posicionamento e comunicação.
            </p>
          </div>
        </div>
      </section>

      {/* Slide 3: Não Somos Uma Agência de Marketing (Centralizado e sem símbolo *) */}
      <section className="bg-crimson text-ink">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center">
          <div
            className="max-w-4xl cursor-default"
            onMouseEnter={() => setStrikeKey((k) => k + 1)}
          >
            <h2 className="text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.03] tracking-tight uppercase">
              <span className="block font-bold text-obsidian">NÃO SOMOS</span>
              <span className="block font-normal text-obsidian">
                UMA{' '}
                <span className="relative inline-block">
                  <span>AGÊNCIA</span>
                  <motion.span
                    key={strikeKey}
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left center' }}
                    className="absolute left-[-2%] right-[-2%] top-[52%] -translate-y-1/2 h-[6px] sm:h-[9px] bg-cream"
                  />
                </span>{' '}
                DE
              </span>
              <span className="block font-normal text-obsidian">MARKETING.</span>
            </h2>
          </div>

          <p className="mt-10 text-base sm:text-lg text-cream max-w-lg leading-relaxed">
            A Estratto é uma <strong className="font-bold">estrutura estratégica para marcas</strong> do mercado imobiliário.
          </p>
        </div>
      </section>

      {/* Slide 4: Nosso Trabalho é Estruturar a Base (Fundo Obsidian) */}
      <section className="bg-obsidian text-cream">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <h2 className="text-[clamp(1.65rem,3.6vw,3.1rem)] font-medium leading-[1.15] tracking-tight uppercase max-w-4xl text-white/55">
            NOSSO TRABALHO
            <br />
            É <span className="text-crimson font-semibold">ESTRUTURAR</span> A BASE
            <br />
            DA MARCA PARA QUE ELA
            <br />
            SEJA ENTENDIDA COM
            <br />
            CLAREZA, PERCEBIDA
            <br />
            COM <span className="text-crimson font-semibold">AUTORIDADE</span> E GERE
            <br />
            <span className="text-crimson font-semibold">RESULTADOS.</span>
          </h2>

          <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <p className="text-sm text-white/60">
              <strong className="font-semibold text-white/75">
                Cada projeto começa pelo entendimento.
              </strong>{' '}
              A criação é consequência.
            </p>
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white/20 select-none">
              ESTRATTO
            </span>
          </div>
        </div>
      </section>

      {/* Slide 5: O Método Estratto (Fundo Creme + Caixas Pautadas [1 | IMERSÃO]) */}
      <section id="metodo" className="bg-cream text-ink border-b border-ink/10 scroll-mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <h2 className="text-[clamp(1.85rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-tight uppercase max-w-3xl text-ink">
            O MÉTODO ESTRATTO
            <br />
            PARTE DE UMA PREMISSA
            <br />
            SIMPLES:{' '}
            <span className="text-crimson font-bold">
              CONTEXTO
              <br />
              ANTES DE FORMA.
            </span>
          </h2>

          <div className="mt-14 lg:pl-24 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {METHOD_STEPS.map((step) => (
              <article key={step.code} className="space-y-4">
                <div className="inline-flex items-stretch border border-ink/55 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  <span className="px-2.5 py-1.5 border-r border-ink/55 text-crimson font-semibold tabular-nums">
                    {Number(step.code)}
                  </span>
                  <h3 className="px-3.5 py-1.5 text-ink">{step.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-ink/85 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Slides 6, 7, 8 e 9: Nossos Serviços (Fundo Carmim + Ícones Geométricos Animados) */}
      <section id="servicos" className="bg-crimson text-ink scroll-mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-obsidian/15">
          <h2 className="text-center text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[0.98] tracking-tight uppercase text-obsidian">
            NOSSOS SERVIÇOS
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {SERVICE_PILLARS.map((pillar) => {
              const isSelected = pillar.id === activeService.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handleSelectService(pillar.id)}
                  className={`text-left group transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${
                    isSelected ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold leading-tight uppercase text-obsidian group-hover:text-cream transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-cream/90 leading-relaxed">
                    {pillar.description}
                  </p>
                  <span className="mt-4 inline-block text-xs font-mono uppercase tracking-wider text-cream underline underline-offset-4">
                    {isSelected ? 'Modalidades exibidas abaixo' : 'Ver modalidades'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2">
              <span className="text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-none uppercase text-obsidian">
                NOSSOS SERVIÇOS
              </span>
              <span className="text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold leading-none uppercase text-cream">
                {activeService.title}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {SERVICE_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handleSelectService(pillar.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide border transition-colors cursor-pointer whitespace-nowrap ${
                    pillar.id === activeService.id
                      ? 'bg-cream text-crimson border-cream'
                      : 'border-cream/35 text-cream hover:bg-cream/10'
                  }`}
                >
                  {pillar.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {activeService.tiers.map((tier) => {
              const isTierActive = tier.id === activeTier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`text-left space-y-5 p-4 -m-4 transition-colors cursor-pointer ${
                    isTierActive ? 'bg-black/14' : 'hover:bg-black/6'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <ServiceTierIcon
                      tierId={tier.id}
                      active={isTierActive}
                      className={`w-12 h-12 shrink-0 transition-colors ${
                        isTierActive ? 'text-cream' : 'text-obsidian/65'
                      }`}
                    />
                    <span className="text-base font-medium uppercase tracking-wide text-cream">
                      {tier.name}
                    </span>
                  </div>
                  <p className="text-sm text-cream/90 leading-relaxed pl-[64px]">
                    {tier.summary}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-12 bg-cream text-ink p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-xs font-mono uppercase text-crimson">
                {activeService.title} · Modalidade {activeTier.name}
              </p>
              <p className="text-base sm:text-lg font-semibold text-ink">
                {activeTier.summary}
              </p>
            </div>
            <ul className="space-y-2 md:min-w-[340px]">
              {activeTier.focus.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-ink-muted"
                >
                  <Check
                    className="w-4 h-4 text-forest shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Slides 10 a 14: Portfólio em Carrossel Horizontal com Pranchas Reais do PDF */}
      <section id="portfolio" className="bg-cream text-ink border-b border-ink/10 scroll-mt-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <p className="text-xs font-mono text-crimson mb-2 uppercase">
                Portfólio · Projetos selecionados
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Identidades construídas com estratégia
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {PORTFOLIO_CASES.map((item, idx) => {
                const isSelected = idx === activeCaseIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCaseIndex(idx)}
                    className={`relative pb-2 text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson ${
                      isSelected
                        ? 'font-semibold text-ink'
                        : 'font-medium text-ink-muted hover:text-ink'
                    }`}
                  >
                    <span>{item.client}</span>
                    {isSelected && (
                      <motion.span
                        layoutId="portfolio-tab-underline"
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-crimson"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="relative"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
              const delta = touchStartX.current - endX;
              if (Math.abs(delta) > 45) {
                if (delta > 0) handleNextCase();
                else handlePrevCase();
              }
              touchStartX.current = null;
            }}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeCaseIndex * 100}%` }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {PORTFOLIO_CASES.map((item) => (
                  <div key={item.id} className="w-full shrink-0">
                    <PortfolioSpread item={item} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Controles centralizados do carrossel */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrevCase}
                aria-label="Projeto anterior"
                className="p-2.5 text-ink hover:text-crimson border border-ink/15 hover:border-crimson transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNextCase}
                aria-label="Próximo projeto"
                className="p-2.5 text-ink hover:text-crimson border border-ink/15 hover:border-crimson transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 15: Transparência em Cada Etapa (Fundo Creme + Linhas Pautadas) */}
      <section className="bg-cream text-ink border-b border-ink/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center">
          <div className="w-full max-w-[780px]">
            <div className="flex items-baseline justify-between gap-4 pb-1.5 border-b border-ink text-[clamp(1.25rem,3vw,2.2rem)] leading-tight tracking-tight">
              <span className="font-bold text-crimson">TRANSPARÊNCIA</span>
              <span className="font-normal text-ink text-right">EM CADA ETAPA.</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 pt-2 pb-1.5 border-b border-ink text-[clamp(1.25rem,3vw,2.2rem)] leading-tight tracking-tight">
              <span className="font-bold text-crimson">CONSTRUÇÃO</span>
              <span className="font-normal text-ink text-right">CONJUNTA EM</span>
            </div>
            <div className="flex items-baseline justify-end gap-4 pt-2 pb-1.5 border-b border-ink text-[clamp(1.25rem,3vw,2.2rem)] leading-tight tracking-tight">
              <span className="font-bold text-crimson text-right">CADA FASE.</span>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6">
              <EstrattoAsterisk className="w-8 h-8 text-forest" />
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  ESTRATTO
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-crimson leading-tight">
                  Estúdio
                  <br />
                  Colaborativo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 16: Nosso Time (Fundo Obsidian + Avatar Circular Igual ao PDF) */}
      <section id="time" className="bg-obsidian text-cream scroll-mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <h2 className="text-center text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.98] tracking-tight uppercase text-white/45">
            NOSSO TIME
          </h2>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.id} className="flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-obsidian">
                  <img
                    src={member.avatarSrc}
                    alt={`${member.name} — ${member.roleTitle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-[1.16]"
                  />
                </div>
                <h3 className="mt-5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-crimson">
                  {member.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-cream/80 leading-relaxed max-w-[24ch]">
                  <strong className="font-semibold text-cream">{member.roleTitle}.</strong>{' '}
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 17: A Estratto Só Assina o Que Ela Mesmo Usaria (Fundo Creme + Linhas Pautadas) */}
      <section className="bg-cream text-ink border-b border-ink/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center">
          <div className="w-full max-w-[680px]">
            <div className="flex items-baseline justify-between gap-4 pb-1.5 border-b border-ink text-[clamp(1.25rem,3vw,2.2rem)] leading-tight tracking-tight">
              <span className="font-normal text-ink">
                A <strong className="font-bold text-crimson">ESTRATTO</strong> SÓ
              </span>
              <span className="font-normal text-ink text-right">ASSINA O</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 pt-2 pb-1.5 border-b border-ink text-[clamp(1.25rem,3vw,2.2rem)] leading-tight tracking-tight">
              <span className="font-normal text-ink">QUE ELA</span>
              <span className="font-bold text-crimson text-right">MESMO USARIA.</span>
            </div>

            <p className="mt-10 text-sm sm:text-base text-ink/85 leading-relaxed">
              O critério de qualidade é compartilhado desde o início, construído junto com quem contrata, sustentado por quem entrega. Clareza estratégica, propósito aplicável, coerência com quem a marca é.
            </p>
          </div>
        </div>
      </section>

      {/* Slide 18: Encerramento Estratto + CTA Final "Visualizar Proposta" */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center">
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

            <div className="py-6 border-b border-ink/50 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center relative">
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

          <div className="mt-14 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-ink">
              Sua proposta comercial personalizada.
            </h2>
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold bg-crimson text-cream hover:bg-crimson-deep transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span>Visualizar Proposta</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
