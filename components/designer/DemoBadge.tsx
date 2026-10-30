'use client';

import { BRAND, FONT_SANS } from '@/lib/designer/brand';
import type { Product } from '@/lib/designer/types';

/**
 * Renders exactly one of three states for a product, so real vs. fake data
 * is never ambiguous in the UI (NON-NEGOTIABLE RULE #16 in
 * docs/DESIGNER_BUILD_PLAN.md):
 *
 * - `product.isDemo === true`         → orange "Demo data" (fully invented,
 *                                        should not exist for the 4 real
 *                                        suppliers anymore — kept for any
 *                                        future placeholder-only category)
 * - `product.isDemo === false` + a
 *   `sourceUrl`                       → blue "Public catalog · unconfirmed
 *                                        price" link to the exact page the
 *                                        SKU/dimensions came from
 * - neither                           → nothing rendered (fully approved,
 *                                        dealer-imported product — doesn't
 *                                        exist yet in this build)
 */
export default function DemoBadge({
  product,
  compact = false,
}: {
  product: Pick<Product, 'isDemo' | 'sourceUrl' | 'supplier' | 'referencePriceUsd' | 'rating'>;
  compact?: boolean;
}) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: FONT_SANS,
    fontSize: compact ? '8px' : '9px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: 700,
    padding: compact ? '2px 6px' : '3px 8px',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
  };

  if (product.isDemo) {
    return (
      <span style={{ ...baseStyle, color: BRAND.warning, backgroundColor: BRAND.warningBg, border: `1px solid ${BRAND.warning}33` }}>
        Demo data
      </span>
    );
  }

  if (product.sourceUrl && product.supplier === 'Amazon' && product.referencePriceUsd) {
    const ratingText = product.rating ? ` · ${product.rating}★` : '';
    return (
      <a
        href={product.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        title="Real Amazon listing. Price shown is Amazon's reference price at the time it was sourced, not Crafted's confirmed price — re-check before quoting."
        style={{ ...baseStyle, color: BRAND.success, backgroundColor: `${BRAND.success}18`, border: `1px solid ${BRAND.success}33`, textDecoration: 'none' }}
      >
        ~${product.referencePriceUsd.toFixed(0)}{ratingText} (Amazon)
      </a>
    );
  }

  if (product.sourceUrl) {
    return (
      <a
        href={product.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        title="Real product — name/SKU/dimensions pulled from the supplier's public catalog. Price and live stock are still unconfirmed until Tylor's dealer account is connected."
        style={{ ...baseStyle, color: BRAND.blue, backgroundColor: BRAND.blueLight, border: `1px solid ${BRAND.blue}33`, textDecoration: 'none' }}
      >
        Real product · price unconfirmed
      </a>
    );
  }

  return null;
}
