import { normalizeSlug } from '../core/normalize';
import { fetchIcon } from '../core/api';


import { iconCache } from '../cache/cache';
interface GetIconOptions {
  color?: string;
  size?: number;
}
const getIcon = async (name: string, options: GetIconOptions = {}): Promise<string> => {
  const slug = normalizeSlug(name);
  const svg = await fetchIcon(slug);

  if (options.size) {
    return svg
      .replace(/width="[^"]*"/, `width="${options.size}"`)
      .replace(/height="[^"]*"/, `height="${options.size}"`);
  }
  return svg;
};
const clearCache = (): void => {
  iconCache.clear();
};
export { getIcon, clearCache };