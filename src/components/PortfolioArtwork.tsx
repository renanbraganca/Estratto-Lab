import { useState } from 'react';
import { PortfolioCase } from '../types/proposal';

interface PortfolioSpreadProps {
  item: PortfolioCase;
}

export function PortfolioSpread({ item }: PortfolioSpreadProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-cream border border-ink/12 overflow-hidden">
      {!imgError ? (
        <img
          src={item.imageSrc}
          alt={`Prancha de identidade visual do projeto ${item.client} — ${item.city} (${item.date})`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full aspect-video object-cover bg-cream block"
        />
      ) : (
        <div className="aspect-video w-full bg-cream-muted p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono text-ink-muted">
              {item.city} · {item.date}
            </p>
            <h3 className="text-2xl font-bold text-ink mt-1">{item.client}</h3>
          </div>
          <p className="text-sm text-ink-muted max-w-lg">{item.summary}</p>
        </div>
      )}
    </div>
  );
}
