import { motion } from 'motion/react';

interface MarkProps {
  className?: string;
}

export function EstrattoAsterisk({ className = 'w-10 h-10' }: MarkProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      initial={{ rotate: -18, opacity: 0.7 }}
      whileInView={{ rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ rotate: 24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <rect x="44" y="6" width="12" height="88" transform="rotate(-8 50 50)" />
      <rect x="44" y="6" width="12" height="88" transform="rotate(38 50 50)" />
      <rect x="44" y="6" width="12" height="88" transform="rotate(84 50 50)" />
      <rect x="44" y="6" width="12" height="88" transform="rotate(132 50 50)" />
    </motion.svg>
  );
}

interface ServiceTierIconProps {
  tierId: string;
  active?: boolean;
  className?: string;
}

export function ServiceTierIcon({
  tierId,
  active = false,
  className = 'w-12 h-12',
}: ServiceTierIconProps) {
  if (tierId === 'essencial') {
    return (
      <motion.svg
        viewBox="0 0 64 64"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        aria-hidden="true"
        animate={active ? { scale: 1.06 } : { scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.path
          d="M10 12h6c9 0 15 8 15 20s-6 20-15 20h-6V12z"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          animate={active ? { x: [0, 2.5, 0] } : { x: 0 }}
          transition={{
            pathLength: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            x: active
              ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 },
          }}
        />
        <motion.path
          d="M35 12h6c9 0 15 8 15 20s-6 20-15 20h-6V12z"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          animate={active ? { x: [0, -2.5, 0] } : { x: 0 }}
          transition={{
            pathLength: { duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
            x: active
              ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 },
          }}
        />
      </motion.svg>
    );
  }

  if (tierId === 'completo') {
    return (
      <motion.svg
        viewBox="0 0 64 64"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        aria-hidden="true"
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        whileHover={{ scale: 1.08 }}
        transition={{
          rotate: active
            ? { duration: 10, repeat: Infinity, ease: 'linear' }
            : { duration: 0.3 },
          scale: { duration: 0.2 },
        }}
      >
        <motion.circle
          cx="32"
          cy="32"
          r="22"
          strokeDasharray={active ? '96 18' : 'none'}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    );
  }

  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      aria-hidden="true"
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
    >
      <motion.circle
        cx="32"
        cy="32"
        r="23"
        initial={{ pathLength: 0, opacity: 0.5 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        style={{ transformOrigin: '32px 32px' }}
        transition={{
          pathLength: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          scale: active
            ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 },
        }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="15"
        initial={{ pathLength: 0, opacity: 0.5 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        style={{ transformOrigin: '32px 32px' }}
        transition={{
          pathLength: { duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
          scale: active
            ? { duration: 2.4, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 },
        }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="7"
        initial={{ pathLength: 0, opacity: 0.5 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        style={{ transformOrigin: '32px 32px' }}
        transition={{
          pathLength: { duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] },
          scale: active
            ? { duration: 2.4, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 },
        }}
      />
    </motion.svg>
  );
}

export function ObrigadoSignature({ className = 'w-44 h-auto' }: MarkProps) {
  return (
    <img
      src="/assets/obrigado.png"
      alt="Obrigado"
      referrerPolicy="no-referrer"
      className={`object-contain select-none ${className}`}
    />
  );
}
