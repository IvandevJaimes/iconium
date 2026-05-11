interface CacheEntry {
  data: string;
  expiry: number;
}

interface CacheConfig {
  ttl?: number;
}

class IconCache {
  private cache = new Map<string, CacheEntry>();
  private defaultTTL: number;

  constructor(config: CacheConfig = {}) {
    this.defaultTTL = config.ttl ?? 300_000;
  }

  get(key: string): string | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.data;
  }

  set(key: string, data: string, ttl?: number): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + (ttl ?? this.defaultTTL),
    });
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const iconCache = new IconCache();
