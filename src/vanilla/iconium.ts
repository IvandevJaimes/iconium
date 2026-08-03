import { normalizeSlug } from '../core/normalize';
import { fetchIcon } from '../core/api';
import { iconCache } from '../core/cache';
import { resizeSvg } from '../core/transform';
interface GetIconOptions {
  size?: number;
}
const getIcon = async (name: string, options: GetIconOptions = {}): Promise<string> => {
  const slug = normalizeSlug(name);
  const svg = await fetchIcon(slug);

  return options.size ? resizeSvg(svg, options.size) : svg;
};
const clearCache = (): void => {
  iconCache.clear();
};
export { getIcon, clearCache };