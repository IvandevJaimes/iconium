// Misma SYMBOL_MAP que iconium-core (server-side)
export const SYMBOL_MAP: Record<string, string> = {
  'c++': 'cplusplus',
  cpp: 'cplusplus',
  'c#': 'csharp',
  'f#': 'fsharp',
};

export const normalizeSlug = (name: string): string => {
  const lower = name.toLowerCase().trim();
  if (SYMBOL_MAP[lower]) return SYMBOL_MAP[lower];

  const noSpace = lower.replace(/\s+/g, '');
  if (SYMBOL_MAP[noSpace]) return SYMBOL_MAP[noSpace];

  // theSVG convention: dots become "dot" en el slug (node.js → nodedotjs)
  const withDots = lower.replace(/\./g, 'dot');

  // Strip remaining special chars (spaces, slashes, etc.)
  return withDots.replace(/[^a-z0-9]/g, '');
};
