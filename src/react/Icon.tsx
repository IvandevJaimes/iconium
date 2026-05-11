import { useState, useEffect, type HTMLAttributes } from 'react';
import type { IconProps } from '../core/types';
import { normalizeSlug } from '../core/normalize';
import { fetchIcon } from '../core/api';
import { resizeSvg } from '../core/transform';
import { iconCache } from '../core/cache';
import fallbackSvg from '../assets/fallback.svg?raw';

const DEFAULT_SIZE = 24;

type SpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'ref' | 'name' | 'size' >;

export const Icon = ({
  name,
  size = DEFAULT_SIZE,
  fallback,
  className,
  ...rest
}: IconProps & SpanProps) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const slug = normalizeSlug(name);

    const cached = iconCache.get(slug);
    if (cached) {
      let svg = resizeSvg(cached, size);
      if (!cancelled) setSvgContent(svg);
      return;
    }

    fetchIcon(slug)
      .then((svg) => {
        if (!cancelled) {
          let transformed = resizeSvg(svg, size);
          setSvgContent(transformed);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => { cancelled = true; };
  }, [name, size]);

  const wrapperProps = {
    className,
    style: { display: 'inline-flex' as const, width: size, height: size, lineHeight: 0 as const },
    ...rest,
  };

  if (error || !svgContent) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <span
        {...wrapperProps}
        dangerouslySetInnerHTML={{ __html: resizeSvg(fallbackSvg, size) }}
      />
    );
  }

  return (
    <span
      {...wrapperProps}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
