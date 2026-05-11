import type { SearchResult } from './types';
import { normalizeSlug } from './normalize';
import { iconCache } from './cache';

const DEFAULT_BASE_URL = 'https://iconium-core.vercel.app/api';
const TIMEOUT_MS = 5000;
const MAX_RETRIES = 1;

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const fetchWithTimeout = async (url: string, timeoutMs: number): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
};

const fetchWithRetry = async (url: string, retries = MAX_RETRIES): Promise<Response> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, TIMEOUT_MS);
      if (!response.ok) {
        throw new ApiError(`HTTP ${response.status}`, response.status);
      }
      return response;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  throw new ApiError('Request failed');
};

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined' && (window as any).__ICONIUM_CONFIG__?.apiBaseUrl) {
    return (window as any).__ICONIUM_CONFIG__.apiBaseUrl;
  }
  return DEFAULT_BASE_URL;
};

export const fetchIcon = async (slug: string): Promise<string> => {
  const normalized = normalizeSlug(slug);

  const cached = iconCache.get(normalized);
  if (cached) return cached;

  const baseUrl = getBaseUrl();
  const response = await fetchWithRetry(`${baseUrl}/icon/${encodeURIComponent(normalized)}`);
  const svg = await response.text();

  iconCache.set(normalized, svg);
  return svg;
};

export const searchIcons = async (query: string, limit = 10, page = 0): Promise<SearchResult> => {
  const baseUrl = getBaseUrl();
  const response = await fetchWithRetry(
    `${baseUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}&page=${page}`,
  );
  return response.json() as Promise<SearchResult>;
};
