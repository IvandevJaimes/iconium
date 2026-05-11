import type { ReactNode } from 'react';

export interface IconResult {
  name: string;
  slug: string;
  hex: string;
  colors: string[];
  categories: string[];
  svg: string;
  score: number;
}

export interface SearchResult {
  page: number;
  limit: number;
  total: number;
  results: IconResult[];
}

export interface IconProps {
  name: string;
  size?: number;
  fallback?: ReactNode;
  className?: string;
}

export interface IconConfig {
  apiBaseUrl?: string;
  cacheTTL?: number;
  defaultFallback?: string;
}

export interface CacheEntry {
  data: string;
  expiry: number;
}
